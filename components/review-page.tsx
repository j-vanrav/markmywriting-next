"use client";
import Button from "@/components/neobrutalist/button";
import { cn, makeid } from "@/lib/utils";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bot,
  BotOff,
  BrainCircuit,
  Camera,
  Pencil,
  ListFilter,
  Slash,
  Squircle,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HapticsClick } from "@/lib/client-utils";
import { useOnClickOutside } from "@/lib/hooks";
import Decoration from "@/components/neobrutalist/decoration";
import TapButton from "./tap-button";

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
          "w-full bg-nbyellow h-32 flex flex-col justify-between items-start pb-6 px-4",
          opts.marked === "unmarked" && "bg-nbyellow",
          opts.marked === "unmarked" && opts.fromCamera && "bg-nborange",
          opts.marked === "marking" && "bg-nbblue",
          opts.marked === "marked" && "bg-nbpurple"
        )}
      >
        <div className="flex flex-row justify-between w-full items-start">
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
        <div className="flex flex-row justify-between w-full items-end gap-1 text-sm mb-4">
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
              <span className="absolute top-1.5 left-1.5 text-xs">
                {opts.score}
              </span>
              <Slash
                absoluteStrokeWidth
                strokeWidth={1}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <span className="absolute bottom-1.5 right-1.5 text-xs">47</span>
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
  className,
  disabled = false,
}: {
  selectedCard: string;
  setSelectedCard: (id: string) => void;
  className?: string;
  disabled?: boolean;
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
    <motion.div
      className={cn(
        "w-screen h-full p-4 pb-14 overflow-y-scroll overflow-x-hidden",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-row justify-between items-center p-4 gap-4">
        <div className="relative mr-auto">
          <h1 className="relative left-0 top-0 text-2xl mr-auto z-10">
            Your writing
          </h1>
          {/* <svg
            width="512"
            height="512"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0 -z-10 fill-current text-nbgreen -translate-y-1/2 -translate-x-1/2 opacity-20"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M115 160H85V136.213L68.1802 153.033L46.967 131.82L63.7869 115H40V85H61.8069L45.8283 70.1602L66.2437 48.1781L85 65.5977V40H115V63.7869L131.82 46.967L153.033 68.1802L136.213 85H160V115H138.193L154.172 129.84L133.756 151.822L115 134.402V160Z"
            />
          </svg> */}
        </div>

        <TapButton
          onClick={() => setShowFilters((p) => !p)}
          className="rounded-full bg-white size-12 flex flex-row items-center justify-center"
          disabled={disabled}
        >
          <ListFilter className="size-7 min-w-7" />
        </TapButton>
        <Decoration frames={["90", "29", "78", "83"]} id={makeid(4)} />
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
              disabled={!showFilters || disabled}
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
                visible && "h-32",
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
    </motion.div>
  );
}

export default function ReviewPage({
  className,
  disabled = false,
}: {
  className?: string;
  disabled?: boolean;
}) {
  const [selectedCard, setSelectedCard] = useState("0");
  const [cardPage, setCardPage] = useState("0");
  useEffect(() => {
    setTimeout(() => setCardPage(selectedCard), 400);
  }, [selectedCard]);
  return cardPage !== "0" ? (
    <motion.div
      key="review-page"
      className={cn(
        "w-screen h-full p-4 pb-14 overflow-y-scroll overflow-x-hidden",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-row items-center gap-4">
        <TapButton
          className="size-12 rounded-full p-0 flex flex-row items-center justify-center bg-white"
          onClick={() => setSelectedCard("0")}
          disabled={disabled}
        >
          <ArrowLeft className="size-7 min-w-7 min-h-7" />
        </TapButton>
        <div className="relative mr-auto">
          <h1 className="relative left-0 top-0 text-2xl mr-auto z-10">
            Reviewing: {cardPage}
          </h1>
        </div>
      </div>
    </motion.div>
  ) : (
    <SelectCardPage
      selectedCard={selectedCard}
      setSelectedCard={setSelectedCard}
      className={className as any}
      disabled={disabled}
    />
  );
}
