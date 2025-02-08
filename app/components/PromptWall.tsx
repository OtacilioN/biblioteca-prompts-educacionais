"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

interface Prompt {
  id: string
  title: string
  content: string
  author: string
  categories: string[]
}

interface PromptWallProps {
  initialPrompts: Prompt[]
}

export default function PromptWall({ initialPrompts }: PromptWallProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  useEffect(() => {
    const allCategories = Array.from(new Set(prompts.flatMap((p) => p.categories)))
    setCategories(allCategories)
  }, [prompts])

  const filteredPrompts = selectedCategory ? prompts.filter((p) => p.categories.includes(selectedCategory)) : prompts

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="category-filter" className="block mb-2 font-semibold">
          Filtrar por categoria:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 p-2 border rounded"
        >
          <option value="">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}

