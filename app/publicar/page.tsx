export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import AddPromptForm from "../components/AddPromptForm";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function PublicarPrompt() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/entrar",
        permanent: false,
      },
    };
  }

  return (
    <div className="relative">
      <Link
        href="/"
        className="absolute top-4 left-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
      >
        Voltar ao Mural
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Publicar Novo Prompt
      </h1>
      <AddPromptForm session={session} />
    </div>
  );
}
