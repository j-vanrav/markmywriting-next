"use server";

import { select_techniques } from "@/lib/actions";

export default async function TechniquePage({
  params,
}: {
  params: { technique_name: string };
}) {
  console.log(params);
  return (
    <pre>
      {JSON.stringify(
        await select_techniques({
          name: params.technique_name.replaceAll("_", " "),
        }),
        null,
        4
      )}
    </pre>
  );
}
