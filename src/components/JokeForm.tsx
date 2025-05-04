import { useState, useEffect } from "react";
import { addJoke } from "../serverActions/jokesActions";
import { useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export function JokeForm() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!question || !answer || isSubmitting) return;
    console.log("jamd;e kple");
    try {
      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col md:flex-row gap-3">
      <input
        type="text"
        name="question"
        placeholder="Question"
        className="p-1 border rounded flex-1"
        required
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
      />
      <input
        type="text"
        name="answer"
        placeholder="Answer"
        className="p-1 border rounded  flex-1"
        required
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded md:w-auto"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add
      </button>
    </form>
  );
}
