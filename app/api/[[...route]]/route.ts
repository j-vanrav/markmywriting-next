import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const runtime = "edge";

const app = new Hono().basePath("/api");

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
    const a = c.req.valid("json");
    console.log(a);
    return c.json(
      {
        ok: true,
        message: a.images[0].hash,
      },
      201
    );
  }
);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof route;
