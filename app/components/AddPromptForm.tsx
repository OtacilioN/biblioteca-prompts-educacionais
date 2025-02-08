"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPrompt } from "../actions";
import { Session } from "next-auth";

export default function AddPromptForm({ session }: { session?: Session }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("You must be logged in to create a prompt");
      return;
    }
    setIsSubmitting(true);

    try {
      await createPrompt({
        title,
        content,
        categories: categories.split(",").map((c) => c.trim()),
        authorId: session.user.id,
      });

      // Limpar o formulário e redirecionar para a página inicial
      setTitle("");
      setContent("");
      setCategories("");
      router.push("/");
      router.refresh(); // Força a atualização dos dados na página inicial
    } catch (error) {
      console.error("Erro ao criar prompt:", error);
      alert("Ocorreu um erro ao criar o prompt. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-semibold">
          Título:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2 font-semibold">
          Conteúdo do Prompt:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
        ></textarea>
      </div>
      <div className="mb-6">
        <label htmlFor="categories" className="block mb-2 font-semibold">
          Categorias (separadas por vírgula):
        </label>
        <input
          type="text"
          id="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publicando..." : "Publicar Prompt"}
        </button>
      </div>
    </form>
  );
}
