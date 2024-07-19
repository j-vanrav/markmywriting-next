"use client";
import { cn } from "@/lib/utils";
import { Camera, NotebookPen, User } from "lucide-react";
import React, { useState } from "react";
import { HapticsClick } from "@/lib/client-utils";

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
        "rounded-full size-16 transition-all duration-200 flex flex-row justify-center items-center",
        selectedPage === name && "w-48",
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
      onClick={() => {
        HapticsClick();
        trigger(name);
      }}
    >
      {name === "review" && (
        <NotebookPen
          absoluteStrokeWidth
          strokeWidth={1.5}
          className={cn(
            "size-8 min-w-8 transition-all duration-200",
            selectedPage === name ? "size-6 min-w-6" : "ml-4"
          )}
        />
      )}
      {name === "compose" && (
        <Camera
          absoluteStrokeWidth
          strokeWidth={1.5}
          className={cn(
            "size-8 min-w-8 transition-all duration-200",
            selectedPage === name ? "size-6 min-w-6" : "ml-4"
          )}
        />
      )}
      {name === "profile" && (
        <User
          absoluteStrokeWidth
          strokeWidth={1.5}
          className={cn(
            "size-8 min-w-8 transition-all duration-200",
            selectedPage === name ? "size-6 min-w-6" : "ml-4"
          )}
        />
      )}
      <div className={cn(selectedPage === name ? "w-2" : "w-0")} />
      <div
        className={cn(
          "font-normal text-xl opacity-0 overflow-hidden transition-all duration-200 flex flex-row justify-center",
          selectedPage === name && "w-fit opacity-100"
        )}
      >
        <span className="font-medium">
          {name === "review" && "Review"}
          {name === "compose" && "Compose"}
          {name === "profile" && "Profile"}
        </span>
      </div>
    </button>
  );
}

export default function Nav({
  selectedPage,
  setSelectedPage,
}: {
  selectedPage: PageName;
  setSelectedPage: (name: PageName) => void;
}) {
  return (
    <nav className="fixed bottom-0 w-full p-2 px-4 flex flex-row justify-center z-50">
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
