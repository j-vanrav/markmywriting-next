"use client";

import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

export const RPCClient = hc<AppType>("http://192.168.86.32:3000/");
