"use client";
import { cn, getBase64Image, swapWithNext } from "@/lib/utils";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Camera,
  CheckCheck,
  CircleHelp,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useMotionValue,
} from "framer-motion";
import { useRaisedShadow } from "@/lib/hooks";
import TapButton from "./tap-button";
import { cloneDeep } from "lodash";

function ImageItem({
  image,
  index,
  images,
  setImages,
}: {
  image: LocalImage;
  index: number;
  images: LocalImage[];
  setImages: (i: (prev: LocalImage[]) => LocalImage[]) => void;
}) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  return (
    <Reorder.Item
      className="relative w-fit"
      value={image}
      style={{ boxShadow, y }}
      dragListener={false}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/jpeg;base64,${image.base64}`}
        alt={"User uploaded image"}
        className="pointer-events-none"
      />
      <TapButton
        className="absolute -top-0 -right-5 rounded-full p-1 bg-nbblue"
        onClick={() =>
          setImages((p) => cloneDeep(p.filter((im) => im.hash !== image.hash)))
        }
      >
        <X strokeWidth={1} className="size-8" />
      </TapButton>
      <div className="absolute -bottom-0 -right-5 flex flex-col">
        {index !== 0 && (
          <TapButton
            className={cn(
              "rounded-full p-1 bg-nbblue",
              index !== images.length - 1 && "rounded-b-none"
            )}
            onClick={() => setImages((p) => swapWithNext(p, index - 1))}
          >
            <ArrowUp strokeWidth={1} className="size-8" />
          </TapButton>
        )}
        {index !== images.length - 1 && (
          <TapButton
            className={cn(
              "rounded-full p-1 bg-nbblue z-30",
              index !== 0 && "rounded-t-none"
            )}
            onClick={() => setImages((p) => swapWithNext(p, index))}
          >
            <ArrowDown strokeWidth={1} className="size-8" />
          </TapButton>
        )}
      </div>
    </Reorder.Item>
  );
}

function ImageCompose({
  images,
  setImages,
}: {
  images: LocalImage[];
  setImages: (i: (prev: LocalImage[]) => LocalImage[]) => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center py-4 px-8 pb-28 gap-4 overflow-y-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-row justify-start w-full">
        <TapButton
          className="bg-white text-black rounded-full flex flex-row gap-2 items-center justify-center p-2"
          onClick={() => setImages(() => [])}
        >
          <ArrowLeft strokeWidth={1} className="size-8" />
        </TapButton>
      </div>
      <AnimatePresence>
        <Reorder.Group
          axis="y"
          values={images}
          onReorder={(v) => setImages(() => cloneDeep(v))}
          className="flex flex-col gap-4"
        >
          {images.map((i, idx) => {
            return (
              <motion.div
                key={`photo-${i.hash}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ImageItem
                  image={i}
                  index={idx}
                  images={images}
                  setImages={setImages}
                />
              </motion.div>
            );
          })}
        </Reorder.Group>
      </AnimatePresence>

      <div className="flex flex-row gap-6">
        <TapButton
          className="bg-white text-black rounded-full flex flex-row gap-2 items-center justify-center p-2 px-6"
          onClick={async () => {
            const image = await getBase64Image();
            if (image?.base64)
              setImages((p) =>
                !!p.find((li) => li.hash === image.hash)
                  ? p
                  : [...cloneDeep(p), image]
              );
          }}
        >
          <Camera strokeWidth={1} className="size-12" />
          <Plus strokeWidth={1} className="size-12" />
        </TapButton>
        <TapButton
          onClick={async () => {
            if (images.length < 10) {
              const result = await fetch("/api/hello");
              console.log(await result.text());
            }
          }}
          className="bg-white text-black rounded-full flex flex-row gap-2 items-center justify-center p-2 px-6"
        >
          <CheckCheck strokeWidth={1} className="size-12" />
        </TapButton>
      </div>
    </motion.div>
  );
}

export default function ComposePage({
  className,
  disabled = false,
  setMiniatureNav,
}: {
  className?: string;
  disabled?: boolean;
  setMiniatureNav: (_: boolean) => void;
}) {
  const [showHelp, setShowHelp] = useState(false);
  const [images, setImages] = useState([] as LocalImage[]);
  useEffect(() => {
    setMiniatureNav(images.length > 0 || showHelp);
  }, [images, showHelp, setMiniatureNav]);
  return (
    <motion.div
      key="compose-page"
      className={cn(
        "w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="absolute h-full w-full p-4 gap-4 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-row justify-start w-full">
              <TapButton
                className="bg-white text-black rounded-full flex flex-row gap-2 items-center justify-center p-2"
                onClick={() => setShowHelp(false)}
              >
                <ArrowLeft strokeWidth={1} className="size-8" />
              </TapButton>
            </div>
            Help page
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showHelp && images.length === 0 && (
          <motion.div
            className="absolute -translate-y-52"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TapButton
              className="rounded-full bg-white font-bold text-2xl size-12 min-w-12 min-h-12 flex flex-row items-center justify-center"
              disabled={disabled}
              onClick={() => setShowHelp((p) => !p)}
            >
              ?
              {/* <CircleHelp strokeWidth={1.5} className="size-7 min-w-7" /> */}
            </TapButton>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showHelp && images.length === 0 && (
          <motion.div
            className="absolute rounded-full p-4 pt-8 gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* <div className="absolute size-60 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-brd rounded-full" /> */}
            {/* <div className="absolute size-28 left-[250%] top-[250%] -translate-x-1/2 -translate-y-1/2 bg-brd rounded-full" /> */}
            <div className="z-20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <TapButton
                className="rounded-full bg-black text-white size-56 flex flex-col items-center justify-center"
                onClick={async () => {
                  const image = await getBase64Image();
                  if (image?.base64)
                    setImages((p) =>
                      !!p.find((li) => li.hash === image.hash)
                        ? p
                        : [...cloneDeep(p), image]
                    );
                }}
              >
                <Camera
                  absoluteStrokeWidth
                  strokeWidth={1}
                  className="size-16"
                />
                <span className="font-extrabold">Take photo</span>
              </TapButton>
            </div>

            <div className="absolute z-30 left-[250%] top-[250%] -translate-x-1/2 -translate-y-1/2">
              <TapButton className="rounded-full bg-gray-900 text-white size-24 flex flex-col items-center justify-center gap-[2px]">
                <Pencil
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  className="size-8"
                />
                <span className="font-extrabold text-sm">Type in</span>
              </TapButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showHelp && images.length !== 0 && (
          <ImageCompose images={images} setImages={setImages} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
