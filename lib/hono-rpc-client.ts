"use client";

import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

export const RPCClient = hc<AppType>("http://localhost:3000/");
