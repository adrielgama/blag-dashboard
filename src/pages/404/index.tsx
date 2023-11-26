import React from 'react'

import { Frown, ServerCrash } from 'lucide-react'

import { useAuthContext } from '@/context/AuthContext'

export const NotFound404 = () => {
  const { onLogout } = useAuthContext()

  const [countDown, setCountDown] = React.useState(5)

  React.useEffect(() => {
    setTimeout(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1)
      } else {
        onLogout()
      }
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <ServerCrash size={80} />
        <h1 className="text-3xl font-bold my-8">404: Página Não Encontrada</h1>
        <div className="flex gap-4 mb-2">
          <p>Desculpe, a página que você está procurando não existe.</p>
          <Frown />
        </div>
        <p>Você será redirecionado para a página de login.</p>
        <p>{countDown}</p>
      </div>
    </div>
  )
}
