import { getJokes } from "../serverActions/jokesActions";
import { createFileRoute } from "@tanstack/react-router";
import { JokeForm } from "@/components/JokeForm";
import { Joke } from "../types";

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
      <div className="space-y-4">
        {jokes?.map((joke: Joke) => (
          <div key={joke?.id} className="rounded-md border border-transparent ">
            <p className="font-semibold">
              <span className="font-bold">Question: </span>
              {joke?.question}
            </p>
            <p>
              <span className="font-bold">Answer: </span>
              {joke?.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
