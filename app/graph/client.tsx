"use client";

import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Layers2, Palette, Rotate3D } from "lucide-react";
import { get_graph_data } from "@/lib/ui/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

function Graph3D({
  nodes,
  links,
  tags,
  duplicateNodes,
}: {
  nodes: OptRdnly<{ id: string; name: string }[]>;
  links: OptRdnly<
    {
      source_id: string;
      target_id: string;
      source_actor: Actor;
      target_actor: Actor;
    }[]
  >;
  tags: OptRdnly<{ tag: string; technique_id: string }[]>;
  duplicateNodes: boolean;
}) {
  return (
    <ForceGraph3D
      backgroundColor="hsl(253, 43%, 3%)"
      graphData={get_graph_data(nodes, links, tags, duplicateNodes)}
      linkColor={() => "hsl(253, 0%, 100%)"}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
    />
  );
}

function Graph2D({
  nodes,
  links,
  tags,
  duplicateNodes,
}: {
  nodes: OptRdnly<{ id: string; name: string }[]>;
  links: OptRdnly<
    {
      source_id: string;
      target_id: string;
      source_actor: Actor;
      target_actor: Actor;
    }[]
  >;
  tags: OptRdnly<{ tag: string; technique_id: string }[]>;
  duplicateNodes: boolean;
}) {
  return (
    <ForceGraph2D
      backgroundColor="hsl(253, 43%, 3%)"
      graphData={get_graph_data(nodes, links, tags, duplicateNodes)}
      linkColor={() => "hsl(253, 0%, 50%)"}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
      autoPauseRedraw={false}
    />
  );
}

export default function GraphClient({
  data,
}: {
  data: {
    nodes: OptRdnly<{ id: string; name: string }[]>;
    links: OptRdnly<
      {
        source_id: string;
        target_id: string;
        source_actor: Actor;
        target_actor: Actor;
      }[]
    >;
    tags: OptRdnly<{ tag: string; technique_id: string }[]>;
  };
}) {
  const [duplicateNodes, setDuplicateNodes] = useState(false);
  const [show3d, setShow3d] = useState(false);
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-2 absolute top-0 left-0 z-50 p-2">
        <Toggle
          aria-label="Show inversions"
          pressed={duplicateNodes}
          onPressedChange={setDuplicateNodes}
          className="justify-start"
        >
          <Layers2 className="mr-2 h-4 w-4" />
          Show inversions
        </Toggle>
        <Toggle
          aria-label="Enable 3D mode"
          pressed={show3d}
          onPressedChange={setShow3d}
          className="justify-start"
        >
          <Rotate3D className="mr-2 h-4 w-4" />
          3D mode
        </Toggle>
        <Collapsible>
          <CollapsibleTrigger className="w-full">
            <Toggle
              aria-label="Show colour code"
              className="justify-start w-full"
            >
              <Palette className="mr-2 h-4 w-4" /> Colour key
            </Toggle>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col items-start gap-1 px-3 pt-2">
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(53, 100%, 47%)" }}
              >
                Disengaged
              </Badge>
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(113, 90%, 44%)" }}
              >
                Wrestling
              </Badge>
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(28, 100%, 50%)" }}
              >
                Judo
              </Badge>
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(240, 100%, 50%)" }}
              >
                Guard
              </Badge>
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(278, 100%, 50%)" }}
              >
                Guard pass
              </Badge>
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(200, 100%, 50%)" }}
              >
                Control/static
              </Badge>
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(159, 65%, 53%)" }}
              >
                Sweep
              </Badge>
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(344, 100%, 62%)" }}
              >
                Submission
              </Badge>
              <Badge
                className="text-background"
                style={{ backgroundColor: "hsl(253, 31%, 98%)" }}
              >
                Other
              </Badge>
              {duplicateNodes && (
                <Badge
                  className="text-background"
                  style={{ backgroundColor: "hsl(253, 16%, 20%)" }}
                >
                  Inverted
                </Badge>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      {show3d ? (
        <Graph3D {...data} duplicateNodes={duplicateNodes} />
      ) : (
        <Graph2D {...data} duplicateNodes={duplicateNodes} />
      )}
    </div>
  );
}
