"use client";

import Button from "@/components/neobrutalist/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BotOff,
  BrainCircuit,
  Calendar,
  Camera,
  Circle,
  Feather,
  ListFilter,
  Mail,
  NotebookPen,
  Slash,
  Ticket,
  User,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HapticsClick } from "@/lib/client-utils";
import { useOnClickOutside } from "@/lib/hooks";

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
      onClick={() => {
        HapticsClick();
        trigger(name);
      }}
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
        <span className="font-medium">
          {name === "review" && "Review"}
          {name === "compose" && "Compose"}
          {name === "profile" && "Profile"}
        </span>
      </div>
    </button>
  );
}

function Nav({
  selectedPage,
  setSelectedPage,
}: {
  selectedPage: PageName;
  setSelectedPage: (name: PageName) => void;
}) {
  return (
    <nav className="fixed bottom-0 w-full p-2 flex flex-row justify-center">
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

type CardColour = "yellow" | "orange" | "purple" | "green" | "blue";
type MarkingStatus = "marked" | "marking" | "unmarked";
interface ReviewOpts {
  marked: MarkingStatus;
  fromCamera: boolean;
  wordCount: number;
  creationDate: Date;
  prompt: string;
  id: string;
}
function ReviewCard({
  colour,
  className,
  opts,
  trigger,
  selected,
}: {
  colour: CardColour;
  className?: string;
  opts: ReviewOpts;
  trigger: (id: string) => void;
  selected: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      className={cn(
        "translate-x-0 transition-all w-full",
        pressed && "scale-90 -translate-y-6",
        selected && "-translate-y-12 scale-110",
        className
      )}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchCancel={() => setPressed(false)}
      onTouchMove={() => setPressed(false)}
      onClick={() => {
        HapticsClick();
        trigger(opts.id);
      }}
    >
      <div
        className={cn(
          "w-full h-4 rounded-t-2xl -translate-y-4 absolute left-0 right-0",
          opts.marked === "unmarked" && "bg-nbyellow",
          opts.marked === "unmarked" && opts.fromCamera && "bg-nborange",
          opts.marked === "marking" && "bg-gray-500",
          opts.marked === "marked" && "bg-nbgreen"
        )}
      />
      <div
        className={cn(
          "w-full bg-nbyellow h-24 flex flex-col items-start pb-6 px-4",
          opts.marked === "unmarked" && "bg-nbyellow",
          opts.marked === "unmarked" && opts.fromCamera && "bg-nborange",
          opts.marked === "marking" && "bg-gray-500",
          opts.marked === "marked" && "bg-nbgreen"
        )}
      >
        <div className="flex flex-row justify-between w-full items-start h-12">
          <div className="flex flex-row items-center gap-2 text-xl">
            {opts.fromCamera ? (
              <Camera
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-6"
              />
            ) : (
              <Feather
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-6"
              />
            )}
            The Box
          </div>

          <span className="text-sm">22.10.24</span>
        </div>
        <div className="flex flex-row justify-between w-full items-end gap-1 h-12 text-sm">
          {opts.marked === "marked" && (
            <div className="flex flex-row items-center gap-1">
              <Bot absoluteStrokeWidth strokeWidth={1.5} className="size-4" />
              Marked
            </div>
          )}
          {opts.marked === "unmarked" && (
            <div className="flex flex-row items-center gap-1">
              <BotOff
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-4"
              />
              Unmarked
            </div>
          )}
          {opts.marked === "marking" && (
            <div className="flex flex-row items-center gap-1 animate-pulse-strong">
              <BrainCircuit
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-4"
              />
              Marking...
            </div>
          )}
          {opts.marked === "marked" && (
            <div className="relative bg-black rounded-full text-white size-10">
              <span className="absolute top-1 left-1">27</span>
              <Slash
                absoluteStrokeWidth
                strokeWidth={1}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <span className="absolute bottom-1 right-1">47</span>
            </div>
          )}
          {opts.marked === "unmarked" && (
            <div className="flex flex-row items-center justify-center rounded-full text-black size-8">
              <ArrowRight
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-6"
              />
            </div>
          )}
        </div>
        {/* <span className="justify-self-end">200 words</span>
        <div />
        <div className="justify-self-end flex flex-row items-center gap-1 h-5">
          {opts.fromCamera && (
            <>
              <Camera
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-5"
              />
              From camera
            </>
          )}
        </div> */}
      </div>
      <div
        className={cn(
          "w-full h-4 rounded-b-2xl absolute left-0 right-0",
          opts.marked === "unmarked" && "bg-nbyellow",
          opts.marked === "unmarked" && opts.fromCamera && "bg-nborange",
          opts.marked === "marking" && "bg-gray-500",
          opts.marked === "marked" && "bg-nbgreen"
        )}
      />
    </button>
  );
}

function TabAnimated({
  className,
  active,
  name,
  select,
}: {
  className?: string;
  active: boolean;
  name: ReviewTabs;
  select: (name: ReviewTabs) => void;
}) {
  return (
    <div className={cn("grid h-8 w-28 grid-cols-1 items-center", className)}>
      {active && (
        <motion.div
          className={cn(
            "z-0 col-span-1 col-start-1 h-8 w-28 rounded-full bg-black"
          )}
          layoutId={"tabs-highlight"}
        />
      )}
      <button
        value={name}
        data-active={active}
        onClick={() => select(name)}
        className={cn(
          "z-40 col-span-1 col-start-1 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          active && "-mt-8 text-white"
        )}
      >
        {name === "all" && (
          <span className="flex flex-row items-start w-full gap-1">
            <Circle
              absoluteStrokeWidth
              strokeWidth={1.5}
              className="size-4 invisible"
            />
            All
          </span>
        )}
        {name === "unmarked" && (
          <span className="flex flex-row items-start w-full gap-1">
            <BotOff absoluteStrokeWidth strokeWidth={1.5} className="size-4" />
            Unmarked
          </span>
        )}
        {name === "marking" && (
          <span className="flex flex-row items-start w-full gap-1">
            <BrainCircuit
              absoluteStrokeWidth
              strokeWidth={1.5}
              className="size-4"
            />
            Marking
          </span>
        )}
        {name === "marked" && (
          <span className="flex flex-row items-start w-full gap-1">
            <Bot absoluteStrokeWidth strokeWidth={1.5} className="size-4" />
            Marked
          </span>
        )}
      </button>
    </div>
  );
}

const reviewCards: {
  marked: MarkingStatus;
  wordCount: number;
  creationDate: Date;
  prompt: string;
  fromCamera: boolean;
  id: string;
  colour: CardColour;
}[] = [
  {
    marked: "unmarked",
    wordCount: 200,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: true,
    id: "1",
    colour: "yellow",
  },
  {
    marked: "marking",
    wordCount: 300,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: false,
    id: "2",
    colour: "orange",
  },
  {
    marked: "marked",
    wordCount: 450,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: false,
    id: "3",
    colour: "green",
  },
  {
    marked: "unmarked",
    wordCount: 100,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: false,
    id: "4",
    colour: "purple",
  },
  {
    marked: "marking",
    wordCount: 600,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: true,
    id: "5",
    colour: "blue",
  },
  {
    marked: "unmarked",
    wordCount: 200,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: false,
    id: "6",
    colour: "yellow",
  },
  {
    marked: "marking",
    wordCount: 300,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: false,
    id: "7",
    colour: "orange",
  },
  {
    marked: "marked",
    wordCount: 450,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: false,
    id: "8",
    colour: "green",
  },
  {
    marked: "unmarked",
    wordCount: 100,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: true,
    id: "9",
    colour: "purple",
  },
  {
    marked: "marking",
    wordCount: 600,
    creationDate: new Date(),
    prompt: "The Box",
    fromCamera: true,
    id: "10",
    colour: "blue",
  },
];
type ReviewTabs = "all" | "unmarked" | "marking" | "marked";
type SortMode = "date-desc" | "date-asc" | "score-desc" | "score-asc";
function SelectCardPage({
  selectedCard,
  setSelectedCard,
}: {
  selectedCard: string;
  setSelectedCard: (id: string) => void;
}) {
  const [selectedTab, setSelectedTab] = useState("all" as ReviewTabs);
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [sortMode, setSortMode] = useState("date-desc" as SortMode);
  const tabsRef = useRef(null);
  useOnClickOutside(tabsRef, () => {
    setFilterCollapsed(true);
  });
  console.log(selectedTab);
  return (
    <div className="w-screen h-full p-4 pb-14 overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-row justify-between items-center p-4">
        <h1 className="text-2xl">Your Writing</h1>
        <ListFilter />
      </div>

      <div className="relative w-full flex flex-row h-16">
        <div
          ref={tabsRef}
          className={cn(
            "absolute z-10 h-40 w-32 p-2 py-6 bg-white rounded-3xl transition-all",
            filterCollapsed && "h-12"
          )}
        >
          <div className="relative py-8 h-full w-full flex flex-col">
            <TabAnimated
              className={cn(
                filterCollapsed
                  ? "absolute top-0 -translate-y-1/2"
                  : "absolute top-0 -translate-y-1/2",

                filterCollapsed &&
                  (selectedTab === "all" ? "visible z-20" : "invisible z-10")
              )}
              active={selectedTab === "all"}
              name={"all"}
              select={(t) => {
                if (!filterCollapsed) setSelectedTab(t);
                setFilterCollapsed((p) => !p);
              }}
            />
            <TabAnimated
              className={cn(
                filterCollapsed
                  ? "absolute top-0 -translate-y-1/2"
                  : "absolute top-1/3 -translate-y-1/2",
                filterCollapsed &&
                  (selectedTab === "unmarked"
                    ? "visible z-20"
                    : "invisible z-10")
              )}
              active={selectedTab === "unmarked"}
              name={"unmarked"}
              select={(t) => {
                if (!filterCollapsed) setSelectedTab(t);
                setFilterCollapsed((p) => !p);
              }}
            />
            <TabAnimated
              className={cn(
                filterCollapsed
                  ? "absolute top-0 -translate-y-1/2"
                  : "absolute bottom-1/3 translate-y-1/2",

                filterCollapsed &&
                  (selectedTab === "marking"
                    ? "visible z-20"
                    : "invisible z-10")
              )}
              active={selectedTab === "marking"}
              name={"marking"}
              select={(t) => {
                if (!filterCollapsed) setSelectedTab(t);
                setFilterCollapsed((p) => !p);
              }}
            />
            <TabAnimated
              className={cn(
                filterCollapsed
                  ? "absolute top-0 -translate-y-1/2"
                  : "absolute bottom-0 translate-y-1/2",

                filterCollapsed &&
                  (selectedTab === "marked" ? "visible z-20" : "invisible z-10")
              )}
              active={selectedTab === "marked"}
              name={"marked"}
              select={(t) => {
                if (!filterCollapsed) setSelectedTab(t);
                setFilterCollapsed((p) => !p);
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative flex-col justify-center py-6 text-lg">
        {reviewCards.map((card) => {
          const visible =
            selectedTab === "all" ||
            (selectedTab === "marking" && card.marked === "marking") ||
            (selectedTab === "unmarked" && card.marked === "unmarked") ||
            (selectedTab === "marked" && card.marked === "marked");
          return (
            <div
              key={`reviewcard-${card.id}`}
              className={cn(
                "h-0 transition-all invisible duration-700",
                visible && "h-24 visible"
              )}
            >
              <ReviewCard
                colour={card.colour}
                opts={card}
                trigger={setSelectedCard}
                selected={selectedCard === card.id}
                className={cn(visible ? "visible" : "invisible duration-0")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewPage() {
  const [selectedCard, setSelectedCard] = useState("0");
  const [cardPage, setCardPage] = useState("0");
  useEffect(() => {
    setTimeout(() => setCardPage(selectedCard), 400);
  }, [selectedCard]);
  return cardPage !== "0" ? (
    <div className="w-screen h-full p-4 pb-14 overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-row items-center gap-4">
        <Button
          className="size-12 rounded-full p-0 flex flex-row items-center justify-center bg-white"
          onClick={() => setSelectedCard("0")}
        >
          <ArrowLeft className="size-7 min-w-7 min-h-7" />
        </Button>
        <h1 className="text-2xl">Reviewing: {cardPage}</h1>
      </div>
    </div>
  ) : (
    <SelectCardPage
      selectedCard={selectedCard}
      setSelectedCard={setSelectedCard}
    />
  );
}

function ComposePage() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center gap-4 overflow-y-scroll">
      <div className="flex flex-row justify-between items-center p-4 w-full">
        <h1 className="text-2xl">Compose new writing</h1>
      </div>
      <Button
        className="p-4 border-2 bg-white rounded-2xl text-black flex flex-row gap-4 w-full"
        onClick={() => {}}
      >
        <div className="bg-nborange size-12 min-w-12 rounded-md flex flex-row justify-center items-center">
          <Camera />
        </div>
        <h2 className="text-lg">Take a photo of your writing</h2>
      </Button>
      <div className="flex flex-row justify-center w-full">
        <span className="text-lg">OR</span>
      </div>
      <Button
        className="p-4 border-2 bg-white rounded-2xl text-black flex flex-row gap-4 w-full"
        onClick={() => {}}
      >
        <div className="bg-nbyellow size-12 min-w-12 rounded-md flex flex-row justify-center items-center">
          <Feather />
        </div>
        <h2 className="text-lg">Type your writing</h2>
      </Button>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center gap-4">
      <div className="flex flex-row justify-between items-center p-4 w-full">
        <h1 className="text-2xl">Your Profile</h1>
      </div>
      <div className="bg-white rounded-2xl p-3 flex flex-row w-full items-center gap-4">
        <div className="bg-nbpurple size-12 min-w-12 rounded-md flex flex-row justify-center items-center">
          <Mail />
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Email</span>
          <span>mail@example.com</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-3 flex flex-row w-full items-center gap-4">
        <div className="bg-nbblue size-12 min-w-12 rounded-md flex flex-row justify-center items-center">
          <Calendar />
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Account created</span>
          <span>{new Date().toDateString()}</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-3 flex flex-row w-full items-center gap-4">
        <div className="bg-nbgreen size-12 min-w-12 rounded-md flex flex-row justify-center items-center">
          <Ticket />
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Tokens</span>
          <span>12</span>
        </div>
      </div>
      {/* <div className="bg-white rounded-2xl p-4 flex flex-col w-full gap-2">
        <div className="flex flex-row items-center gap-2">
          <Mail />
          <span className="text-sm">Email</span>
          <span className="text-xs ml-auto">mail@example.com</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Calendar />
          <span className="text-sm">Account created</span>

          <span className="text-xs ml-auto">{new Date().toDateString()}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Ticket />
          <span className="text-sm">Tokens</span>{" "}
          <span className="text-xs ml-auto">3</span>
        </div>
      </div> */}
      <div className="rounded-2xl flex flex-col items-center gap-4 w-full mb-16 mt-4">
        <span className="font-bold">Buy more tokens</span>
        <Button onClick={() => {}} className="bg-nbgreen rounded-2xl w-full">
          <div className="flex flex-row items-center gap-4 w-full justify-between">
            <Ticket className="size-12" absoluteStrokeWidth strokeWidth={1} />
            <div className="flex flex-col items-start">
              <span>20 Tokens</span>
              <span className="text-xl font-bold">$10</span>
            </div>
            <div className="bg-black rounded-full flex flex-row items-center justify-center text-white size-8">
              <ArrowRight />
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default function Main() {
  const [selectedPage, setSelectedPage] = useState("compose" as PageName);

  return (
    <main className="flex flex-col w-screen h-screen bg-nbbgblue text-black overflow-hidden">
      {selectedPage === "review" && <ReviewPage />}
      {selectedPage === "compose" && <ComposePage />}
      {selectedPage === "profile" && <ProfilePage />}
      <div className="h-9" />
      <Nav selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </main>
  );
}
