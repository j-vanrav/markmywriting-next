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
  miniature = false,
}: {
  selectedPage: PageName;
  name: PageName;
  trigger: (name: PageName) => void;
  miniature?: boolean;
}) {
  return (
    <TapButton
      className={cn(
        "rounded-full h-16 min-w-16 flex flex-row justify-center items-center transition-colors",
        // selectedPage === name && "w-48",
        name === "review" && "bg-cpylight2",
        name === "compose" && "bg-cpylight2",
        name === "profile" && "bg-cpylight2",
        selectedPage === name && "bg-cpylight",
        miniature && "h-4 min-w-4"
      )}
      onClick={() => {
        HapticsClick();
        trigger(name);
      }}
      layout
      style={{
        width:
          selectedPage === name ? (miniature ? 64 : 192) : miniature ? 16 : 64,
      }}
      transition={{ damping: 30, stiffness: 600 }}
    >
      {name === "review" &&
        !miniature &&
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
        !miniature &&
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
        !miniature &&
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
  miniature = false,
}: {
  selectedPage: PageName;
  setSelectedPage: (name: PageName) => void;
  miniature?: boolean;
}) {
  return (
    <nav className="fixed bottom-0 w-full p-2 px-4 flex flex-row justify-center z-50">
      <div
        className={cn(
          "rounded-full bg-cpylight p-1 gap-1 flex flex-row text-fgd w-full justify-between",
          miniature && "w-64 mx-auto"
        )}
      >
        <LayoutGroup>
          <NavButton
            selectedPage={selectedPage}
            name={"review"}
            trigger={setSelectedPage}
            miniature={miniature}
          />
          <NavButton
            selectedPage={selectedPage}
            name={"compose"}
            trigger={setSelectedPage}
            miniature={miniature}
          />
          <NavButton
            selectedPage={selectedPage}
            name={"profile"}
            trigger={setSelectedPage}
            miniature={miniature}
          />
        </LayoutGroup>
      </div>
    </nav>
  );
}
