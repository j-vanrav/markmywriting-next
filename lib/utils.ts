import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
