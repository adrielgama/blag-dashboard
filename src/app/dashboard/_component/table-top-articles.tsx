import React from 'react'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreVertical } from 'lucide-react'

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

export default function TableTopArticles({
  articles,
}: {
  articles: IArticle[] | undefined
}) {
  const sortedArticles = articles?.sort((a, b) => b.views - a.views)
  return (
    <div className="mt-4">
      <Card className="border-none dark:bg-zinc-900">
        <CardHeader>
          <CardTitle>Top Artigos</CardTitle>
          <CardDescription>Os 10 artigos mais acessados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data da publicação</TableHead>
                <TableHead>Visualizações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArticles?.map((article) => (
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
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-500"
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
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Deletar</DropdownMenuItem>
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
