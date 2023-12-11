"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-#fff7ed">
      <div className="flex flex-col items-center w-5/12">
        <h1 className="text-7xl">
          Play<span className="text-5xl text-orange-500">.</span>chat
        </h1>
        <h1 className="text-3xl text-center pt-4">
          Troque risadas, compartilhe histórias, faça novos amigos: bem-vindo ao
          nosso espaço de chat.
        </h1>

        <div className="flex justify-center mt-5 space-x-4">
          <Button whiteSchema onClick={() => router.push("/signup")}>
            CADASTRAR
          </Button>
          <Button onClick={() => router.push("/signin")}>ENTRAR</Button>
        </div>
      </div>
    </main>
  );
}
