import MultipleSelector from "@/components/multi-select";
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
import { Input } from "@/components/ui/input";
import { create_technique } from "@/lib/actions";
import { ASQ } from "@/lib/schema";
import {
  data_to_ms,
  map_data_to_ms_split,
  map_ms_to_data,
} from "@/lib/ui/utils";
import { log, S, ST } from "@/lib/utils";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { Plus, RotateCcw, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const create_technique_mutable = S.mutable(ASQ.create_technique);

export default function CreateTechniqueForm({
  data,
  mutate,
}: {
  data: Readonly<
    { id: string; name: string; tags: Readonly<{ tag: string }[]> }[]
  >;
  mutate: () => void;
}) {
  const form = useForm<ST<typeof create_technique_mutable>>({
    resolver: effectTsResolver(create_technique_mutable),
    defaultValues: {
      name: "",
      information: "",
      actor: "one",
      sources: [],
      targets: [],
      tags: [],
    },
    mode: "onBlur",
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v: ST<typeof ASQ.create_technique>) =>
          create_technique(v).then((r) => {
            log.log(JSON.stringify(r));
            if (r.success) mutate();
          })
        )}
        className="flex flex-col w-full gap-2 items-stretch"
      >
        <div className="flex flex-row w-full justify-stretch gap-2 z-50">
          <FormField
            control={form.control}
            name="sources"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sources</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    // disabled={!!field.disabled}
                    onChange={(v) => field.onChange(v.map(map_ms_to_data))}
                    // ref={field.ref}
                    value={field.value.map(data_to_ms(data))}
                    options={map_data_to_ms_split(data, data)}
                    defaultOptions={map_data_to_ms_split(data, data)}
                    placeholder="Source"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    hideClearAllButton
                    onSearch={async (v) =>
                      map_data_to_ms_split(data, data).filter((d) =>
                        d.label.includes(v)
                      )
                    }
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actor"
            render={({ field }) => (
              <FormItem className="min-w-20">
                <FormLabel>Actor</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? "one"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Actor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Actor</SelectLabel>
                        <SelectItem value="one">one</SelectItem>
                        <SelectItem value="two">two</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="information"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Information</FormLabel>
                <FormControl>
                  <Input placeholder="Information" {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Targets</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    // disabled={!!field.disabled}
                    onChange={(v) => field.onChange(v.map(map_ms_to_data))}
                    // ref={field.ref}
                    value={field.value.map(data_to_ms(data))}
                    options={map_data_to_ms_split(data, data)}
                    defaultOptions={map_data_to_ms_split(data, data)}
                    placeholder="Target"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    hideClearAllButton
                    onSearch={async (v) =>
                      map_data_to_ms_split(data, data).filter((d) =>
                        d.label.includes(v)
                      )
                    }
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultipleSelector
                    creatable
                    {...field}
                    value={field.value.map((v) => ({
                      value: "" + v,
                      label: "" + v,
                    }))}
                    onChange={(v) => field.onChange(v.map((o) => o.value))}
                    options={[
                      ...new Set(data.flatMap((d) => d.tags.map((t) => t.tag))),
                    ].map((t) => ({ value: t, label: t }))}
                    defaultOptions={[]}
                    placeholder="Tags"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    hideClearAllButton
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row w-full justify-end gap-2">
          <Button
            size="icon"
            variant="secondary"
            type="reset"
            onClick={() => form.reset()}
          >
            <X />
          </Button>
          <Button size="icon" type="submit">
            <Plus />
          </Button>
        </div>
      </form>
    </Form>
  );
}
