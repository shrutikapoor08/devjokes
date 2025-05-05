import { getJokes } from "../serverActions/jokesActions.js";
import { createFileRoute } from "@tanstack/react-router";
import { JokeForm } from "../components/JokeForm.js";
import type { Joke } from "../types/index.js";
import { JokesList } from "../components/JokesList.js";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => await getJokes(),
});

function App() {
  const jokes = Route.useLoaderData() || [];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-10">DevJokes</h1>

      <JokeForm />
      <JokesList jokes={jokes} />
    </div>
  );
}
