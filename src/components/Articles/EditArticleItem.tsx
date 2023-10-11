import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useArticleContext } from '@/context/ArticleContext'
import { updateArticleSchema } from '@/utils/schema'

import { TextareaEditor } from '../Textarea'
import { Button } from '../ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
// import { Textarea } from '../ui/textarea'

export const EditArticleItem: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { selectedArticle } = useArticleContext()

  const form = useForm<z.infer<typeof updateArticleSchema>>({
    resolver: zodResolver(updateArticleSchema),
    defaultValues: {
      title: selectedArticle?.title ?? '',
      description: selectedArticle?.description ?? '',
      body: selectedArticle?.body ?? '',
      published: selectedArticle?.published ?? false,
      imageUrl: selectedArticle?.imageUrl ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof updateArticleSchema>) => {
    setLoading(true)
    try {
      console.log('SUBIMT', values)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false)

      console.log('ERROR: ', error)
    } finally {
      console.log(loading)
    }
  }

  return (
    <div>
      <div className="h-auto bg-blue-400 p-6 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Insira seu título"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Insira a sua descrição"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artigo</FormLabel>
                  <FormControl>
                    <TextareaEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input id="picture" type="file" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tamanho max de imagem 3mb (ou link)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="published" {...field}>
                        Publicar
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <Button type="reset" className="mt-6 w-[180px]">
                Limpar
              </Button>
              <Button type="submit" className="mt-6 w-[180px]">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
