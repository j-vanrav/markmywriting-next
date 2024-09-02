import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import OpenAI from "openai";

export const runtime = "edge";

const app = new Hono().basePath("/api");

type ImageMessage = { type: "image_url"; image_url: { url: string } };

const route = app.post(
  "/transcribe_images",
  zValidator(
    "json",
    z.object({
      images: z
        .array(
          z.object({
            base64: z.string(), // z.string().base64() produces [RangeError: Maximum call stack size exceeded at RegExp.test]
            hash: z.string(),
          })
        )
        .nonempty(),
    })
  ),
  async (c) => {
    const req = c.req.valid("json");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please transcribe the text in these ${req.images.length} image(s).`,
            },
            ...(req.images.map((i) => ({
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${i.base64}`,
              },
            })) as ImageMessage[]),
          ],
        },
      ],
      model: "gpt-4o-mini",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "transcription_schema",
          schema: {
            type: "object",
            properties: {
              transcription: { type: "string" },
            },
          },
        },
      },
    });

    console.log(chatCompletion.choices[0].message.content);

    return c.json(
      {
        ok: true,
        message: z
          .object({ transcription: z.string() })
          .parse(JSON.parse(chatCompletion.choices[0].message.content ?? "")),
      },
      201
    );
  }
);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof route;
