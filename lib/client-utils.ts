"use client";

import { Haptics } from "@capacitor/haptics";

export const HapticsSelection = async () => {
  await Haptics.selectionStart();
  await Haptics.selectionChanged();
  await Haptics.selectionEnd();
};

export const HapticsClick = () =>
  Haptics.vibrate({ duration: 1 }).catch(() =>
    console.error("Haptics not available")
  );
