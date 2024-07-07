"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Send } from "lucide-react";
import { AlertCircle, LoaderCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { track } from "@vercel/analytics/react";

export default function NewTechniqueForm() {
  const [error, setError] = useState(undefined as string | undefined);
  const form = useForm<z.infer<typeof newMoveFormSchema>>({
    resolver: effectTsResolver(),
    defaultValues: {
      technique: "",
      type: "",
      starting: "",
      ending: "",
      description: "",
      image_url: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof newMoveFormSchema>) {
    if (!isSubmitting) {
      track("contribute:submit");
      setIsSubmitting(true);
      setError(undefined);
      try {
        await suggestionFormSubmission(values);
        track("contribute:success");
        form.reset();
        setShowThankYou(true);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      } catch (err: any) {
        track("contribute:error");
        setError(error);
        console.error(err?.message);
      }
      setIsSubmitting(false);
    }
  }
  return (
    <div className="px-4 flex flex-col items-stretch gap-4 max-w-xl mx-auto">
      {showThankYou ? (
        <>
          <h2 className="text-xl font-bold text-primary-foreground">
            Thank you for contributing!
          </h2>
          <p>We review submissions periodically. Feel free to submit more.</p>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold">
            Suggest a new move or move change
          </h1>
          <p>
            You can check the{" "}
            <Button asChild variant="link" className="p-0">
              <Link href="/leaderboard" prefetch={false}>
                leaderboard
              </Link>
            </Button>{" "}
            to see if it already exists.
          </p>
        </>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="technique"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technique name *</FormLabel>
                <FormControl>
                  <Input placeholder="Omoplata" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Submission" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  E.g. submission, sweep, position...
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="starting"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting position/technique *</FormLabel>
                <FormControl>
                  <Input placeholder="Closed guard bottom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ending"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ending position/technique</FormLabel>
                <FormControl>
                  <Input placeholder="None" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A shoulder lock submission applied by encircling the opponent's arm with the legs and rotating away."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://elo-bjj.jvr.app/techniques/submissions/closedguard/omoplata.png"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-2" />
          <div className="flex flex-row justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              Submit
              {isSubmitting ? (
                <LoaderCircle className="size-5 animate-spin ml-2" />
              ) : (
                <Send className="ml-2 size-5" />
              )}
            </Button>
          </div>
        </form>
      </Form>
      {error && (
        <Alert variant="destructive" className="w-full max-w-sm">
          <AlertCircle className="size-4 min-w-4" />
          <AlertTitle>Something went wrong.</AlertTitle>
          <AlertDescription>
            We tried to process your submission, but something went wrong.
            Please try again later.
            <br />
            <br />
            <span className="text-xs">Message: {error}</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
