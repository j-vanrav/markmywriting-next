"use client";

import { cn } from "@/lib/utils";
import { Camera, NotebookPen, User } from "lucide-react";
import { useState } from "react";

type PageName = "review" | "compose" | "profile";
function Nav() {
  const [selectedPage, setSelectedPage] = useState("compose" as PageName);
  return (
    <nav className="w-full mt-auto p-2 flex flex-row justify-center">
      <div className="rounded-full bg-black p-1 gap-1 flex flex-row text-white">
        <button
          className={cn(
            "bg-nbgreen rounded-full size-16 transition-all flex flex-row justify-center items-center",
            selectedPage === "review" && "w-48"
          )}
          onClick={() => setSelectedPage("review")}
        >
          <NotebookPen
            absoluteStrokeWidth
            strokeWidth={1.5}
            className="size-8"
          />
          <div
            className={cn(
              "font-normal text-xl w-0 overflow-hidden transition-all flex flex-row justify-center",
              selectedPage === "review" && "w-24"
            )}
          >
            <span>Review</span>
          </div>
        </button>
        <button
          className={cn(
            "bg-nborange rounded-full size-16 transition-all flex flex-row justify-center items-center",
            selectedPage === "compose" && "w-48"
          )}
          onClick={() => setSelectedPage("compose")}
        >
          <Camera absoluteStrokeWidth strokeWidth={1.5} className="size-8" />
          <div
            className={cn(
              "font-normal text-xl w-0 overflow-hidden transition-all flex flex-row justify-center",
              selectedPage === "compose" && "w-24"
            )}
          >
            <span>Compose</span>
          </div>
        </button>
        <button
          className={cn(
            "bg-nbpurple rounded-full size-16 transition-all flex flex-row justify-center items-center",
            selectedPage === "profile" && "w-48"
          )}
          onClick={() => setSelectedPage("profile")}
        >
          <User absoluteStrokeWidth strokeWidth={1.5} className="size-8" />
          <div
            className={cn(
              "font-normal text-xl w-0 overflow-hidden transition-all flex flex-row justify-center",
              selectedPage === "profile" && "w-24"
            )}
          >
            <span>Profile</span>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default function Main() {
  return (
    <main className="flex flex-col w-screen h-svh bg-nbbgblue">
      <Nav />
    </main>
  );
}
