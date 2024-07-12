"use client";

import { ClassValue } from "clsx";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { HapticsClick } from "@/lib/client-utils";

type Props = {
  className?: ClassValue;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default function Button({
  className,
  children,
  onClick,
  disabled,
}: Props) {
  const [clicked, setClicked] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      className={cn(
        "flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all",
        className,
        active &&
          !clicked &&
          "translate-x-boxShadowXHalf translate-y-boxShadowYHalf shadow-lightHalf dark:shadow-darkHalf",
        clicked &&
          "translate-x-boxShadowX translate-y-boxShadowY shadow-none dark:shadow-none"
      )}
      onPointerDown={() => setActive(true)}
      onPointerUp={() => setActive(false)}
      onPointerLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchCancel={() => setActive(true)}
      onTouchMove={() => setActive(false)}
      onClick={(e) => {
        onClick(e);
        setClicked(true);
        HapticsClick();
        setTimeout(() => setClicked(false), 400);
      }}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
