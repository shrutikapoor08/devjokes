import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs";
import type { JokesData, Joke } from "../types";
import { v4 as uuidv4 } from "uuid";

const JOKES_FILE = "src/data/jokes.json";

/**
 * Reads jokes from the JSON file
 */
export const getJokes = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const jokes = await fs.promises.readFile(JOKES_FILE, "utf-8");
    return JSON.parse(jokes) as JokesData;
  } catch (error) {
    console.error("Error reading jokes file:", error);
    return [];
  }
}
);

/**
 * Writes jokes to the JSON file
 */
export const addJoke = createServerFn({ method: "POST" })
  .validator((joke: Joke) => joke)
  .handler(async ({ data }) => {
    try {
      // Read the existing jokes from the file
      const jokesData = await getJokes();

      // Create a new joke with a unique ID
      const newJoke: Joke = {
        id: uuidv4(),
        question: data.question,
        answer: data.answer,
      };

      // Add the new joke to the list
      const updatedJokes = [...jokesData, newJoke];

      // Write the updated jokes back to the file
      await fs.promises.writeFile(
        JOKES_FILE,
        JSON.stringify(updatedJokes, null, 2),
        "utf-8"
      );

      return newJoke;
    } catch (error) {
      console.error("Failed to add joke:", error);
      throw new Error("Failed to add joke");
    }
  });
