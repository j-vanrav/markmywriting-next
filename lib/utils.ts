import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Camera, CameraResultType } from "@capacitor/camera";
import { cloneDeep } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const log = {
  log: (msg: string) => console.log(new Date().toISOString() + ":" + msg),
  trace: (msg: string) => console.trace(new Date().toISOString() + ":" + msg),
  info: (msg: string) => console.info(new Date().toISOString() + ":" + msg),
  warn: (msg: string) => console.warn(new Date().toISOString() + ":" + msg),
  error: (msg: string) => console.error(new Date().toISOString() + ":" + msg),
};

export function objectMap<K extends string, V, R>(
  object: Partial<Record<K, V>>,
  map: (s: V) => R
): Partial<Record<K, R>> {
  const newObject = {} as Record<K, R>;
  const entries = Object.entries(object) as Array<[K, V]>;
  entries.forEach(([k, v]) => {
    newObject[k] = map(v);
  });
  return newObject;
}

export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function not_undefined<T>(v?: T | undefined): v is T {
  return v !== undefined;
}

export const imageHash = async (image: string) => {
  const buf = await window.crypto.subtle.digest(
    "SHA-1",
    Buffer.from(image, "base64")
  );
  return new TextDecoder().decode(buf);
};

export const getBase64Image = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    if (not_undefined(image.base64String)) {
      const hash = await imageHash(image.base64String);
      console.log("new_image:" + hash);
      return { base64: image.base64String, hash };
    }
    return undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export function swapWithNext<T>(arr: T[], index: number): T[] {
  if (index < 0 || index >= arr.length - 1) {
    console.error("Index out of bounds or no next element to swap with.");
    return arr;
  }
  const newArr = cloneDeep(arr);
  const temp = newArr[index];
  newArr[index] = newArr[index + 1];
  newArr[index + 1] = temp;
  return newArr;
}
