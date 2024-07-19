"use client";
import { cn, getBase64Image, swapWithNext } from "@/lib/utils";
import { ArrowDown, ArrowUp, Camera, Pencil, Plus, X } from "lucide-react";
import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useMotionValue,
} from "framer-motion";
import { useRaisedShadow } from "@/lib/hooks";
import TapButton from "./tap-button";

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
        className="absolute -top-0 -right-6 rounded-full p-2 bg-white"
        onClick={() =>
          setImages((p) => p.filter((im) => im.hash !== image.hash))
        }
      >
        <X strokeWidth={1} className="size-8" />
      </TapButton>
      <div className="absolute -bottom-0 -right-6 flex flex-col">
        {index !== 0 && (
          <TapButton
            className={cn(
              "rounded-full p-2 bg-white",
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
              "rounded-full p-2 bg-white z-30",
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
      className="flex flex-col items-center rounded-full p-8 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        <Reorder.Group
          axis="y"
          values={images}
          onReorder={(v) => setImages(() => v)}
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

      <TapButton
        className="bg-black text-white rounded-full flex flex-row gap-2 items-center justify-center p-2 px-4"
        onClick={async () => {
          const image = await getBase64Image();
          if (image?.base64) setImages((p) => [...p, image]);
        }}
      >
        <Plus strokeWidth={1} className="size-12" />
        <Camera strokeWidth={1} className="size-12" />
      </TapButton>
    </motion.div>
  );
}

export default function ComposePage({
  className,
  disabled = false,
}: {
  className?: string;
  disabled?: boolean;
}) {
  const [images, setImages] = useState([] as LocalImage[]);
  return (
    <motion.div
      key="compose-page"
      className={cn(
        "w-full h-full p-4 flex flex-col items-center gap-4 overflow-y-scroll pb-24",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        {images.length === 0 ? (
          <>
            <motion.div
              className="flex flex-col items-center rounded-full p-4 pt-8 gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TapButton
                className="rounded-full bg-black text-white size-56 flex flex-col items-center justify-center"
                onClick={async () => {
                  const image = await getBase64Image();
                  if (image?.base64) setImages((p) => [...p, image]);
                }}
              >
                <Camera
                  absoluteStrokeWidth
                  strokeWidth={1}
                  className="size-16"
                />
                <span className="font-extrabold">Take photo</span>
              </TapButton>
              <TapButton className="rounded-full bg-white size-40 flex flex-col items-center justify-center">
                <Pencil
                  absoluteStrokeWidth
                  strokeWidth={1}
                  className="size-16"
                />
                <span className="font-extrabold">Type in</span>
              </TapButton>
            </motion.div>
          </>
        ) : (
          <ImageCompose images={images} setImages={setImages} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
