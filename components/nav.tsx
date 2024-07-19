"use client";
import { cn } from "@/lib/utils";
import { Camera, NotebookPen, User } from "lucide-react";
import React, { useState } from "react";
import { HapticsClick } from "@/lib/client-utils";
import TapButton from "./tap-button";
import { LayoutGroup } from "framer-motion";

function NavButton({
  selectedPage,
  name,
  trigger,
}: {
  selectedPage: PageName;
  name: PageName;
  trigger: (name: PageName) => void;
}) {
  return (
    <TapButton
      className={cn(
        "rounded-full h-16 min-w-16 flex flex-row justify-center items-center",
        // selectedPage === name && "w-48",
        name === "review" && "bg-nbgreen",
        name === "compose" && "bg-nborange",
        name === "profile" && "bg-nbpurple"
      )}
      onClick={() => {
        HapticsClick();
        trigger(name);
      }}
      layout
      style={{
        width: selectedPage === name ? 192 : 64,
      }}
      transition={{ damping: 30, stiffness: 600 }}
    >
      {name === "review" &&
        (selectedPage !== name ? (
          <NotebookPen
            absoluteStrokeWidth
            strokeWidth={1.5}
            className={cn(
              "size-8 min-w-8"
              // selectedPage === name ? "size-6 min-w-6" : "ml-4"
            )}
          />
        ) : (
          <span className="font-medium text-2xl">Review</span>
        ))}
      {name === "compose" &&
        (selectedPage !== name ? (
          <Camera
            absoluteStrokeWidth
            strokeWidth={1.5}
            className={cn(
              "size-8 min-w-8"
              // selectedPage === name ? "size-6 min-w-6" : "ml-4"
            )}
          />
        ) : (
          <span className="font-medium text-2xl">Compose</span>
        ))}
      {name === "profile" &&
        (selectedPage !== name ? (
          <User
            absoluteStrokeWidth
            strokeWidth={1.5}
            className={cn(
              "size-8 min-w-8"
              // selectedPage === name ? "size-6 min-w-6" : "ml-4"
            )}
          />
        ) : (
          <span className="font-medium text-2xl">Profile</span>
        ))}
      <div className={cn(selectedPage === name ? "w-2" : "w-0")} />
      {/* <div
        className={cn(
          "font-normal text-xl opacity-0 overflow-hidden transition-opacity duration-200 flex flex-row justify-center",
          selectedPage === name && "w-fit opacity-100"
        )}
      >
        <span className="font-medium">
          {name === "review" && "Review"}
          {name === "compose" && "Compose"}
          {name === "profile" && "Profile"}
        </span>
      </div> */}
    </TapButton>
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
        <LayoutGroup>
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
        </LayoutGroup>
      </div>
    </nav>
  );
}
