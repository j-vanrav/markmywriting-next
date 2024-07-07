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
