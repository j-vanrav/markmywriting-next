import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { delete_technique } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Pencil, Search, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function TechniqueTable({
  allData,
  displayData,
  mutate,
  selectTechnique,
}: {
  allData: Readonly<Technique[]>;
  displayData: Readonly<Technique[]>;
  mutate: () => void;
  selectTechnique: (t: Technique) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Information</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="text-right">To</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayData.map((d) => (
          <TableRow
            key={`data-${d.id}:${d.actor}`}
            className={cn(d.duplicated && "text-muted-foreground")}
          >
            <TableCell className="text-xs">
              <div className="flex flex-col">
                {d.sources.map((s) => (
                  <p
                    key={`data-rel-source-${s.id}:${s.actor}`}
                    className={cn(s.is_duplicated && "italic")}
                  >
                    {allData.find((d) => d.id === s.id)?.name} {s.actor}
                  </p>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {d.name} {d.actor}
            </TableCell>
            <TableCell>{d.information}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                {d.tags.map((t) => (
                  <div key={`data-tag-${t.id}`}>
                    <p>{t.tag}</p>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-right text-xs">
              <div className="flex flex-col">
                {d.targets.map((t) => (
                  <p
                    key={`data-rel-target-${t.id}:${t.actor}`}
                    className={cn(t.is_duplicated && "italic")}
                  >
                    {allData.find((d) => d.id === t.id)?.name} {t.actor}
                  </p>
                ))}
              </div>
            </TableCell>
            <TableCell className="flex flex-row gap-2">
              <Button asChild size="icon" variant="ghost">
                <Link
                  prefetch={false}
                  href={`/technique/${d.name.replaceAll(" ", "_")}`}
                >
                  <Search />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => {
                  selectTechnique(d);
                  window.scrollTo(0, 0);
                }}
              >
                <Pencil />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="destructive">
                    <Trash />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-screen">
                  <DialogHeader>
                    <DialogTitle>Delete technique</DialogTitle>
                    <DialogDescription>{JSON.stringify(d)}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      onClick={async () =>
                        delete_technique({ id: d.id }).then((r) => {
                          console.log(r);
                          if (r.success) mutate();
                        })
                      }
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
