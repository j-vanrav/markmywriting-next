"use client";

import { useIntervalEffect } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const wrap_index = (v: number, max: number) => (v >= max ? 0 : v);

export default function Decoration({
  frames,
  id,
}: {
  frames: [string, ...string[]];
  id: string;
}) {
  const fs = [...new Set([...frames])];
  const [pressed, setPressed] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const animate = () =>
    Math.floor(Math.random() * 2)
      ? setRotate((r) => !r)
      : setCurrentFrame((p) => wrap_index(p + 1, fs.length));

  useIntervalEffect(animate, 20000);

  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchCancel={() => setPressed(false)}
      onTouchMove={() => setPressed(false)}
      onClick={animate}
      className="relative w-16 min-w-16 h-16 min-h-16"
    >
      {fs.map((f, i) => (
        <Image
          key={`decoration-${id}-frame-${f}`}
          src={`/brutalist-elements/SVG/Frame-${f}.svg`}
          alt={`Shape ${f}`}
          width={64}
          height={64}
          className={cn(
            "absolute top-0 left-0 text-nborange fill-nborange duration-1000",
            pressed && "scale-50 duration-150",
            rotate ? "rotate-90" : "-rotate-90",
            wrap_index(currentFrame + 1, fs.length) === i
              ? "-translate-y-2"
              : "translate-y-2",
            currentFrame === i
              ? "opacity-100 translate-y-0 z-10"
              : "opacity-0 z-0"
          )}
        />
      ))}
    </button>
  );
}
