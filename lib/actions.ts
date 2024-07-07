"use server";

import { ASQ, ASR } from "./schema";
import { Schema as S } from "@effect/schema";
import { clause, DAL } from "./dal";
import { log, ST } from "./utils";
import { pool } from "@/db/connection";
import { round } from "lodash";
import { VercelPool } from "@vercel/postgres";
import { decodeSync } from "@effect/schema/Schema";

type success<R> = { operation: string; success: true; data: R };
type failure = { operation: string; success: false; error: string };
async function db_execute<II, I, R, RR>(
  operationName: string,
  f: (db: VercelPool, operationName: string, data: II | I) => Promise<unknown>,
  opts?: {
    input?: I;
    inputSchema?: S.Schema<II, I, never>;
    outputSchema?: S.Schema<R, RR, never>;
  }
): Promise<success<R | RR> | failure> {
  const time0 = performance.now() / 1000;
  log.log(`action:${operationName}:start`);
  try {
    const i = opts?.inputSchema
      ? decodeSync(opts.inputSchema)(opts.input as I)
      : opts?.input;
    const r = await f(await pool(), operationName, i as I);
    const data = opts?.outputSchema
      ? decodeSync(opts.outputSchema)(r as RR)
      : (r as R);
    const time1 = performance.now() / 1000;
    log.log(`action:${operationName}:success:` + round(time1 - time0, 2));
    return { operation: operationName, success: true, data };
  } catch (err: any) {
    const time1 = performance.now() / 1000;
    log.error(`action:${operationName}:failure:` + round(time1 - time0, 2));
    return {
      operation: operationName,
      success: false,
      error: (err.message as string) ?? "Unknown error",
    };
  }
}

export async function select_techniques(
  input: ST<typeof ASQ.select_technique>
) {
  return await db_execute(
    "select_techniques",
    async (db, _, i) => {
      const non_tag_i = {
        name: i.name,
        information: i.information,
        ruleset: i.ruleset,
      };
      const entries = Object.entries(non_tag_i).filter(
        ([k, v]) => v && v.length > 0
      ) as [string, string][];
      return (
        await DAL.query.unknown(
          db,
          `SELECT
              t.id AS id,
              t.name AS name,
              t.information AS information,
              t.ruleset AS ruleset,
              ARRAY(
                  SELECT jsonb_build_object(
                      'id', tr.id,
                      'source_id', tr.source_id,
                      'source_actor', tr.source_actor,
                      'target_id', tr.target_id,
                      'target_actor', tr.target_actor,
                      'type', tr.type
                  )
                  FROM technique_relation tr
                  WHERE t.id = tr.source_id OR t.id = tr.target_id
              ) AS relations,
              ARRAY(
                  SELECT jsonb_build_object(
                      'id', tt.id,
                      'technique_id', tt.technique_id,
                      'tag', tt.tag
                  )
                  FROM technique_tag tt
                  WHERE t.id = tt.technique_id
                  ${
                    i.tag
                      ? `AND tt.tag=$${Object.keys(non_tag_i).length + 1}`
                      : ""
                  }
              ) AS tags
          FROM
              technique t
          ${clause.WHERE.substring(entries.map(([k, v]) => k))}
          GROUP BY
              t.id, t.name, t.information, t.ruleset
          ORDER BY
              t.name;`,
          [...entries.map(([k, v]) => v), ...(i.tag ? [i.tag] : [])]
        )
      ).rows;
    },
    {
      inputSchema: ASQ.select_technique,
      outputSchema: ASR.select_technique,
      input,
    }
  );
}

export async function create_technique(input: ST<typeof ASQ.create_technique>) {
  return await db_execute(
    "create_technique",
    async (db, _, i) => {
      const new_technique = await DAL.technique.insert(db, {
        name: i.name,
        information: i.information,
        ruleset: "gi",
      });
      await Promise.all([
        ...i.sources.map((s) =>
          DAL.technique_relation.insert(db, {
            source_id: s.id,
            source_actor: s.actor,
            target_id: new_technique.id,
            target_actor: i.actor,
            type: "transition",
          })
        ),
        ...i.targets.map((t) =>
          DAL.technique_relation.insert(db, {
            source_id: new_technique.id,
            source_actor: i.actor,
            target_id: t.id,
            target_actor: t.actor,
            type: "transition",
          })
        ),
        ...i.tags.map((tag) =>
          DAL.technique_tag.insert(db, { technique_id: new_technique.id, tag })
        ),
      ]);
    },
    { inputSchema: ASQ.create_technique, input }
  );
}

export async function delete_technique(input: ST<typeof ASQ.delete_technique>) {
  return await db_execute(
    "delete_technique",
    async (db, _, i) => {
      await Promise.all([
        DAL.query.multi_id(
          db,
          `DELETE FROM technique_tag WHERE technique_id=$1 RETURNING id`,
          [i.id]
        ),
        DAL.query.multi_id(
          db,
          `DELETE FROM technique_relation WHERE source_id=$1 OR target_id=$1 RETURNING id`,
          [i.id]
        ),
      ]);
      await DAL.technique.delete(db, i);
    },
    { inputSchema: ASQ.delete_technique, input }
  );
}

export async function update_technique(input: ST<typeof ASQ.update_technique>) {
  return await db_execute(
    "update_technique",
    async (db, _, i) => {
      await Promise.all([
        DAL.technique.update(db, {
          id: i.id,
          name: i.name,
          information: i.information,
          ruleset: "gi",
        }),
        ...(i.sources
          ? [
              DAL.query
                .multi_id(
                  db,
                  `DELETE FROM technique_relation WHERE target_id=$1 RETURNING id`,
                  [i.id]
                )
                .then(() =>
                  Promise.all([
                    ...i.sources!.map((s) =>
                      DAL.technique_relation.insert(db, {
                        source_id: s.id,
                        source_actor: s.actor,
                        target_id: i.id,
                        target_actor: i.actor!,
                        type: "transition",
                      })
                    ),
                  ])
                ),
            ]
          : []),
        ...(i.targets
          ? [
              DAL.query
                .multi_id(
                  db,
                  `DELETE FROM technique_relation WHERE source_id=$1 RETURNING id`,
                  [i.id]
                )
                .then(() =>
                  Promise.all([
                    ...i.targets!.map((t) =>
                      DAL.technique_relation.insert(db, {
                        source_id: i.id,
                        source_actor: i.actor!,
                        target_id: t.id,
                        target_actor: t.actor,
                        type: "transition",
                      })
                    ),
                  ])
                ),
            ]
          : []),
        ...(i.tags
          ? [
              DAL.query
                .multi_id(
                  db,
                  `DELETE FROM technique_tag WHERE technique_id=$1 RETURNING id`,
                  [i.id]
                )
                .then(() =>
                  Promise.all([
                    ...i.tags!.map((tag) =>
                      DAL.technique_tag.insert(db, {
                        technique_id: i.id,
                        tag,
                      })
                    ),
                  ])
                ),
            ]
          : []),
      ]);
    },
    { inputSchema: ASQ.update_technique, input }
  );
}

export async function get_all_techniques() {
  return await db_execute(
    "get_all_techniques",
    async (db) => {
      const a = await DAL.query.unknown(
        db,
        `SELECT
              t.id AS id,
              t.name AS name,
              t.information AS information,
              t.ruleset AS ruleset,
              ARRAY(
                  SELECT jsonb_build_object(
                      'id', tr.id,
                      'source_id', tr.source_id,
                      'source_actor', tr.source_actor,
                      'target_id', tr.target_id,
                      'target_actor', tr.target_actor,
                      'type', tr.type
                  )
                  FROM technique_relation tr
                  WHERE t.id = tr.source_id OR t.id = tr.target_id
              ) AS relations,
              ARRAY(
                  SELECT jsonb_build_object(
                      'id', tt.id,
                      'technique_id', tt.technique_id,
                      'tag', tt.tag
                  )
                  FROM technique_tag tt
                  WHERE t.id = tt.technique_id
              ) AS tags
          FROM
              technique t
          GROUP BY
              t.id, t.name, t.information, t.ruleset
          ORDER BY
              t.name;`,
        []
      );
      return a.rows;
    },
    { outputSchema: ASR.get_all_techniques }
  );
}

export async function get_all_technique_nodes() {
  return await db_execute(
    "get_all_technique_nodes",
    async (db) =>
      (
        await DAL.query.unknown(db, `SELECT * FROM technique`, [])
      ).rows,
    { outputSchema: ASR.get_all_technique_nodes }
  );
}

export async function get_all_technique_relations() {
  return await db_execute(
    "get_all_technique_relations",
    async (db) =>
      (
        await DAL.query.unknown(db, `SELECT * FROM technique_relation`, [])
      ).rows,
    { outputSchema: ASR.get_all_technique_relations }
  );
}

export async function get_all_technique_tags() {
  return await db_execute(
    "get_all_technique_tags",
    async (db) =>
      (
        await DAL.query.unknown(db, `SELECT * FROM technique_tag`, [])
      ).rows,
    { outputSchema: ASR.get_all_technique_tags }
  );
}
