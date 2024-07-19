import Button from "@/components/neobrutalist/button";
import { cn, makeid } from "@/lib/utils";
import { ArrowRight, Calendar, Mail, Ticket } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Decoration from "@/components/neobrutalist/decoration";

export default function ProfilePage({
  className,
  disabled,
}: {
  className?: string;
  disabled?: boolean;
}) {
  return (
    <motion.div
      key="profile-page"
      className={cn(
        "w-full h-full p-4 flex flex-col items-center gap-4",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-row justify-between items-center p-4 w-full">
        <div className="relative mr-auto">
          <h1 className="relative left-0 top-0 text-2xl mr-auto z-10">
            Your profile
          </h1>
          {/* <svg
              width="512"
              height="512"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 top-0 -z-10 fill-current text-nbpurple -translate-y-1/2 -translate-x-1/2 opacity-20"
            >
              <path
                d="M131.281 131.281C149.153 131.281 163.64 116.793 163.64 98.9215L98.9219 98.9216C98.9219 116.793 113.41 131.281 131.281 131.281Z"
                stroke-width="4"
              />
              <path
                d="M68.7201 68.7197C50.8486 68.7197 36.3608 83.2074 36.3608 101.079L101.079 101.079C101.079 83.2075 86.5916 68.7197 68.7201 68.7197Z"
                stroke-width="4"
              />
              <path
                d="M68.72 131.281C68.72 149.152 83.2077 163.64 101.079 163.64L101.079 98.9217C83.2077 98.9217 68.72 113.409 68.72 131.281Z"
                stroke-width="4"
              />
              <path
                d="M131.281 68.7196C131.281 50.8481 116.794 36.3603 98.922 36.3603L98.922 101.079C116.794 101.079 131.281 86.5911 131.281 68.7196Z"
                stroke-width="4"
              />
              <path
                d="M100 144.238C112.637 156.875 133.126 156.875 145.763 144.238L100 98.4749C87.3634 111.112 87.3634 131.601 100 144.238Z"
                stroke-width="4"
              />
              <path
                d="M100.001 55.7628C87.3635 43.1257 66.8748 43.1257 54.2377 55.7628L100.001 101.526C112.638 88.8886 112.638 68.3998 100.001 55.7628Z"
                stroke-width="4"
              />
              <path
                d="M55.763 100C43.126 112.637 43.126 133.126 55.763 145.763L101.526 100C88.8888 87.3634 68.4001 87.3634 55.763 100Z"
                stroke-width="4"
              />
              <path
                d="M144.238 100C156.875 87.363 156.875 66.8743 144.238 54.2372L98.4749 100C111.112 112.637 131.601 112.637 144.238 100Z"
                stroke-width="4"
              />
            </svg> */}
        </div>
        <Decoration frames={["79", "120", "225", "115"]} id={makeid(4)} />
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
        <Button
          onClick={() => {}}
          className="bg-nbgreen rounded-2xl w-full"
          disabled={!!disabled}
          aria-disabled={disabled}
        >
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
    </motion.div>
  );
}
