/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

import { useAuthContext } from '@/context/AuthContext'
import { IUserUpdate } from '@/types'
import { updateProfileSchema } from '@/utils/schema'

import { Button } from '../ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

interface ProfileFormProps {
  user?: IUserUpdate
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { updateUser, user: userContext, onLogout } = useAuthContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(userContext)
  }, [userContext])

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
  })

  useEffect(() => {
    if (user) {
      form.reset({
        ...user,
      })
    }
  }, [user, form.reset])

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    setLoading(true)
    try {
      const userId = userContext?.id

      if (!userId) {
        toast.error(
          'Nenhum usuário encontrado para atualizar. Faça login novamente.'
        )

        setTimeout(() => {
          onLogout()
        }, 3000)
        return
      }

      await updateUser(userId, values)
      toast.success('Usuário atualizado com sucesso!')
    } catch (error: any) {
      console.log('ERROR: ', error)
      toast.error('Ocorreu algum erro ao tentar criar seu artigo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <div className="flex items-start space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-24 w-[60vw]" />
            <Skeleton className="h-24 w-[60vw]" />
            <Skeleton className="h-24 w-[60vw]" />
          </div>
        </div>
      ) : (
        <div className="h-auto bg-blue-400 p-6 rounded-md">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full"
              autoComplete="off"
            >
              <div className="flex flex-col space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="bg-white rounded-md p-4">
                      <FormLabel className="font-bold text-blue-600 text-lg">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="bg-white rounded-md p-4">
                      <FormLabel className="font-bold text-blue-600 text-lg">
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={() => (
                    <FormItem className="bg-white rounded-md p-4">
                      <FormLabel className="font-bold text-blue-100 text-lg">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <>
                          <Input
                            type="password"
                            autoComplete="new-password"
                            placeholder="********"
                            disabled
                          />
                          <p className="text-sm text-blue-100 italic">
                            Para alterar sua senha entre em contato com o
                            administrador do sistema
                          </p>
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="mt-6 w-[180px]">
                Atualizar perfil
              </Button>
            </form>
          </FormProvider>
        </div>
      )}
      <Toaster />
    </div>
  )
}
