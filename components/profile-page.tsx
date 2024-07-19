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
