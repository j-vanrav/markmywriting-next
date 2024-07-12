"use client";

import Button from "@/components/neobrutalist/button";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bot,
  BotOff,
  BrainCircuit,
  Calendar,
  Camera,
  Pencil,
  ListFilter,
  Mail,
  NotebookPen,
  Slash,
  Ticket,
  User,
  Squircle,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HapticsClick } from "@/lib/client-utils";
import { useOnClickOutside } from "@/lib/hooks";
import Image from "next/image";

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

function Nav({
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

type CardColour = "yellow" | "orange" | "purple" | "green" | "blue";
type MarkingStatus = "marked" | "marking" | "unmarked";
function ReviewCard({
  colour,
  className,
  opts,
  trigger,
  selected,
  ...args
}: {
  colour: CardColour;
  className?: string;
  opts: ReviewCard;
  trigger: (id: string) => void;
  selected: boolean;
  disabled?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      className={cn(
        "translate-x-0 transition-all w-full z-50",
        pressed && "scale-90 -translate-y-6",
        selected && "-translate-y-12 scale-110 z-50",
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
      {...args}
    >
      <div
        className={cn(
          "w-full h-4 rounded-t-2xl -translate-y-3 absolute left-0 right-0",
          opts.marked === "unmarked" && "bg-nbyellow",
          opts.marked === "unmarked" && opts.fromCamera && "bg-nborange",
          opts.marked === "marking" && "bg-nbblue",
          opts.marked === "marked" && "bg-nbpurple"
        )}
      />
      <div
        className={cn(
          "w-full bg-nbyellow h-28 flex flex-col items-start pb-6 px-4",
          opts.marked === "unmarked" && "bg-nbyellow",
          opts.marked === "unmarked" && opts.fromCamera && "bg-nborange",
          opts.marked === "marking" && "bg-nbblue",
          opts.marked === "marked" && "bg-nbpurple"
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
              <Pencil
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-6"
              />
            )}
            The Box
          </div>

          <span className="text-sm opacity-70">
            {opts.creationDate.toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-row justify-between w-full items-end gap-1 h-12 text-sm">
          {opts.marked === "marked" && (
            <div className="flex flex-row items-center gap-1">
              <Bot absoluteStrokeWidth strokeWidth={1.5} className="size-4" />
              Marked
            </div>
          )}
          {opts.marked === "unmarked" && (
            <div className="flex flex-row items-center gap-1 bg-black text-white rounded-full px-2">
              <BotOff
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-4"
              />
              Unmarked
            </div>
          )}
          {opts.marked === "marking" && (
            <div className="flex flex-row items-center gap-1">
              <BrainCircuit
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-4 animate-pulse-strong"
              />
              <span className="animate-pulse-strong">Marking...</span>
            </div>
          )}
          {opts.marked === "marked" && (
            <div className="relative bg-black rounded-full text-white size-12">
              <span className="absolute top-2 left-2 text-xs">
                {opts.score}
              </span>
              <Slash
                absoluteStrokeWidth
                strokeWidth={1}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <span className="absolute bottom-2 right-2 text-xs">47</span>
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
          "w-full h-4 rounded-b-2xl -translate-y-1 absolute left-0 right-0",
          opts.marked === "unmarked" && "bg-nbyellow",
          opts.marked === "unmarked" && opts.fromCamera && "bg-nborange",
          opts.marked === "marking" && "bg-nbblue",
          opts.marked === "marked" && "bg-nbpurple"
        )}
      />
    </button>
  );
}

type TabAnimatedSize = "sm" | "md" | "icon";
function TabAnimated<T extends string>({
  id,
  className,
  active,
  name,
  select,
  children,
  size,
  disabled,
}: {
  id: string;
  className?: string;
  active: boolean;
  name: T;
  select: (name: T) => void;
  children: React.ReactNode;
  size: TabAnimatedSize;
  disabled: boolean;
}) {
  return (
    <div
      className={cn(
        "grid h-8 w-32 grid-cols-1 items-center",
        size === "md" && "w-32",
        size === "sm" && "w-24",
        size === "icon" && "w-8",
        className,
        disabled && "pointer-events-none"
      )}
    >
      {active && (
        <motion.div
          key={"tabs-highlight-" + id}
          className={cn(
            "z-0 col-span-1 col-start-1 h-8 rounded-full bg-black",
            size === "md" && "w-32",
            size === "sm" && "w-24",
            size === "icon" && "h-8",
            disabled && "pointer-events-none"
          )}
          layoutId={"tabs-highlight-" + id}
        />
      )}
      <button
        value={name}
        data-active={active}
        onClick={() => select(name)}
        className={cn(
          "z-40 col-span-1 col-start-1 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          active && "-mt-8 text-white",
          size === "icon" &&
            "flex flex-row items-center justify-center text-xs",
          disabled && "pointer-events-none"
        )}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}

type ReviewCard = {
  marked: MarkingStatus;
  wordCount: number;
  creationDate: Date;
  prompt: string;
  fromCamera: boolean;
  id: string;
  colour: CardColour;
  score: number;
};
const reviewCards: ReviewCard[] = [
  {
    marked: "unmarked",
    wordCount: 200,
    creationDate: new Date("2024-06-05"),
    prompt: "The Box",
    fromCamera: true,
    id: "1",
    colour: "yellow",
    score: 15,
  },
  {
    marked: "marking",
    wordCount: 300,
    creationDate: new Date("2024-06-04"),
    prompt: "The Box",
    fromCamera: false,
    id: "2",
    colour: "orange",
    score: 16,
  },
  {
    marked: "marked",
    wordCount: 450,
    creationDate: new Date("2024-06-02"),
    prompt: "The Box",
    fromCamera: false,
    id: "3",
    colour: "green",
    score: 10,
  },
  {
    marked: "unmarked",
    wordCount: 100,
    creationDate: new Date("2024-02-01"),
    prompt: "The Box",
    fromCamera: false,
    id: "4",
    colour: "purple",
    score: 25,
  },
  {
    marked: "marking",
    wordCount: 600,
    creationDate: new Date("2024-01-01"),
    prompt: "The Box",
    fromCamera: true,
    id: "5",
    colour: "blue",
    score: 40,
  },
  {
    marked: "unmarked",
    wordCount: 200,
    creationDate: new Date("2023-06-05"),
    prompt: "The Box",
    fromCamera: false,
    id: "6",
    colour: "yellow",
    score: 30,
  },
  {
    marked: "marking",
    wordCount: 300,
    creationDate: new Date("2022-06-05"),
    prompt: "The Box",
    fromCamera: false,
    id: "7",
    colour: "orange",
    score: 5,
  },
  {
    marked: "marked",
    wordCount: 450,
    creationDate: new Date("2021-02-01"),
    prompt: "The Box",
    fromCamera: false,
    id: "8",
    colour: "green",
    score: 20,
  },
  {
    marked: "unmarked",
    wordCount: 100,
    creationDate: new Date("2021-02-01"),
    prompt: "The Box",
    fromCamera: true,
    id: "9",
    colour: "purple",
    score: 20,
  },
  {
    marked: "marking",
    wordCount: 600,
    creationDate: new Date("2021-01-02"),
    prompt: "The Box",
    fromCamera: true,
    id: "10",
    colour: "blue",
    score: 35,
  },
];
type ReviewTabs = "all" | "unmarked" | "marking" | "marked";
type SortMode = "date-desc" | "date-asc" | "score-desc" | "score-asc";
type FilterCameraMode = "all" | "camera" | "written";
function SelectCardPage({
  selectedCard,
  setSelectedCard,
}: {
  selectedCard: string;
  setSelectedCard: (id: string) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all" as ReviewTabs);
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [sortMode, setSortMode] = useState("date-desc" as SortMode);
  const [sortCollapsed, setSortCollapsed] = useState(false);
  const [filterCamera, setFilterCamera] = useState("all" as FilterCameraMode);
  const filterTabsRef = useRef(null);
  useOnClickOutside(filterTabsRef, () => {
    setFilterCollapsed(true);
  });
  const sortTabsRef = useRef(null);
  useOnClickOutside(sortTabsRef, () => {
    setSortCollapsed(true);
  });

  const sortFn = (a: ReviewCard, b: ReviewCard) => {
    if (sortMode === "date-desc")
      return b.creationDate.getTime() - a.creationDate.getTime();
    if (sortMode === "date-asc")
      return a.creationDate.getTime() - b.creationDate.getTime();
    if (sortMode === "score-desc") return b.score - a.score;
    if (sortMode === "score-asc") return a.score - b.score;
    return 0;
  };
  return (
    <div className="w-screen h-full p-4 pb-14 overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-row justify-between items-center p-4 gap-4">
        <h1 className="text-2xl mr-auto">Your Writing</h1>
        <Button
          onClick={() => setShowFilters((p) => !p)}
          className="rounded-lg bg-white size-12 flex flex-row items-center justify-center"
        >
          <ListFilter className="size-7 min-w-7" />
        </Button>
        <Image
          src="/brutalist-elements/SVG/Frame-90.svg"
          alt={"Shape 57"}
          width={64}
          height={64}
          className="text-nborange fill-nborange rotate-90"
        />
      </div>

      <div
        className={cn(
          "relative w-full flex flex-row justify-center gap-2 transition-all duration-300",
          showFilters ? "h-14 opacity-100 z-20" : "h-0 opacity-0 z-0"
        )}
      >
        <div
          ref={filterTabsRef}
          className={cn(
            "h-fit w-36 p-2 bg-white rounded-3xl transition-all duration-300 overflow-hidden",
            filterCollapsed ? "h-12" : "h-36"
          )}
        >
          <div
            className={cn(
              "relative h-0 w-full flex flex-col transition-all duration-300",
              filterCollapsed ? "h-0" : "h-32"
            )}
          >
            <TabAnimated
              id={"filter-tabs"}
              className={cn(
                "bg-white rounded-full absolute top-0",
                selectedTab === "all" ? "z-10" : "z-0"
              )}
              active={selectedTab === "all"}
              name={"all"}
              select={(t) => {
                if (!filterCollapsed) setSelectedTab(t);
                setFilterCollapsed((p) => !p);
              }}
              size="md"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center w-full gap-1">
                <Squircle
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4 invisible"
                />
                All
              </span>
            </TabAnimated>
            <TabAnimated
              id={"filter-tabs"}
              className={cn(
                "bg-white rounded-full absolute top-1/4",
                selectedTab === "unmarked" ? "z-10" : "z-0"
              )}
              active={selectedTab === "unmarked"}
              name={"unmarked"}
              select={(t) => {
                if (!filterCollapsed) setSelectedTab(t);
                setFilterCollapsed((p) => !p);
              }}
              size="md"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center w-full gap-1">
                <BotOff
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4"
                />
                Unmarked
              </span>
            </TabAnimated>
            <TabAnimated
              id={"filter-tabs"}
              className={cn(
                "bg-white rounded-full absolute top-1/2",
                selectedTab === "marking" ? "z-10" : "z-0"
              )}
              active={selectedTab === "marking"}
              name={"marking"}
              select={(t) => {
                if (!filterCollapsed) setSelectedTab(t);
                setFilterCollapsed((p) => !p);
              }}
              size="md"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center w-full gap-1">
                <BrainCircuit
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4"
                />
                Marking
              </span>
            </TabAnimated>
            <TabAnimated
              id={"filter-tabs"}
              className={cn(
                "bg-white rounded-full absolute top-3/4",
                selectedTab === "marked" ? "z-10" : "z-0"
              )}
              active={selectedTab === "marked"}
              name={"marked"}
              select={(t) => {
                if (!filterCollapsed) setSelectedTab(t);
                setFilterCollapsed((p) => !p);
              }}
              size="md"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center w-full gap-1">
                <Bot absoluteStrokeWidth strokeWidth={1.5} className="size-4" />
                Marked
              </span>
            </TabAnimated>
          </div>
        </div>
        <div
          ref={sortTabsRef}
          className={cn(
            "h-fit w-28 p-2 bg-white rounded-3xl transition-all duration-300 overflow-hidden",
            sortCollapsed ? "h-12" : "h-36"
          )}
        >
          <div
            className={cn(
              "relative h-0 w-full flex flex-col transition-all duration-300",
              sortCollapsed ? "h-0" : "h-32"
            )}
          >
            <TabAnimated
              id={"sort-tabs"}
              className={cn(
                "bg-white rounded-full absolute top-0",
                sortMode === "date-desc" ? "z-20" : "z-10"
              )}
              active={sortMode === "date-desc"}
              name={"date-desc"}
              select={(t) => {
                if (!sortCollapsed) setSortMode(t);
                setSortCollapsed((p) => !p);
              }}
              size="sm"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center w-full gap-1">
                Date
                <ArrowDown
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4"
                />
              </span>
            </TabAnimated>
            <TabAnimated
              id={"sort-tabs"}
              className={cn(
                "bg-white rounded-full absolute top-1/4",
                sortMode === "date-asc" ? "z-20" : "z-10"
              )}
              active={sortMode === "date-asc"}
              name={"date-asc"}
              select={(t) => {
                if (!sortCollapsed) setSortMode(t);
                setSortCollapsed((p) => !p);
              }}
              size="sm"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center w-full gap-1">
                Date
                <ArrowUp
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4"
                />
              </span>
            </TabAnimated>
            <TabAnimated
              id={"sort-tabs"}
              className={cn(
                "bg-white rounded-full absolute top-1/2",
                sortMode === "score-desc" ? "z-20" : "z-10"
              )}
              active={sortMode === "score-desc"}
              name={"score-desc"}
              select={(t) => {
                if (!sortCollapsed) setSortMode(t);
                setSortCollapsed((p) => !p);
              }}
              size="sm"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center w-full gap-1">
                Score
                <ArrowDown
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4"
                />
              </span>
            </TabAnimated>
            <TabAnimated
              id={"sort-tabs"}
              className={cn(
                "bg-white rounded-full absolute top-3/4",
                sortMode === "score-asc" ? "z-20" : "z-10"
              )}
              active={sortMode === "score-asc"}
              name={"score-asc"}
              select={(t) => {
                if (!sortCollapsed) setSortMode(t);
                setSortCollapsed((p) => !p);
              }}
              size="sm"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center w-full gap-1">
                Score
                <ArrowUp
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4"
                />
              </span>
            </TabAnimated>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "relative w-full flex flex-row justify-center gap-2 transition-all duration-300",
          showFilters ? "h-12 opacity-100 z-10" : "h-0 opacity-0 z-0"
        )}
      >
        <div
          className={cn(
            "w-28 h-12 p-2 bg-white rounded-3xl transition-all duration-300 overflow-hidden"
          )}
        >
          <div
            className={cn(
              "h-32 relative w-full flex flex-row transition-all duration-300"
            )}
          >
            <TabAnimated
              id={"filter-camera-tabs"}
              className={cn("bg-white rounded-full")}
              active={filterCamera === "all"}
              name={"all"}
              select={setFilterCamera}
              size="icon"
              disabled={!showFilters}
            >
              <span className="flex flex-row items-center justify-center">
                All
              </span>
            </TabAnimated>
            <TabAnimated
              id={"filter-camera-tabs"}
              className={cn("bg-white rounded-full")}
              active={filterCamera === "camera"}
              name={"camera"}
              select={setFilterCamera}
              size="icon"
              disabled={!showFilters}
            >
              <Camera
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-5 min-w-5"
              />
            </TabAnimated>
            <TabAnimated
              id={"filter-camera-tabs"}
              className={cn("bg-white rounded-full")}
              active={filterCamera === "written"}
              name={"written"}
              select={setFilterCamera}
              size="icon"
              disabled={!showFilters}
            >
              <Pencil
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-5 min-w-5"
              />
            </TabAnimated>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "z-10 relative flex-col justify-center py-6 text-lg",
          selectedCard !== "0" && "z-30"
        )}
      >
        {reviewCards.sort(sortFn).map((card) => {
          const markingFilter =
            selectedTab === "all" ||
            (selectedTab === "marking" && card.marked === "marking") ||
            (selectedTab === "unmarked" && card.marked === "unmarked") ||
            (selectedTab === "marked" && card.marked === "marked");
          const cameraFilter =
            filterCamera === "all" ||
            (filterCamera === "camera" && card.fromCamera) ||
            (filterCamera === "written" && !card.fromCamera);
          const visible = !showFilters || (markingFilter && cameraFilter);
          return (
            <div
              key={`reviewcard-${card.id}`}
              className={cn(
                "h-0 transition-all duration-700",
                visible && "h-24",
                !visible && "-translate-x-full opacity-0 pointer-events-none"
              )}
              aria-disabled={!visible}
            >
              <ReviewCard
                colour={card.colour}
                opts={card}
                trigger={setSelectedCard}
                selected={selectedCard === card.id}
                disabled={!visible}
                aria-disabled={!visible}
                className="z-50"
                // className={cn(visible ? "visible" : "invisible duration-0")}
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
        <Image
          src="/brutalist-elements/SVG/Frame-132.svg"
          alt={"Shape 57"}
          width={64}
          height={64}
          className="text-nborange fill-nborange"
        />
      </div>
      <Button
        className="p-4 border-2 bg-nborange rounded-2xl text-black flex flex-row gap-4 w-full"
        onClick={() => {}}
      >
        <div className="bg-nborange size-12 min-w-12 rounded-md flex flex-row justify-center items-center">
          <Camera absoluteStrokeWidth strokeWidth={1} className="size-12" />
        </div>
        <h2 className="text-lg">Take a photo</h2>
      </Button>
      <div className="flex flex-row justify-center w-full">
        <span className="text-lg">OR</span>
      </div>
      <Button
        className="p-4 border-2 bg-nbyellow rounded-2xl text-black flex flex-row gap-4 w-full"
        onClick={() => {}}
      >
        <div className="bg-nbyellow size-12 min-w-12 rounded-md flex flex-row justify-center items-center">
          <Pencil absoluteStrokeWidth strokeWidth={1} className="size-12" />
        </div>
        <h2 className="text-lg">Type in</h2>
      </Button>
      <Image
        src="/brutalist-elements/SVG/Frame-241.svg"
        alt={"Shape 57"}
        width={96}
        height={96}
        className="text-nborange fill-nborange rotate-90 mt-16"
      />
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center gap-4">
      <div className="flex flex-row justify-between items-center p-4 w-full">
        <h1 className="text-2xl mr-auto">Your Profile</h1>
        <Image
          src="/brutalist-elements/SVG/Frame-79.svg"
          alt={"Shape 57"}
          width={64}
          height={64}
          className="text-nborange fill-nborange"
        />
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
      <div className="fixed bottom-0 h-10 z-40 bg-nbbgblue left-0 right-0" />
      <Nav selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </main>
  );
}
