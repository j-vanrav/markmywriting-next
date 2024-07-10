"use client";

import Button from "@/components/neobrutalist/button";
import { cn } from "@/lib/utils";
import { Camera, Feather, NotebookPen, User } from "lucide-react";
import { useState } from "react";

type PageName = "review" | "compose" | "profile";
function NavButton({
  selectedPage,
  name,
  trigger,
}: {
  selectedPage: PageName;
  name: PageName;
  trigger: (name: PageName) => void;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      className={cn(
        "rounded-full size-16 transition-all flex flex-row justify-center items-center",
        selectedPage === name && "w-40",
        name === "review" && "bg-nbgreen",
        name === "compose" && "bg-nborange",
        name === "profile" && "bg-nbpurple",
        pressed && "scale-75"
      )}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchCancel={() => setPressed(false)}
      onTouchMove={() => setPressed(false)}
      onClick={() => trigger(name)}
    >
      {name === "review" && (
        <NotebookPen absoluteStrokeWidth strokeWidth={1.5} className="size-8" />
      )}
      {name === "compose" && (
        <Camera absoluteStrokeWidth strokeWidth={1.5} className="size-8" />
      )}
      {name === "profile" && (
        <User absoluteStrokeWidth strokeWidth={1.5} className="size-8" />
      )}

      <div
        className={cn(
          "font-normal text-xl w-0 overflow-hidden transition-all flex flex-row justify-center",
          selectedPage === name && "w-24"
        )}
      >
        {name === "review" && <span>Review</span>}
        {name === "compose" && <span>Compose</span>}
        {name === "profile" && <span>Profile</span>}
      </div>
    </button>
  );
}

function Nav() {
  const [selectedPage, setSelectedPage] = useState("compose" as PageName);
  return (
    <nav className="w-full mt-auto p-2 flex flex-row justify-center">
      <div className="rounded-full bg-black p-1 gap-1 flex flex-row text-black w-full justify-between">
        <NavButton
          selectedPage={selectedPage}
          name={"review"}
          trigger={setSelectedPage}
        />
        <NavButton
          selectedPage={selectedPage}
          name={"compose"}
          trigger={setSelectedPage}
        />
        <NavButton
          selectedPage={selectedPage}
          name={"profile"}
          trigger={setSelectedPage}
        />
      </div>
    </nav>
  );
}

export default function Main() {
  return (
    <main className="flex flex-col w-screen h-svh bg-nbbgblue text-black">
      <div className="flex flex-col justify-center w-full h-full">
        <Button
          className="m-2 p-4 border-2 bg-white rounded-2xl text-black flex flex-row gap-4"
          onClick={() => {}}
        >
          <div className="bg-nborange size-12 rounded-md flex flex-row justify-center items-center">
            <Camera />
          </div>
          <h2>Take a photo of your writing</h2>
        </Button>
        <div className="flex flex-row justify-center w-full p-4">
          <span>OR</span>
        </div>
        <Button
          className="m-2 p-4 border-2 bg-white rounded-2xl text-black flex flex-row gap-4"
          onClick={() => {}}
        >
          <div className="bg-nbyellow size-12 rounded-md flex flex-row justify-center items-center">
            <Feather />
          </div>
          <h2>Type your writing</h2>
        </Button>
      </div>

      <Nav />
    </main>
  );
}
