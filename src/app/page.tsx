import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-#fff7ed">
      <div className="flex flex-col items-center w-5/12">
        <h1 className="text-3xl text-center">
          Troque risadas, compartilhe histórias, faça novos amigos: bem-vindo ao
          nosso espaço de chat.
        </h1>
        <div className="flex justify-center mt-5 space-x-4">
          <Button whiteSchema>CADASTRAR</Button>
          <Button>ENTRAR</Button>
        </div>
      </div>
    </main>
  );
}
