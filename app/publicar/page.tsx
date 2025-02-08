import AddPromptForm from "../components/AddPromptForm"
import Link from "next/link"

export default function PublicarPrompt() {
  return (
    <div className="relative">
      <Link href="/" className="absolute top-4 left-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
        Voltar ao Mural
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Publicar Novo Prompt</h1>
      <AddPromptForm />
    </div>
  )
}

