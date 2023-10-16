import { useNavigate } from 'react-router-dom'

import IdeaImage from '@/assets/idea_icon.svg'

import { Button } from '../ui/button'

interface IWelcomeProps {
  name: string | undefined
}

export const Welcome: React.FC<IWelcomeProps> = ({ name }) => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center p-10 bg-white rounded-md">
      <div className="flex flex-col gap-8 mr-10">
        <h1 className="text-3xl font-semibold">Olá, {name}</h1>
        <p>
          Bem-vindo(a) de volta ao seu espaço criativo! 🎉 Estamos animados para
          ver as maravilhas que você vai compartilhar com o mundo hoje.
        </p>
        <Button
          className="max-w-xs"
          onClick={() => navigate('/dashboard/new-post')}
        >
          Escrever um novo artigo
        </Button>
      </div>
      <img src={IdeaImage} alt="Idea" className="w-1/4" />
    </div>
  )
}
