import { DB } from "@/db/schema";
import { Schema as S } from "@effect/schema";

const Relation = S.Struct({
  id: S.UUID,
  actor: DB.fields.enum.fields.technique_actor,
});

export const ASQ = {
  select_technique: S.Struct({
    name: S.optional(S.String),
    information: S.optional(S.String),
    tag: S.optional(S.String),
    ruleset: S.optional(S.Literal("gi", "nogi")),
  }),
  create_technique: S.Struct({
    sources: S.Array(Relation),
    name: S.String.pipe(S.minLength(1)),
    actor: DB.fields.enum.fields.technique_actor,
    targets: S.Array(Relation),
    information: S.String.pipe(S.minLength(1)),
    tags: S.Array(S.String.pipe(S.minLength(1))),
  }),
  update_technique: S.Struct({
    id: S.UUID,
    sources: S.optional(S.Array(Relation)),
    name: S.optional(S.String.pipe(S.minLength(1))),
    actor: S.optional(DB.fields.enum.fields.technique_actor),
    targets: S.optional(S.Array(Relation)),
    information: S.optional(S.String.pipe(S.minLength(1))),
    tags: S.optional(S.Array(S.String.pipe(S.minLength(1)))),
  }).pipe(
    S.filter((s) =>
      (s.sources || s.targets) && !s.actor
        ? "actor is required when sources or targets are provided"
        : undefined
    )
  ),
  delete_technique: S.Struct({
    id: S.UUID,
  }),
};

const select_technique = S.Array(
  S.Struct({
    ...DB.fields.table.fields.technique.fields,
    relations: S.Array(DB.fields.table.fields.technique_relation),
    tags: S.Array(DB.fields.table.fields.technique_tag),
  })
);

export const ASR = {
  select_technique,
  get_all_techniques: select_technique,
  get_all_technique_nodes: S.Array(DB.fields.table.fields.technique),
  get_all_technique_relations: S.Array(
    DB.fields.table.fields.technique_relation
  ),
  get_all_technique_tags: S.Array(DB.fields.table.fields.technique_tag),
};
