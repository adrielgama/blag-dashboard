import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 dark:bg-zinc-50 dark:text-zinc-800">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Não encontrado</h2>
        <p className="text-sm">O item que você tentou acessar não existe</p>
      </div>
      <Image
        src="/not_found.svg"
        width={400}
        height={400}
        alt="Not Found image"
        priority
      />
      <Button variant="link" className="dark:text-zinc-800">
        <Link href="/">Voltar para o início</Link>
      </Button>
    </div>
  )
}
