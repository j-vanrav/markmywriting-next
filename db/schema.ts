import { Schema as S } from "@effect/schema";
import { array } from "@effect/schema/FastCheck";

const DBEnum = S.Struct({
  technique_ruleset: S.Literal("gi", "nogi"),
  technique_relation_type: S.Literal("transition"),
  technique_actor: S.Literal("one", "two"),
});

export const DB = S.Struct({
  table: S.Struct({
    technique: S.Struct({
      id: S.UUID,
      name: S.String.pipe(S.minLength(1)),
      information: S.String,
      ruleset: S.Literal("gi", "nogi"),
    } as const),
    technique_relation: S.Struct({
      id: S.UUID,
      source_id: S.UUID,
      source_actor: DBEnum.fields.technique_actor,
      target_id: S.UUID,
      target_actor: DBEnum.fields.technique_actor,
      type: S.Literal("transition"),
    } as const),
    technique_tag: S.Struct({
      id: S.UUID,
      technique_id: S.UUID,
      tag: S.String.pipe(S.minLength(1)),
    } as const),
  } as const),
  enum: DBEnum,
});

export const TableName = S.keyof(DB.fields.table);
export const EnumName = S.keyof(DB.fields.enum);

type BaseTable = { id: string };
function getTableSchemas<A extends BaseTable, I extends BaseTable, R>(
  table: S.Schema<A, I, R>
) {
  const select = table.pipe(S.pick("id"));
  const insert = table.pipe(S.omit("id"));
  const update = S.extend(select, S.partial(insert));
  const delet = select;
  const fields = {
    all: S.keyof(table),
    select: S.keyof(select),
    insert: S.keyof(insert),
    update: S.keyof(update),
    delete: S.keyof(delet),
  };
  const arrays = {
    all: S.Array(fields.all),
    select: S.Array(fields.select),
    insert: S.Array(fields.insert),
    update: S.Array(fields.update),
    delete: S.Array(fields.delete),
  };
  const partial_arrays = {
    all: S.partial(arrays.all),
    select: S.partial(arrays.select),
    insert: S.partial(arrays.insert),
    update: S.partial(arrays.update),
    delete: S.partial(arrays.delete),
  };

  return {
    select,
    insert,
    update,
    delete: delet,
    fields,
    arrays,
    partial_arrays,
  };
}

export const DB_Schemas = {
  technique: getTableSchemas(DB.fields.table.fields.technique),
  technique_relation: getTableSchemas(
    DB.fields.table.fields.technique_relation
  ),
  technique_tag: getTableSchemas(DB.fields.table.fields.technique_tag),
};

export const DB_Schema_Unions = {
  all: {
    fields: S.Union(
      DB_Schemas.technique.fields.all,
      DB_Schemas.technique_relation.fields.all,
      DB_Schemas.technique_tag.fields.all
    ),
    array: S.Union(
      DB_Schemas.technique.arrays.all,
      DB_Schemas.technique_relation.arrays.all,
      DB_Schemas.technique_tag.arrays.all
    ),
    partial_array: S.Union(
      DB_Schemas.technique.partial_arrays.all,
      DB_Schemas.technique_relation.partial_arrays.all,
      DB_Schemas.technique_tag.partial_arrays.all
    ),
    partial_array_min_items_1: S.Union(
      DB_Schemas.technique.partial_arrays.all.pipe(S.minItems(1)),
      DB_Schemas.technique_relation.partial_arrays.all.pipe(S.minItems(1)),
      DB_Schemas.technique_tag.partial_arrays.all.pipe(S.minItems(1))
    ),
  },
  select: {
    partial_array_min_items_1: S.Union(
      DB_Schemas.technique.partial_arrays.select.pipe(S.minItems(1)),
      DB_Schemas.technique_relation.partial_arrays.select.pipe(S.minItems(1)),
      DB_Schemas.technique_tag.partial_arrays.select.pipe(S.minItems(1))
    ),
  },
  insert: {
    array: S.Union(
      DB_Schemas.technique.arrays.insert,
      DB_Schemas.technique_relation.arrays.insert,
      DB_Schemas.technique_tag.arrays.insert
    ),
    partial_array: S.Union(
      DB_Schemas.technique.partial_arrays.insert,
      DB_Schemas.technique_relation.partial_arrays.insert,
      DB_Schemas.technique_tag.partial_arrays.insert
    ),
  },
  delete: {
    partial_array_min_items_1: S.Union(
      DB_Schemas.technique.partial_arrays.delete.pipe(S.minItems(1)),
      DB_Schemas.technique_relation.partial_arrays.delete.pipe(S.minItems(1)),
      DB_Schemas.technique_tag.partial_arrays.delete.pipe(S.minItems(1))
    ),
  },
};
