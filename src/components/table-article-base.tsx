import React from 'react'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IArticle } from '@/types/article'

interface TableArticlesBaseProps {
  title: string
  description: string
  showAuthor?: boolean
  articles: IArticle[] | undefined
  orderByViews?: boolean
}

export default function TableArticlesBase({
  title,
  description,
  showAuthor = false,
  orderByViews = false,
  articles,
}: TableArticlesBaseProps) {
  const router = useRouter()
  const isPublished = (article: IArticle) => article && article.published
  const sortedArticles = articles?.sort((a, b) => b.views - a.views)
  const showArticles = orderByViews ? sortedArticles : articles

  const handleEdit = (id: string) => {
    router.push(`/articles/${id}`)
  }

  const handleDelete = (id: string) => {
    console.log('Delete', id)
  }

  return (
    <div className="mt-4">
      <Card className="border-none dark:bg-zinc-900">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Título</TableHead>
                {showAuthor && <TableHead>Autor</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead>Data da publicação</TableHead>
                <TableHead>Visualizações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {showArticles?.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <img
                      src={article.imageUrl}
                      alt="Article cover image"
                      width={64}
                      height={64}
                      className="size-16 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  {showAuthor && (
                    <TableCell className="font-medium">
                      {article.author.name}
                    </TableCell>
                  )}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        isPublished(article)
                          ? 'bg-green-500/10 text-green-500 dark:bg-green-500/70'
                          : 'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/70'
                      }`}
                    >
                      {article.published ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('pt-BR', {
                      dateStyle: 'medium',
                    }).format(new Date(article.createdAt))}
                  </TableCell>
                  <TableCell>{article.views}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleEdit(article.id)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(article.id)}
                        >
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
