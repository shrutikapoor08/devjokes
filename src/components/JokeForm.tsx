// src/components/JokeForm.tsx
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { addJoke } from "../serverActions/jokesActions";

export function JokeForm() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!question || !answer) {
      setError("Both question and answer are required");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      await addJoke({
        data: { question, answer },
      });

      // Clear form
      setQuestion("");
      setAnswer("");

      // Refresh data
      router.invalidate();
    } catch (error) {
      console.error("Failed to add joke:", error);
      setError("Failed to add joke. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          id="question"
          type="text"
          placeholder="Enter joke question"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <input
          id="answer"
          type="text"
          placeholder="Enter joke answer"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1 py-4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded disabled:opacity-50 px-4"
        >
          {isSubmitting ? "Adding..." : "Add Joke"}
        </button>
      </div>
    </form>
  );
}
