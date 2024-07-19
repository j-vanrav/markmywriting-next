"use client";
import Button from "@/components/neobrutalist/button";
import { cn, getBase64Image, makeid, swapWithNext } from "@/lib/utils";
import { ArrowDown, ArrowUp, Camera, Pencil, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { motion, Reorder, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "@/lib/hooks";
import Image from "next/image";
import Decoration from "@/components/neobrutalist/decoration";

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
          <div className="flex flex-row justify-between items-center p-4 w-full">
            <div className="relative mr-auto">
              <h1 className="relative left-0 top-0 text-2xl mr-auto z-10">
                Compose new writing
              </h1>
              {/* <svg
              width="512"
              height="512"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 top-0 -z-10 fill-current text-nborange -translate-y-1/2 -translate-x-1/2 opacity-20"
            >
              <path d="M100 40L107.199 63.809L122.961 44.5672L120.501 69.3188L142.426 57.5736L130.681 79.4995L155.433 77.039L136.191 92.8012L160 100L136.191 107.199L155.433 122.961L130.681 120.501L142.426 142.426L120.501 130.681L122.961 155.433L107.199 136.191L100 160L92.8012 136.191L77.039 155.433L79.4995 130.681L57.5736 142.426L69.3188 120.501L44.5672 122.961L63.809 107.199L40 100L63.809 92.8012L44.5672 77.039L69.3188 79.4995L57.5736 57.5736L79.4995 69.3188L77.039 44.5672L92.8012 63.809L100 40Z" />
            </svg> */}
            </div>
            <Decoration frames={["132", "32", "54", "71"]} id={makeid(4)} />
          </div>
          <Button
            className="p-4 border-2 bg-white rounded-3xl text-black flex flex-row gap-4 justify-between w-full items-center"
            onClick={async () => {
              const image = await getBase64Image();
              if (image?.base64) setImages((p) => [...p, image]);
            }}
            disabled={disabled}
          >
            <div className="flex flex-row items-center justify-center rounded-xl bg-nborange p-4">
              <Camera
                absoluteStrokeWidth
                strokeWidth={0.5}
                className="size-16"
              />
            </div>

            <h2 className="text-2xl font-light">Take a photo</h2>
            <div />
            {/* <div className="bg-black rounded-full flex flex-row items-center justify-center text-white size-8">
            <ArrowRight />
          </div> */}
          </Button>
          <div className="flex flex-row justify-around items-center w-full p-4">
            <div className="scale-x-150">
              <Image
                src="/brutalist-elements/SVG/Frame-241.svg"
                alt={"Shape 57"}
                width={32}
                height={32}
                className="text-nborange fill-nborange rotate-90 scale-y-150 opacity-20"
              />
            </div>

            <span className="text-lg font-bold">OR</span>
            <div className="scale-x-150">
              <Image
                src="/brutalist-elements/SVG/Frame-241.svg"
                alt={"Shape 57"}
                width={32}
                height={32}
                className="text-nborange fill-nborange rotate-90 scale-y-150 opacity-20"
              />
            </div>
          </div>
          <Button
            className="p-4 border-2 bg-white rounded-3xl text-black flex flex-row gap-4 justify-between w-full items-center"
            onClick={() => {}}
            disabled={disabled}
          >
            <div className="flex flex-row items-center justify-center rounded-xl bg-nbyellow p-4">
              <Pencil
                absoluteStrokeWidth
                strokeWidth={0.5}
                className="size-16"
              />
            </div>
            <h2 className="text-2xl font-light">Type it in</h2>
            <div />
            {/* <div className="bg-black rounded-full flex flex-row items-center justify-center text-white size-8">
            <ArrowRight />
          </div> */}
          </Button>
        </>
      ) : (
        <ImageCompose images={images} setImages={setImages} />
      )}
    </motion.div>
  );
}
