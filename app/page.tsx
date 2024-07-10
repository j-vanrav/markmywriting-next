"use client";

import Button from "@/components/neobrutalist/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Bot,
  BotOff,
  Camera,
  Feather,
  ListFilter,
  LoaderCircle,
  NotebookPen,
  SquareChevronRight,
  User,
} from "lucide-react";
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
    <nav className="absolute bottom-0 w-full p-2 flex flex-row justify-center">
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
  fromCamera?: boolean;
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
        pressed && "scale-90 translate-x-6",
        selected && "translate-x-96",
        className
      )}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchCancel={() => setPressed(false)}
      onTouchMove={() => setPressed(false)}
      onClick={() => trigger(opts.id)}
    >
      <div
        className={cn(
          "w-full h-4 rounded-t-2xl -translate-y-4 absolute left-0 right-0",
          colour === "yellow" && "bg-nbyellow",
          colour === "orange" && "bg-nborange",
          colour === "purple" && "bg-nbpurple",
          colour === "green" && "bg-nbgreen",
          colour === "blue" && "bg-nbblue"
        )}
      />
      <div
        className={cn(
          "w-full bg-nbyellow h-24 flex flex-col items-start gap-3 pb-4 px-4",
          colour === "yellow" && "bg-nbyellow",
          colour === "orange" && "bg-nborange",
          colour === "purple" && "bg-nbpurple",
          colour === "green" && "bg-nbgreen",
          colour === "blue" && "bg-nbblue"
        )}
      >
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center gap-1 text-xl">
            <SquareChevronRight
              absoluteStrokeWidth
              strokeWidth={1.5}
              className="size-5"
            />{" "}
            The Box
          </div>

          <span className="text-sm">22.10.24</span>
        </div>
        <div className="flex flex-row justify-between w-full items-center gap-1 text-sm">
          {opts.marked === "marked" && (
            <div className="flex flex-row items-center gap-1">
              <Bot absoluteStrokeWidth strokeWidth={1.5} className="size-5" />
              Marked
            </div>
          )}
          {opts.marked === "unmarked" && (
            <div className="flex flex-row items-center gap-1">
              <BotOff
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-5"
              />
              Unmarked
            </div>
          )}
          {opts.marked === "marking" && (
            <div className="flex flex-row items-center gap-1">
              <LoaderCircle
                absoluteStrokeWidth
                strokeWidth={1.5}
                className="size-5 animate-spin"
              />
              Marking...
            </div>
          )}
          <ArrowRight
            absoluteStrokeWidth
            strokeWidth={1.5}
            className="size-7"
          />
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
          colour === "yellow" && "bg-nbyellow",
          colour === "orange" && "bg-nborange",
          colour === "purple" && "bg-nbpurple",
          colour === "green" && "bg-nbgreen",
          colour === "blue" && "bg-nbblue"
        )}
      />
    </button>
  );
}

function ReviewPage() {
  const [selectedCard, setSelectedCard] = useState("0");
  return (
    <div className="w-screen h-full p-4 pb-14 overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-row justify-between items-center p-4">
        <h1 className="text-2xl">Your Writing</h1>
        <ListFilter />
      </div>

      <div className="relative flex-col justify-center py-6 text-lg">
        <ReviewCard
          colour="yellow"
          opts={{
            marked: "unmarked",
            wordCount: 200,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: true,
            id: "1",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "1"}
        />
        <ReviewCard
          colour="orange"
          opts={{
            marked: "marking",
            wordCount: 300,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: false,
            id: "2",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "2"}
        />
        <ReviewCard
          colour="purple"
          opts={{
            marked: "marked",
            wordCount: 450,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: false,
            id: "3",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "3"}
        />
        <ReviewCard
          colour="green"
          opts={{
            marked: "unmarked",
            wordCount: 100,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: true,
            id: "4",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "4"}
        />
        <ReviewCard
          colour="blue"
          opts={{
            marked: "marking",
            wordCount: 600,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: true,
            id: "5",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "5"}
        />
        <ReviewCard
          colour="yellow"
          opts={{
            marked: "unmarked",
            wordCount: 200,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: true,
            id: "6",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "6"}
        />
        <ReviewCard
          colour="orange"
          opts={{
            marked: "marking",
            wordCount: 300,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: false,
            id: "7",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "7"}
        />
        <ReviewCard
          colour="purple"
          opts={{
            marked: "marked",
            wordCount: 450,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: false,
            id: "8",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "8"}
        />
        <ReviewCard
          colour="green"
          opts={{
            marked: "unmarked",
            wordCount: 100,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: true,
            id: "9",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "9"}
        />
        <ReviewCard
          colour="blue"
          opts={{
            marked: "marking",
            wordCount: 600,
            creationDate: new Date(),
            prompt: "The Box",
            fromCamera: true,
            id: "10",
          }}
          trigger={setSelectedCard}
          selected={selectedCard === "10"}
        />
      </div>
    </div>
  );
}

function ComposePage() {
  return (
    <div className="flex flex-col justify-center w-full h-full">
      <Button
        className="m-2 p-4 border-2 bg-white rounded-2xl text-black flex flex-row gap-4"
        onClick={() => {}}
      >
        <div className="bg-nborange size-12 rounded-md flex flex-row justify-center items-center">
          <Camera />
        </div>
        <h2 className="text-lg">Take a photo of your writing</h2>
      </Button>
      <div className="flex flex-row justify-center w-full p-4">
        <span className="text-lg">OR</span>
      </div>
      <Button
        className="m-2 p-4 border-2 bg-white rounded-2xl text-black flex flex-row gap-4"
        onClick={() => {}}
      >
        <div className="bg-nbyellow size-12 rounded-md flex flex-row justify-center items-center">
          <Feather />
        </div>
        <h2 className="text-lg">Type your writing</h2>
      </Button>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="flex flex-col justify-center w-full h-full">profile</div>
  );
}

export default function Main() {
  const [selectedPage, setSelectedPage] = useState("compose" as PageName);

  return (
    <main className="flex flex-col w-screen h-svh bg-nbbgblue text-black overflow-hidden">
      {selectedPage === "review" && <ReviewPage />}
      {selectedPage === "compose" && <ComposePage />}
      {selectedPage === "profile" && <ProfilePage />}
      <div className="h-9" />
      <Nav selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </main>
  );
}
