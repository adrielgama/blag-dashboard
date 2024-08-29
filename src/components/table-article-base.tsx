import React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { Loader2, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { deleteArticle } from '@/app/api/articles'
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
  DropdownMenuTrigger,
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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer'

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
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [articleToDelete, setArticleToDelete] = React.useState<IArticle | null>(
    null
  )
  const [isDeleting, setIsDeleting] = React.useState(false)
  const accessToken = session?.accessToken

  const isPublished = (article: IArticle) => article && article.published
  const sortedArticles = articles?.sort((a, b) => b.views - a.views)
  const showArticles = orderByViews ? sortedArticles?.slice(0, 10) : articles

  if (!accessToken) {
    toast.error('Sessão expirada. Por favor, faça login novamente.')
    router.push('/login')
    return
  }

  const handleEdit = (id: string) => {
    router.push(`/articles/${id}`)
  }

  const handleDeleteClick = (article: IArticle) => {
    setArticleToDelete(article)
    setIsDrawerOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      if (articleToDelete?.id) {
        await deleteArticle(articleToDelete.id, accessToken)

        await queryClient.invalidateQueries({ queryKey: ['articles'] })

        toast.success('Artigo excluído com sucesso!')
        setIsDrawerOpen(false)
      }
    } catch (error) {
      toast.error('Falha ao excluir o artigo!')
    } finally {
      setIsDeleting(false)
    }
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
                      src={
                        article.imageUrl ? article.imageUrl : '/no-image.webp'
                      }
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
                          onClick={() => handleDeleteClick(article)}
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

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto mt-4 w-full max-w-sm">
            <DrawerHeader className="space-y-4">
              <DrawerTitle>Confirmar Exclusão</DrawerTitle>
              <DrawerDescription>
                Tem certeza que deseja excluir o artigo{' '}
                <span className="font-medium italic">
                  &rdquo;
                  {articleToDelete?.title}&rdquo;
                </span>{' '}
                ? Esta ação não pode ser desfeita.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deletando
                  </>
                ) : (
                  'Confirmar'
                )}
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={() => setIsDrawerOpen(false)}
                  disabled={isDeleting}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
