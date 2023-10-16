import React, { useState } from 'react'

import { Edit2, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import NotFoundImage from '@/assets/not-found-image.png'
import { useArticleContext } from '@/context/ArticleContext'
import { IArticle } from '@/types'
import { formatDate } from '@/utils/formatDate'
import { formatViews } from '@/utils/formatViews'
import { truncateString } from '@/utils/truncateString'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'

interface ArticleItemProps {
  article: IArticle
  fromDraft?: boolean | false
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article, fromDraft }) => {
  const navigate = useNavigate()
  const { setSelectedArticle, deleteArticle } = useArticleContext()
  const {
    title,
    id,
    published,
    createdAt,
    imageUrl: image,
    author,
    views,
  } = article
  const [isOpen, setIsOpen] = useState(false)

  const handleEditNavigation = (article: IArticle) => {
    setSelectedArticle(article)
    navigate(`/dashboard/edit/${article.id}`, {
      state: {
        from: fromDraft ? '/dashboard/drafts' : '/dashboard/articles',
      },
    })
  }

  const handleDeleteArticle = async () => {
    await deleteArticle(article.id)
  }

  return (
    <div
      key={id}
      className="bg-blue-400 flex flex-row justify-between p-8 rounded-md hover:bg-blue-400/70 mb-2"
    >
      <div className="flex gap-4">
        <img
          src={image || NotFoundImage}
          alt={`Imagem do artigo: ${title}`}
          className="w-20 h-16 rounded-md object-cover border"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-blue-500 font-bold">Título</h1>
          <h1 className="w-52">{truncateString(title, 25)}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-blue-500 font-bold">Autor</p>
        <span>{author?.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-blue-500 font-bold">Criado</p>
        <span>{formatDate(String(createdAt))}</span>
      </div>
      <div className="flex flex-col gap-2  items-center">
        <p className="text-blue-500 font-bold">Views</p>
        {formatViews(views!)}
      </div>
      <div className="flex flex-col gap-2  items-center">
        <p className="text-blue-500 font-bold">Publicado</p>
        {published ? (
          <ThumbsUp className="text-green-500" />
        ) : (
          <ThumbsDown className="text-red-400" />
        )}
      </div>
      <Popover open={isOpen}>
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-blue-500 font-bold">Ações</h1>
          <div className="flex h-5 items-center space-x-4 text-sm transition-all text-gray-600">
            <Edit2
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => handleEditNavigation(article)}
            />
            <Separator orientation="vertical" />
            <PopoverTrigger asChild>
              <Trash2
                className="cursor-pointer hover:text-red-500"
                // onClick={handleDeleteArticle}
                onClick={() => setIsOpen(true)}
              />
            </PopoverTrigger>
          </div>
        </div>
        <PopoverContent className="grid gap-4 place-items-center">
          <p className="text-center text-sm">
            Tem certeza que deseja excluir este artigo?
          </p>
          <div className="flex gap-4">
            <Button
              className="bg-blue-100 hover:bg-blue-300"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteArticle}>
              <Trash2 className="mr-2" size={18} /> Confirmar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ArticleItem
