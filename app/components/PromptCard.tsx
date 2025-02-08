interface Prompt {
  id: string
  title: string
  content: string
  author: {
    name: string
  }
  categories: string[]
}

interface PromptCardProps {
  prompt: Prompt
}

export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-3">{prompt.title}</h3>
      <p className="text-gray-600 mb-4">{prompt.content}</p>
      <p className="text-sm text-gray-500 mb-3">Autor: {prompt.author.name}</p>
      <div className="flex flex-wrap gap-2">
        {prompt.categories.map((category) => (
          <span key={category} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {category}
          </span>
        ))}
      </div>
    </div>
  )
}

