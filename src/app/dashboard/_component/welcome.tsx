import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Welcome({ hasArticles }: { hasArticles: boolean }) {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <Card className="mr-10 flex w-full flex-col gap-8 border-none dark:bg-zinc-900 md:flex-row">
      <CardHeader className="flex flex-col justify-evenly space-y-4 text-3xl font-semibold">
        <CardTitle>Olá, {session?.user?.name ?? '{name}'}</CardTitle>
        <CardDescription>
          Bem-vindo(a) ao seu espaço criativo! 🎉 Estamos animados para ver as
          maravilhas que você vai compartilhar com o mundo hoje.
        </CardDescription>
        <Button
          className="max-w-xs"
          onClick={() => router.push('/new-article')}
        >
          {hasArticles
            ? 'Escrever um novo artigo'
            : 'Crie o seu primeiro artigo'}
        </Button>
      </CardHeader>
      <Image
        src="/idea_icon.svg"
        alt="Welcome"
        width={300}
        height={300}
        className="hidden h-auto lg:size-72 xl:block"
        priority
      />
    </Card>
  )
}
