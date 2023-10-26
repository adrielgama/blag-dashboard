/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

import { uploadImageToCloudinary } from '@/lib/imgbb'
import { IArticle } from '@/types'
import { updateArticleSchema } from '@/utils/schema'

import { Spinner } from '../spinner'
import { TextareaEditor } from '../Textarea'
import { Button } from '../ui/button'
import {
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

interface ArticleFormProps {
  article?: IArticle
  onSubmit: (articleData: z.infer<typeof updateArticleSchema>) => void
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string | null>(
    article?.imageUrl || null
  )
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(
    article?.imageUrl || null
  )
  const [inputImageUrl, setInputImageUrl] = useState<string | null>(null)

  const MAX_FILE_SIZE = 3 * 1024 * 1024

  const uploadImage = async (file: File) => {
    setIsLoading(true)
    try {
      const imageUrl = await uploadImageToCloudinary(file)
      return imageUrl
    } catch (error) {
      toast.error('Erro ao fazer upload da imagem.')
      console.error('Error uploading image:', error)
    } finally {
      setIsLoading(false)
      toast.success('Imagem carregada.')
    }
  }

  const handleImageChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      const file = event.target.files![0]
      if (file && file.size <= MAX_FILE_SIZE) {
        const imageUrl = await uploadImage(file)
        if (imageUrl) {
          if (!oldImageUrl) setOldImageUrl(previewImage)
          setInputImageUrl(imageUrl)
          setPreviewImage(imageUrl)
          form.setValue('imageUrl', imageUrl)
        }
      } else {
        toast.error(
          'Tamanho do arquivo excedido. Tamanho máximo permitido é de 3MB.'
        )
      }
    },
    [oldImageUrl, previewImage]
  )

  const form = useForm<z.infer<typeof updateArticleSchema>>({
    resolver: zodResolver(updateArticleSchema),
  })

  useEffect(() => {
    const defaultValues = article || {
      title: '',
      description: '',
      body: '',
      published: false,
      imageUrl: '',
    }
    form.reset(defaultValues)
  }, [article])

  return (
    <div className="h-auto bg-blue-400 p-6 rounded-md">
      <Toaster />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            if (inputImageUrl) {
              data.imageUrl = inputImageUrl
            }
            onSubmit(data)
          })}
          className="w-full"
        >
          {isLoading && <Spinner />}
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
                          id="published"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="published" className="text-blue-600">
                          Publicar
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mb-4 h-24 w-24 object-cover object-center rounded-md shadow-md border-blue-300 border"
                  />
                )}

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
                          name={field.name}
                          ref={field.ref}
                          onChange={handleImageChange}
                          type="file"
                          accept="image/*"
                        />
                      </FormControl>
                      <FormDescription>
                        Tamanho max de imagem 3mb
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 text-center">
            <Button
              type="reset"
              onClick={() => {
                form.reset()
                setPreviewImage(oldImageUrl)
                setOldImageUrl(null)
              }}
              className="mt-6 w-[180px]"
            >
              Limpar
            </Button>
            <Button type="submit" className="mt-6 w-[180px]">
              Salvar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
