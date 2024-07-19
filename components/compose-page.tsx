"use client";
import Button from "@/components/neobrutalist/button";
import { cn, getBase64Image, makeid, swapWithNext } from "@/lib/utils";
import { ArrowDown, ArrowUp, Camera, Pencil, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { motion, Reorder, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "@/lib/hooks";
import Image from "next/image";
import Decoration from "@/components/neobrutalist/decoration";
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
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/jpeg;base64,${image.base64}`}
        alt={"User uploaded image"}
      />
      <Button
        className="absolute -top-2 -right-2 rounded-2xl p-2 bg-white"
        onClick={() =>
          setImages((p) => p.filter((im) => im.hash !== image.hash))
        }
      >
        <X strokeWidth={1} className="size-12" />
      </Button>
      <div className="absolute -bottom-2 -right-2 rounded-2xl flex flex-col">
        {index !== 0 && (
          <Button
            className={cn(
              "rounded-2xl p-2 bg-white",
              index !== images.length - 1 && "rounded-b-none"
            )}
            onClick={() => setImages((p) => swapWithNext(p, index - 1))}
          >
            <ArrowUp strokeWidth={1} className="size-12" />
          </Button>
        )}
        {index !== images.length - 1 && (
          <Button
            className={cn(
              "rounded-2xl p-2 bg-white z-30",
              index !== 0 && "rounded-t-none"
            )}
            onClick={() => setImages((p) => swapWithNext(p, index))}
          >
            <ArrowDown strokeWidth={1} className="size-12" />
          </Button>
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
    <>
      <Reorder.Group
        axis="y"
        values={images}
        onReorder={(v) => setImages(() => v)}
      >
        {images.map((i, idx) => {
          return (
            <ImageItem
              key={`photo-${i.hash}`}
              image={i}
              index={idx}
              images={images}
              setImages={setImages}
            />
          );
        })}
      </Reorder.Group>

      <Button
        className="bg-white rounded-2xl flex flex-row gap-2 items-center justify-center p-2"
        onClick={async () => {
          const image = await getBase64Image();
          if (image?.base64) setImages((p) => [...p, image]);
        }}
      >
        <Plus strokeWidth={1} className="size-12" />
        <Camera strokeWidth={1} className="size-12" />
      </Button>
    </>
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
      {images.length === 0 ? (
        <>
          <div className="flex flex-col  rounded-full p-4 gap-4 mb-16">
            <TapButton className="rounded-full bg-black text-white size-40 flex flex-col items-center justify-center">
              <Camera absoluteStrokeWidth strokeWidth={1} className="size-16" />
              <span className="font-extrabold">Take photo</span>
            </TapButton>
            <TapButton className="rounded-full bg-white size-40 flex flex-col items-center justify-center">
              <Pencil absoluteStrokeWidth strokeWidth={1} className="size-16" />
              <span className="font-extrabold">Type in</span>
            </TapButton>
          </div>
        </>
      ) : (
        <ImageCompose images={images} setImages={setImages} />
      )}
    </motion.div>
  );
}
