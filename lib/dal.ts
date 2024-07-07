"server-only";

import { VercelPool } from "@vercel/postgres";
import { S, ST } from "./utils";
import { TableName, DB, DB_Schemas, DB_Schema_Unions } from "@/db/schema";
import {
  decodeSync,
  itemsCount,
  minLength,
  SchemaClass,
} from "@effect/schema/Schema";

async function query_multi<A, I>(
  pool: VercelPool,
  query: string,
  params: any[],
  schema: SchemaClass<A, I, never>
) {
  const r = await pool.query(query, params);
  return S.decodeSync(S.Array(schema))(r.rows);
}

async function query_single<A, I>(
  pool: VercelPool,
  query: string,
  params: any[],
  schema: SchemaClass<A, I, never>
) {
  const r = await query_multi(pool, query, params, schema);
  const d = S.decodeSync(S.Array(schema).pipe(itemsCount(1)))(r as any[]);
  return d[0];
}

async function query_multi_id(pool: VercelPool, query: string, params: any[]) {
  return query_multi(pool, query, params, S.Struct({ id: S.UUID }));
}

async function query_single_id(pool: VercelPool, query: string, params: any[]) {
  return query_single(pool, query, params, S.Struct({ id: S.UUID }));
}

export const query_object = {
  keys: {
    all: <DBF extends ST<typeof DB_Schema_Unions.all.fields>, T>(
      object: Partial<Record<DBF, T>>
    ) => Object.keys(object) as DBF[],
    non_id: <DBF extends ST<typeof DB_Schema_Unions.all.fields>, T>(
      object: Partial<Record<DBF, T>>
    ) => Object.keys(object).filter((k) => k !== "id") as DBF[],
    id_first: <DBF extends string, T>(object: Partial<Record<DBF, T>>) =>
      ["id"].concat(Object.keys(object).filter((k) => k !== "id")) as [
        "id",
        ...DBF[]
      ] as ["id", ...DBF[]],
  },
  values: {
    all: <T>(
      object: Partial<Record<ST<typeof DB_Schema_Unions.all.fields>, T>>
    ) => Object.entries(object).map(([k, v]) => v),
    non_id: <T>(
      object: Partial<Record<ST<typeof DB_Schema_Unions.all.fields>, T>>
    ) =>
      Object.entries(object)
        .filter(([k, v]) => k !== "id")
        .map(([k, v]) => v),
    id_first: <T>(
      object: Partial<Record<ST<typeof DB_Schema_Unions.all.fields>, T>>
    ) =>
      [object.id].concat(
        Object.entries(object)
          .filter(([k, v]) => k !== "id")
          .map(([k, v]) => v)
      ) as [T, ...T[]],
  },
};

export const clause = {
  WHERE: {
    equals: (fields: Readonly<string[]> | string[]) =>
      `${fields.length > 0 && "WHERE "}${fields
        .map((f, i) => `${f} = $${i + 1}`)
        .join(" AND ")}`,
    substring: (fields: Readonly<string[]> | string[]) =>
      `${fields.length > 0 && "WHERE "}${fields
        .map((f, i) => `${f}::TEXT LIKE '%' || $${i + 1} || '%'`)
        .join(" AND ")}`,
  },
};

export const create_query = {
  insert: (
    table: ST<typeof TableName>,
    fields: ST<typeof DB_Schema_Unions.all.partial_array>
  ) => {
    const d = S.decodeUnknownSync(
      S.Struct({
        table: TableName,
        fields: DB_Schema_Unions.insert.array,
      })
    )({ table, fields });
    const columns = d.fields.join(", ");
    const values = d.fields.map((_, index) => `$${index + 1}`).join(", ");
    return `INSERT INTO ${d.table} (${columns}) VALUES (${values}) RETURNING id`;
  },
  select: (
    table: ST<typeof TableName>,
    fields: ST<typeof DB_Schema_Unions.all.partial_array>
  ) => {
    const d = S.decodeUnknownSync(
      S.Struct({
        table: S.String.pipe(minLength(1)),
        fields: DB_Schema_Unions.select.partial_array_min_items_1,
      })
    )({ table, fields });
    return `SELECT * FROM ${d.table} ${clause.WHERE.equals(
      d.fields as Readonly<string[]>
    )}`;
  },
  update: (
    table: ST<typeof TableName>,
    fields: ["id", ...ST<typeof DB_Schema_Unions.all.partial_array>]
  ) => {
    const d = S.decodeUnknownSync(
      S.Struct({
        table: S.String.pipe(minLength(1)),
        fields: DB_Schema_Unions.insert.partial_array,
      })
    )({
      table,
      fields: fields.slice(1),
    });
    const setClause = d.fields
      .map((field, index) => `${field} = $${index + 2}`)
      .join(", ");
    return `UPDATE ${d.table} SET ${setClause} WHERE id = $1 RETURNING id`;
  },
  delete: (
    table: ST<typeof TableName>,
    fields: ST<typeof DB_Schema_Unions.all.partial_array>
  ) => {
    const d = S.decodeUnknownSync(
      S.Struct({
        table: S.String.pipe(minLength(1)),
        fields: DB_Schema_Unions.all.partial_array_min_items_1,
      })
    )({ table, fields });
    const a = `DELETE FROM ${d.table} ${clause.WHERE.equals(
      d.fields as Readonly<string[]>
    )} RETURNING id`;
    console.log(a);
    return a;
  },
};

export const DAL = {
  technique: {
    insert: (
      pool: VercelPool,
      technique: ST<typeof DB_Schemas.technique.insert>
    ) => {
      const t = decodeSync(DB_Schemas.technique.insert)(technique);
      return query_single_id(
        pool,
        create_query.insert("technique", query_object.keys.non_id(t)),
        query_object.values.non_id(t)
      );
    },
    select: (
      pool: VercelPool,
      technique: ST<typeof DB_Schemas.technique.select>
    ) => {
      const t = decodeSync(DB_Schemas.technique.select)(technique);
      return query_single(
        pool,
        create_query.select("technique", query_object.keys.id_first(t)),
        query_object.values.id_first(t),
        DB.fields.table.fields.technique
      );
    },
    update: (
      pool: VercelPool,
      technique: ST<typeof DB_Schemas.technique.update>
    ) => {
      const t = decodeSync(DB_Schemas.technique.update)(technique);
      return query_single_id(
        pool,
        create_query.update("technique", query_object.keys.id_first(t)),
        query_object.values.id_first(t)
      );
    },
    delete: (
      pool: VercelPool,
      technique: ST<typeof DB_Schemas.technique.delete>
    ) => {
      const t = decodeSync(DB_Schemas.technique.delete)(technique);
      return query_single_id(
        pool,
        create_query.delete("technique", query_object.keys.id_first(t)),
        query_object.values.id_first(t)
      );
    },
  },
  technique_relation: {
    insert: (
      pool: VercelPool,
      technique_relation: ST<typeof DB_Schemas.technique_relation.insert>
    ) => {
      const t = decodeSync(DB_Schemas.technique_relation.insert)(
        technique_relation
      );
      return query_single_id(
        pool,
        create_query.insert("technique_relation", query_object.keys.non_id(t)),
        query_object.values.non_id(t)
      );
    },
    select: (
      pool: VercelPool,
      technique_relation: ST<typeof DB_Schemas.technique_relation.select>
    ) => {
      const t = decodeSync(DB_Schemas.technique_relation.select)(
        technique_relation
      );
      return query_single(
        pool,
        create_query.select(
          "technique_relation",
          query_object.keys.id_first(t)
        ),
        query_object.values.id_first(t),
        DB.fields.table.fields.technique_relation
      );
    },
    update: (
      pool: VercelPool,
      technique_relation: ST<typeof DB_Schemas.technique_relation.update>
    ) => {
      const t = decodeSync(DB_Schemas.technique_relation.update)(
        technique_relation
      );
      return query_single_id(
        pool,
        create_query.update(
          "technique_relation",
          query_object.keys.id_first(t)
        ),
        query_object.values.id_first(t)
      );
    },
    delete: (
      pool: VercelPool,
      technique_relation: ST<typeof DB_Schemas.technique_relation.delete>
    ) => {
      const t = decodeSync(DB_Schemas.technique_relation.delete)(
        technique_relation
      );
      return query_single_id(
        pool,
        create_query.delete(
          "technique_relation",
          query_object.keys.id_first(t)
        ),
        query_object.values.id_first(t)
      );
    },
  },
  technique_tag: {
    insert: (
      pool: VercelPool,
      technique_tag: ST<typeof DB_Schemas.technique_tag.insert>
    ) => {
      const t = decodeSync(DB_Schemas.technique_tag.insert)(technique_tag);
      return query_single_id(
        pool,
        create_query.insert("technique_tag", query_object.keys.non_id(t)),
        query_object.values.non_id(t)
      );
    },
    select: (
      pool: VercelPool,
      technique_tag: ST<typeof DB_Schemas.technique_tag.select>
    ) => {
      const t = decodeSync(DB_Schemas.technique_tag.select)(technique_tag);
      return query_single(
        pool,
        create_query.select("technique_tag", query_object.keys.id_first(t)),
        query_object.values.id_first(t),
        DB.fields.table.fields.technique_tag
      );
    },
    update: (
      pool: VercelPool,
      technique_tag: ST<typeof DB_Schemas.technique_tag.update>
    ) => {
      const t = decodeSync(DB_Schemas.technique_tag.update)(technique_tag);
      return query_single_id(
        pool,
        create_query.update("technique_tag", query_object.keys.id_first(t)),
        query_object.values.id_first(t)
      );
    },
    delete: (
      pool: VercelPool,
      technique_tag: ST<typeof DB_Schemas.technique_tag.delete>
    ) => {
      const t = decodeSync(DB_Schemas.technique_tag.delete)(technique_tag);
      return query_single_id(
        pool,
        create_query.delete("technique_tag", query_object.keys.id_first(t)),
        query_object.values.id_first(t)
      );
    },
  },
  query: {
    single: query_single,
    single_id: query_single_id,
    multi: query_multi,
    multi_id: query_multi_id,
    unknown: (pool: VercelPool, query: string, params: any[]) => {
      return pool.query(query, params);
    },
  },
};
