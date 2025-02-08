import Link from "next/link";
import PromptWall from "./components/PromptWall";
import { getPrompts } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const initialPrompts = await getPrompts();
  const session = await getServerSession(authOptions);

  return (
    <div className="relative">
      {session ? (
        <Link
          href="/publicar"
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Publicar Prompt
        </Link>
      ) : (
        <div className="absolute top-4 right-4 space-x-4">
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/cadastro"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Cadastro
          </Link>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">Mural de Prompts Educacionais</h1>
      <PromptWall prompts={initialPrompts} />
    </div>
  );
}
