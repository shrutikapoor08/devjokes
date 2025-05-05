// src/components/JokesList.tsx
import type { Joke } from "../types/index.js";

interface JokesListProps {
  jokes: Joke[];
}

export function JokesList({ jokes }: JokesListProps) {
  if (!jokes || jokes.length === 0) {
    return <p className="text-gray-500 italic">No jokes found. Add some!</p>;
  }

  return (
    <div className="space-y-4">
      {jokes.map((joke) => (
        <div
          key={joke.id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <p className="font-bold text-lg mb-2">{joke.question}</p>
          <p className="text-gray-700">{joke.answer}</p>
        </div>
      ))}
    </div>
  );
}
