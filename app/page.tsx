"use client";

import CreateTechniqueForm from "@/components/create-technique-form";
import TechniqueTable from "@/components/technique-table";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import UpdateTechniqueForm from "@/components/update-technique-form";
import { get_all_techniques } from "@/lib/actions";
import { ASQ } from "@/lib/schema";
import {
  convert_technique,
  duplicate_relationships,
  duplicate_technique,
} from "@/lib/ui/utils";
import { S, ST } from "@/lib/utils";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { Check, Layers2, X } from "lucide-react";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useSWR from "swr";

const select_technique_mutable = S.mutable(ASQ.select_technique);

function FilterForm({ filterForm }: { filterForm: UseFormReturn }) {
  return (
    <Form {...filterForm}>
      <form className="flex flex-row w-full gap-2 p-4">
        <FormField
          control={filterForm.control}
          name="ruleset"
          render={({ field }) => (
            <FormItem className="min-w-20">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? "gi"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ruleset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ruleset</SelectLabel>
                      <SelectItem value="gi">Gi</SelectItem>
                      <SelectItem value="nogi">No gi</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={filterForm.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={filterForm.control}
          name="information"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Information" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={filterForm.control}
          name="tag"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="min-w-10"
          size="icon"
          variant="secondary"
          type="reset"
          onClick={() => filterForm.reset()}
        >
          <X />
        </Button>
      </form>
    </Form>
  );
}

export default function Page() {
  const { data, error, isLoading, mutate } = useSWR(
    "get_all_techniques",
    get_all_techniques
  );
  const filterForm = useForm<ST<typeof ASQ.select_technique>>({
    resolver: effectTsResolver(select_technique_mutable),
    defaultValues: {
      name: "",
      information: "",
      tag: "",
      ruleset: "gi",
    },
    mode: "all",
  });

  const [selectedTechnique, setSelectedTechnique] = useState(
    null as Technique | null
  );

  const dataDone = data && !error && !isLoading && data.success && data.data;

  const [duplicateTechniques, setDuplicateTechniques] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      {dataDone && (
        <>
          <div className="p-4 w-full flex flex-col items-center gap-2 min-h-60 border-b">
            <div className="flex flex-row items-start gap-4 min-h-12">
              <h2>{selectedTechnique ? "Updating" : "Create"} </h2>
              {selectedTechnique && (
                <div className="flex flex-col">
                  <h2>{selectedTechnique.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedTechnique.id}
                  </p>
                </div>
              )}
              {selectedTechnique && (
                <Button size="icon" onClick={() => setSelectedTechnique(null)}>
                  <X />
                </Button>
              )}
            </div>

            {selectedTechnique ? (
              <UpdateTechniqueForm
                data={data.data}
                mutate={mutate}
                defaultValues={{
                  name: selectedTechnique.name,
                  information: selectedTechnique.information,
                  actor: selectedTechnique.actor,
                  sources: selectedTechnique.sources,
                  targets: selectedTechnique.targets,
                  tags: selectedTechnique.tags.map((t) => t.tag),
                }}
                id={selectedTechnique.id}
              />
            ) : (
              <CreateTechniqueForm data={data.data} mutate={mutate} />
            )}
          </div>

          <div className="flex flex-col w-full items-center">
            <div className=" flex flex-row items-center gap-4">
              <h2>Filters</h2>
              <Toggle
                aria-label="Show inversions"
                pressed={duplicateTechniques}
                onPressedChange={setDuplicateTechniques}
              >
                <Layers2 className="mr-2 h-4 w-4" />
                Show inversions
              </Toggle>
            </div>
            <FilterForm filterForm={filterForm} />
          </div>
          <TechniqueTable
            allData={data.data
              .map((d) => ({
                ...d,
                relations: d.relations.flatMap((r) =>
                  duplicate_relationships(r)
                ),
              }))
              .map(convert_technique)
              .flatMap((t) =>
                duplicateTechniques ? duplicate_technique(t) : [t]
              )}
            displayData={data.data
              .filter(
                (d) =>
                  d.name.includes(filterForm.watch().name ?? "") &&
                  d.information.includes(
                    filterForm.watch().information ?? ""
                  ) &&
                  (d.tags.length === 0 ||
                    !!d.tags.find((t) =>
                      t.tag.includes(filterForm.watch().tag ?? "")
                    )) &&
                  d.ruleset.includes(filterForm.watch().ruleset ?? "")
              )
              .map((d) => ({
                ...d,
                relations: d.relations.flatMap((r) =>
                  duplicate_relationships(r)
                ),
              }))
              .map(convert_technique)
              .flatMap((t) =>
                duplicateTechniques ? duplicate_technique(t) : [t]
              )}
            mutate={mutate}
            selectTechnique={setSelectedTechnique}
          />
        </>
      )}
    </div>
  );
}
