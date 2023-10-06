import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/AuthContext'
import { loginSchema } from '@/utils/schema'

export const Login = () => {
  const navigate = useNavigate()
  const { onLogin } = useAuthContext()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await onLogin(values.email, values.password)
      navigate('/home')
    } catch (error) {
      console.error('Falha ao fazer login', error)
      // Trate os erros de login aqui...
    }
  }

  const handleCreateAccount = () => {
    navigate('/sign-up')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly container mx-auto p-10">
      <Logo />

      <div className="w-96 h-auto bg-secondary p-6 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@email.com.br"
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <a
                className="cursor-pointer text-xs hover:text-slate-300 transition-colors"
                onClick={() => console.log('click')}
              >
                Esqueci minha senha
              </a>
              <a
                className="cursor-pointer hover:text-slate-300 transition-colors"
                onClick={handleCreateAccount}
              >
                Criar uma conta
              </a>
              <Button type="submit" className="mt-6 w-[180px]">
                Entrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
