/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
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
import { Skeleton } from '../ui/skeleton'
import { Switch } from '../ui/switch'

export const EditArticleItem: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { selectedArticle, updateArticle, getArticles } = useArticleContext()

  const form = useForm<z.infer<typeof updateArticleSchema>>({
    resolver: zodResolver(updateArticleSchema),
  })

  useEffect(() => {
    form.reset({
      title: '',
      description: '',
      body: '',
      published: false,
      imageUrl: '',
    })
  }, [form.reset])

  useEffect(() => {
    if (selectedArticle) {
      form.reset({
        ...selectedArticle,
      })
    }
  }, [selectedArticle, form.reset])

  const onSubmit = async (values: z.infer<typeof updateArticleSchema>) => {
    setLoading(true)
    try {
      const articleId = selectedArticle?.id

      if (!articleId) {
        toast.error('Nenhum ID encontrado para fazer o envio.')
        return
      }

      await updateArticle(articleId, values)
      await toast.success('Alterações feitas.')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('ERROR: ', error)
      toast.error('Ocorreu algum erro ao tentar editar seu artigo.')
    } finally {
      setLoading(false)
      await getArticles()
    }
  }

  return (
    <div>
      {loading ? (
        <div className="flex items-start space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-[60vw]" />
            <Skeleton className="h-10 w-[60vw]" />
            <Skeleton className="h-96 w-[60vw]" />
            <Skeleton className="h-12 w-[60vw]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-12 w-[20vw]" />
            <Skeleton className="h-28 w-[20vw]" />
          </div>
        </div>
      ) : (
        <div className="h-auto bg-blue-400 p-6 rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
              <div className="flex flex-row space-x-8">
                <div className="space-y-8 w-full">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="bg-white rounded-md p-4">
                        <FormLabel className="font-bold text-blue-600 text-lg">
                          Título
                        </FormLabel>
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
                  <div className="bg-white rounded-md p-4 space-y-8">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-blue-600 text-lg">
                            Descrição
                          </FormLabel>
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-blue-600 text-lg">
                            Seu artigo
                          </FormLabel>
                          <FormControl>
                            <Controller
                              name="body"
                              control={form.control}
                              defaultValue=""
                              render={() => (
                                <TextareaEditor
                                  value={field.value || ''}
                                  onChange={(content) => {
                                    field.onChange(content)
                                  }}
                                />
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-8 w-1/2">
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="bg-white p-4 rounded-md">
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label
                              htmlFor="published"
                              className="text-blue-600"
                              {...field}
                            >
                              Publicar
                            </Label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="bg-white p-4 rounded-md">
                        <FormLabel className="font-bold text-blue-600 text-lg">
                          Imagem
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="picture"
                            type="text"
                            {...field}
                            // value={field.value || '' || undefined}
                            // onChange={(e) => {
                            //   field.onChange(e.target.files?.[0])
                            // }}
                          />
                        </FormControl>
                        <FormDescription>
                          Tamanho max de imagem 3mb (ou link)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 text-center">
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
      )}
      <Toaster />
    </div>
  )
}
