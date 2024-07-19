"use client";
import { cn, makeid } from "@/lib/utils";
import {
  ArrowDown,
  ArrowLeft,
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
import React, { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { HapticsClick } from "@/lib/client-utils";
import { useOnClickOutside } from "@/lib/hooks";
import Decoration from "@/components/neobrutalist/decoration";
import TapButton, { tapButtonAttr } from "./tap-button";

type MarkingStatus = "marked" | "marking" | "unmarked";
function ReviewCard({
  className,
  opts,
  trigger,
  ...args
}: {
  className?: string;
  opts: ReviewCard;
  trigger: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <motion.div
      layoutId={`review-card-${opts.id}`}
      key={`review-card-${opts.id}`}
      {...tapButtonAttr}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, damping: 30 }}
    >
      <button
        className={cn("translate-x-0 transition-all w-full z-50", className)}
        onClick={() => {
          HapticsClick();
          trigger(opts.id);
        }}
        {...args}
      >
        <div
          className={cn(
            "w-full bg-white h-16 flex flex-row justify-between items-center rounded-2xl p-4"
          )}
        >
          <div className="flex flex-col justify-between w-full items-start">
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
          <div className="flex flex-row justify-between items-center gap-2 text-sm">
            {opts.marked === "unmarked" && (
              <div className="flex flex-row items-center gap-1 bg-nborange rounded-full px-2">
                <BotOff
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4"
                />
                Unmarked
              </div>
            )}
            {opts.marked === "marking" && (
              <div className="flex flex-row items-center gap-1 bg-nbblue rounded-full px-2">
                <BrainCircuit
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-4 animate-pulse-strong"
                />
                <span className="animate-pulse-strong">Marking...</span>
              </div>
            )}
            {/* {opts.marked === "marked" && (
            <div className="flex flex-row items-center gap-1 rounded-full bg-black text-white p-1">
              <Bot absoluteStrokeWidth strokeWidth={1.5} className="size-6" />
            </div>
          )} */}
            {opts.marked === "marked" && (
              <div
                className={cn(
                  "relative rounded-full size-12 min-w-12 min-h-12",
                  (opts?.score ?? 0) >= 24 ? "bg-nbgreen" : "bg-nbyellow"
                )}
              >
                <span className="absolute top-1.5 left-1.5 text-xs">
                  {opts.score}
                </span>
                <Slash
                  absoluteStrokeWidth
                  strokeWidth={1}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                <span className="absolute bottom-1.5 right-1.5 text-xs">
                  47
                </span>
              </div>
            )}
          </div>
        </div>
      </button>
    </motion.div>
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
    <motion.div
      className={cn(
        "grid h-8 w-32 grid-cols-1 items-center",
        size === "md" && "w-32",
        size === "sm" && "w-24",
        size === "icon" && "w-8",
        className,
        disabled && "pointer-events-none"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
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
    </motion.div>
  );
}

type ReviewCard = {
  marked: MarkingStatus;
  wordCount: number;
  creationDate: Date;
  prompt: string;
  fromCamera: boolean;
  id: string;
  score?: number;
};
const reviewCards: ReviewCard[] = [
  {
    marked: "unmarked",
    wordCount: 200,
    creationDate: new Date("2024-06-05"),
    prompt: "The Box",
    fromCamera: true,
    id: "1",
  },
  {
    marked: "marking",
    wordCount: 300,
    creationDate: new Date("2024-06-04"),
    prompt: "The Box",
    fromCamera: false,
    id: "2",
  },
  {
    marked: "marked",
    wordCount: 450,
    creationDate: new Date("2024-06-02"),
    prompt: "The Box",
    fromCamera: false,
    id: "3",
    score: 10,
  },
  {
    marked: "unmarked",
    wordCount: 100,
    creationDate: new Date("2024-02-01"),
    prompt: "The Box",
    fromCamera: false,
    id: "4",
  },
  {
    marked: "marking",
    wordCount: 600,
    creationDate: new Date("2024-01-01"),
    prompt: "The Box",
    fromCamera: true,
    id: "5",
  },
  {
    marked: "unmarked",
    wordCount: 200,
    creationDate: new Date("2023-06-05"),
    prompt: "The Box",
    fromCamera: false,
    id: "6",
  },
  {
    marked: "marking",
    wordCount: 300,
    creationDate: new Date("2022-06-05"),
    prompt: "The Box",
    fromCamera: false,
    id: "7",
  },
  {
    marked: "marked",
    wordCount: 450,
    creationDate: new Date("2021-02-01"),
    prompt: "The Box",
    fromCamera: false,
    id: "8",
    score: 40,
  },
  {
    marked: "unmarked",
    wordCount: 100,
    creationDate: new Date("2021-02-01"),
    prompt: "The Box",
    fromCamera: true,
    id: "9",
  },
  {
    marked: "marking",
    wordCount: 600,
    creationDate: new Date("2021-01-02"),
    prompt: "The Box",
    fromCamera: true,
    id: "10",
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
    if (sortMode === "score-desc") return (b?.score ?? 0) - (a?.score ?? 0);
    if (sortMode === "score-asc") return (a?.score ?? 0) - (b?.score ?? 0);
    return 0;
  };
  return (
    <motion.div
      className={cn(
        "w-screen h-full p-4 pb-14 overflow-y-scroll overflow-x-hidden flex flex-col gap-4",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-row justify-between items-center gap-4 px-4">
        <TapButton
          onClick={() => setShowFilters((p) => !p)}
          className="rounded-full bg-white size-12 min-w-12 min-h-12 flex flex-row items-center justify-center"
          disabled={disabled}
        >
          <ListFilter className="size-7 min-w-7" />
        </TapButton>
        <Decoration frames={["90", "29", "78", "83"]} id={makeid(4)} />
      </div>
      <AnimatePresence>
        {showFilters && (
          <>
            <div
              className={cn(
                "relative w-full flex flex-row justify-start px-4 gap-2 transition-all duration-300",
                showFilters ? "h-12 opacity-100 z-20" : "h-0 opacity-0 z-0"
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
                      "bg-nborange rounded-full absolute top-1/4",
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
                      "bg-nbblue rounded-full absolute top-1/2",
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
                      "bg-nbgreen rounded-full absolute top-3/4",
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
                      <Bot
                        absoluteStrokeWidth
                        strokeWidth={1.5}
                        className="size-4"
                      />
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
                "relative w-full flex flex-row justify-start px-4 gap-2 transition-all duration-300",
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
          </>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "z-10 flex flex-col justify-center text-lg gap-1 mb-16",
          selectedCard !== "0" && "z-30"
        )}
      >
        <LayoutGroup>
          <AnimatePresence>
            {reviewCards
              .sort(sortFn)
              .filter((c) => c.id !== selectedCard)
              .filter((c) => {
                const markingFilter =
                  selectedTab === "all" ||
                  (selectedTab === "marking" && c.marked === "marking") ||
                  (selectedTab === "unmarked" && c.marked === "unmarked") ||
                  (selectedTab === "marked" && c.marked === "marked");
                const cameraFilter =
                  filterCamera === "all" ||
                  (filterCamera === "camera" && c.fromCamera) ||
                  (filterCamera === "written" && !c.fromCamera);
                const sortFilter =
                  (sortMode !== "score-asc" && sortMode !== "score-desc") ||
                  c.score !== undefined;
                const visible =
                  !showFilters || (markingFilter && cameraFilter && sortFilter);

                return visible;
              })
              .map((card) => {
                return (
                  <ReviewCard
                    key={`k-review-card-${card.id}`}
                    opts={card}
                    trigger={setSelectedCard}
                    className="z-50"
                  />
                );
              })}
          </AnimatePresence>
        </LayoutGroup>
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
  const reviewCard = reviewCards.find((c) => c.id === selectedCard);
  return (
    <motion.div
      key={"review-page"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <LayoutGroup>
        <AnimatePresence>
          {selectedCard === "0" && (
            <SelectCardPage
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              className={className as any}
              disabled={disabled}
            />
          )}

          {reviewCard && (
            <motion.div
              key="review-page"
              className={cn(
                "absolute w-screen h-screen p-4 pb-14 overflow-y-scroll overflow-x-hidden flex flex-col gap-4",
                className
              )}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 0.4 }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.4,
                },
              }}
            >
              <div className="flex flex-row items-center gap-4 px-4">
                <TapButton
                  className="size-12 rounded-full p-0 flex flex-row items-center justify-center bg-white"
                  onClick={() => setSelectedCard("0")}
                  disabled={disabled}
                >
                  <ArrowLeft className="size-7 min-w-7 min-h-7" />
                </TapButton>
              </div>
              <ReviewCard opts={reviewCard} trigger={() => {}} />
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  );
}
