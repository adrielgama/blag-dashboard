import { lazy, Suspense } from 'react'

import { Controller, UseFormReturn } from 'react-hook-form'

import Spinner from '@/components/spinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { IArticle, IArticleUpdate } from '@/types/article'

const TextareaEditor = lazy(() => import('@/components/tinymce-editor'))

interface ArticleFormProps {
  form: UseFormReturn<IArticleUpdate>
  article?: IArticle
}

export default function ArticleForm({ form, article }: ArticleFormProps) {
  const { formState } = form

  const handleEditorChange = (content: string) => {
    form.setValue('body', content)
  }

  return (
    <Card className="border-none dark:bg-zinc-900">
      <CardHeader>
        <FormItem>
          <FormLabel className="flex items-center justify-between">
            <h1>Título</h1>
            <FormControl>
              <Controller
                name="published"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${
                        field.value
                          ? 'bg-green-500/70 text-green-900'
                          : 'bg-yellow-500/70 text-yellow-900'
                      }`}
                    >
                      {field.value ? 'Publicado' : 'Rascunho'}
                    </Badge>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            </FormControl>
          </FormLabel>
          <FormControl>
            <Input {...form.register('title')} placeholder="Título do artigo" />
          </FormControl>
          <FormMessage>{formState.errors.title?.message}</FormMessage>
        </FormItem>
        <FormItem>
          <FormLabel>Descrição</FormLabel>
          <FormControl>
            <Textarea
              {...form.register('description')}
              placeholder="Descrição do artigo"
            />
          </FormControl>
          <FormMessage>{formState.errors.description?.message}</FormMessage>
        </FormItem>
      </CardHeader>
      <CardContent className="space-y-4">
        <Suspense fallback={<Spinner />}>
          <TextareaEditor value={article?.body} onChange={handleEditorChange} />
        </Suspense>
        <FormItem>
          <FormLabel>URL da Imagem</FormLabel>
          <FormControl>
            <Input {...form.register('imageUrl')} placeholder="URL da imagem" />
          </FormControl>
          <div className="flex gap-4">
            {article?.imageUrl && (
              <div className="flex flex-col items-center">
                <p className="text-xs">Imagem Atual</p>
                <img
                  src={article?.imageUrl}
                  alt="Imagem atual do artigo"
                  className="mt-2 size-32 rounded-lg border border-zinc-200 object-cover p-1 dark:border-zinc-800 lg:size-56"
                />
              </div>
            )}
            {form.watch('imageUrl') &&
              form.watch('imageUrl') !== article?.imageUrl && (
                <div className="flex flex-col items-center">
                  <p className="text-xs">Imagem Atualizada</p>
                  <img
                    src={form.watch('imageUrl')}
                    alt="Imagem atualizada do artigo"
                    className="mt-2 size-32 rounded-lg border border-zinc-200 object-cover p-1 dark:border-zinc-800 lg:size-56"
                  />
                </div>
              )}
          </div>
          <FormMessage>{formState.errors.imageUrl?.message}</FormMessage>
        </FormItem>
        <div className="flex items-center justify-center">
          <Button type="submit" className="mt-4 w-full lg:max-w-sm">
            {article?.id ? 'Atualizar Artigo' : 'Criar Artigo'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
