import React from 'react'

import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

interface HeaderProps {
  onClick?: () => void
}

export default function Header({ onClick }: HeaderProps) {
  return (
    <div className="flex items-center gap-2 py-4">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onClick}>
              <ChevronLeft className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voltar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <h1 className="text-2xl font-bold text-zinc-600 dark:text-zinc-200">
        Edite o seu artigo
      </h1>
    </div>
  )
}
