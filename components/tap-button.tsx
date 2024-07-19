"use client";

import { HapticsClick } from "@/lib/client-utils";
import { HTMLMotionProps, motion } from "framer-motion";

export default function TapButton({
  onClick,
  className,
  children,
  whileHover = { scale: 1.2 },
  whileTap = { scale: 0.9 },
  transition,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & HTMLMotionProps<"button">) {
  return (
    <motion.button
      className={className}
      onClick={(e) => {
        if (onClick) {
          HapticsClick();
          onClick(e);
        }
      }}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        ...transition,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
