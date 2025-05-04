import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs";
import type { JokesData } from "../types";

const JOKES_FILE = "src/data/jokes.json";

export const getJokes = createServerFn({ method: "GET" }).handler(async () => {
   const jokes = await fs.promises.readFile(JOKES_FILE, "utf-8");
  return JSON.parse(jokes) as JokesData;
});