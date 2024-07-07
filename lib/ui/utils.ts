export const map_data_to_ms_split = (
  data: Readonly<{ id: string; name: string }[]>,
  values: Readonly<{ id: string }[]>
) => {
  return values.flatMap((v) => {
    const datum = data.find((d) => d.id === v.id);
    return [
      {
        value: v.id + ":" + "one",
        label: (datum?.name ?? "") + " " + "one",
      },
      {
        value: v.id + ":" + "two",
        label: (datum?.name ?? "") + " " + "two",
      },
    ];
  });
};

export const data_to_ms = (data: Readonly<{ id: string; name: string }[]>) => {
  return (v: Readonly<{ id: string; actor: Actor }>) => {
    const datum = data.find((d) => d.id === v.id);
    return {
      value: v.id + ":" + v.actor,
      label: (datum?.name ?? "") + " " + v.actor,
    };
  };
};

export const map_ms_to_data = (o: { value: string }) => {
  const [id, actor] = o.value.split(":");
  return { id, actor: actor ?? "one" };
};

export const convert_technique = (t: Technique_With_Rels): Technique => {
  return {
    id: t.id,
    name: t.name,
    information: t.information,
    tags: t.tags,
    actor: "one",
    sources: t.relations
      .filter((r) => r.target_id === t.id && r.target_actor === "one")
      .map((r) => ({
        id: r.source_id,
        actor: r.source_actor,
        is_duplicated: r.is_duplicated,
      })),
    targets: t.relations
      .filter((r) => r.source_id === t.id && r.source_actor === "one")
      .map((r) => ({
        id: r.target_id,
        actor: r.target_actor,
        is_duplicated: r.is_duplicated,
      })),
    duplicated: false,
  };
};

export const duplicate_technique = (t: Technique): [Technique, Technique] => {
  return [
    {
      ...t,
    },
    {
      ...t,
      actor: "two",
      sources: t.sources.map((s) => ({ ...s, actor: invert_actor(s.actor) })),
      targets: t.targets.map((s) => ({ ...s, actor: invert_actor(s.actor) })),
      duplicated: true,
    },
  ];
};

export const invert_actor = (a: Actor) => {
  return a === "one" ? "two" : "one";
};

export const duplicate_relationships = (r: {
  target_id: string;
  id: string;
  source_id: string;
  source_actor: Actor;
  target_actor: Actor;
}): [
  {
    target_id: string;
    id: string;
    source_id: string;
    source_actor: Actor;
    target_actor: Actor;
    is_duplicated: boolean;
  },
  {
    target_id: string;
    id: string;
    source_id: string;
    source_actor: Actor;
    target_actor: Actor;
    is_duplicated: boolean;
  }
] => {
  return [
    { ...r, is_duplicated: false },
    {
      ...r,
      source_actor: invert_actor(r.source_actor),
      target_actor: invert_actor(r.target_actor),
      is_duplicated: true,
    },
  ];
};

export const has_tag =
  <T extends { tag: string; technique_id: string }[]>(tags: T | Readonly<T>) =>
  (technique_id: string) =>
  (tag: string) =>
    !!tags.find((t) => t.technique_id === technique_id && t.tag === tag);

const get_node_color = (
  has: (tag: string) => boolean,
  is: (actor: Actor) => boolean
) => {
  if (is("one")) {
    if (has("disengaged")) return "hsl(53, 100%, 47%)";
    if (has("submission")) return "hsl(344, 100%, 62%)";
    if (has("guard")) return "hsl(240, 100%, 50%)";
    if (has("control")) return "hsl(200, 100%, 50%)";
    if (has("guard pass")) return "hsl(278, 100%, 50%)";
    if (has("wrestling")) return "hsl(113, 90%, 44%)";
    if (has("judo")) return "hsl(28, 100%, 50%)";
    if (has("sweep")) return "hsl(159, 65%, 53%)";
    return "hsl(253, 31%, 98%)";
  }
  return "hsl(253, 16%, 20%)";
};

export const get_graph_data = <
  N extends { id: string; name: string }[],
  L extends {
    source_id: string;
    target_id: string;
    source_actor: Actor;
    target_actor: Actor;
  }[],
  T extends { tag: string; technique_id: string }[]
>(
  nodes: N | Readonly<N>,
  links: L | Readonly<L>,
  tags: T | Readonly<T>,
  duplicate?: boolean
) => {
  const hastag = has_tag(tags);
  let out_nodes;
  let out_links;
  if (duplicate) {
    out_nodes = [
      ...nodes.map((n) => ({
        id: n.id + ":one",
        name: n.name,
        color: get_node_color(hastag(n.id), (v) => v === "one"),
      })),
      ...nodes.map((n) => ({
        id: n.id + ":two",
        name: n.name,
        color: get_node_color(hastag(n.id), (v) => v === "two"),
      })),
    ];
    out_links = [
      ...links.map((l) => ({
        source: l.source_id + ":" + l.source_actor,
        target: l.target_id + ":" + l.target_actor,
      })),
      ...links.map((l) => ({
        source: l.source_id + ":" + invert_actor(l.source_actor),
        target: l.target_id + ":" + invert_actor(l.target_actor),
      })),
    ];
  } else {
    out_nodes = [
      ...nodes.map((n) => ({
        id: n.id,
        name: n.name,
        color: get_node_color(hastag(n.id), (v) => v === "one"),
      })),
    ];
    out_links = [
      ...links.map((l) => ({
        source: l.source_id,
        target: l.target_id,
      })),
    ];
  }
  return { nodes: out_nodes, links: out_links };
};
