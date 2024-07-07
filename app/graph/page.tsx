import {
  get_all_technique_nodes,
  get_all_technique_relations,
  get_all_technique_tags,
} from "@/lib/actions";
import { get_graph_data } from "@/lib/ui/utils";
import dynamic from "next/dynamic";

interface GraphDataBase {
  nodes: {
    id: string;
  }[];
  links: {
    source: string;
    target: string;
  }[];
}

export interface GraphData extends GraphDataBase {
  nodes: {
    color: string;
    name: string;
  }[] &
    GraphDataBase["nodes"];
}

const GraphNoSSR = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex flex-row items-center justify-center py-16">
      <p>Loading graph...</p>
    </div>
  ),
});

export default async function GraphPage() {
  const [nodesData, linksData, tagsData] = await Promise.all([
    get_all_technique_nodes(),
    get_all_technique_relations(),
    get_all_technique_tags(),
  ]);
  if (!nodesData.success || !linksData.success || !tagsData.success) {
    return <div>Failure</div>;
  }

  return (
    <GraphNoSSR
      data={{
        nodes: nodesData.data.map((n) => ({
          id: n.id,
          name: n.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          ),
        })),
        links: linksData.data.map((l) => ({
          source_actor: l.source_actor,
          source_id: l.source_id,
          target_actor: l.target_actor,
          target_id: l.target_id,
        })),
        tags: tagsData.data.map((t) => ({
          tag: t.tag,
          technique_id: t.technique_id,
        })),
      }}
    />
  );
}
