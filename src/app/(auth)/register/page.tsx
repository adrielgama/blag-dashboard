'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import api from '@/app/api/axios'
import Logo from '@/components/logo'
import Spinner from '@/components/spinner'
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

import { registerFormSchema } from './_schema/register.schema'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const handleRegister = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      setLoading(true)

      const res = await api.post('/users/new', values)

      setLoading(false)

      if (res.status !== 201) {
        toast.error('Ocorreu algum erro ao tentar registrar o usuário')
      }

      toast.success('Usuário registrado com sucesso')
      router.push('/login')
    } catch (error) {
      toast.error('Falha ao tentar registrar usuário')
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <Logo />
      <div className="w-full max-w-sm rounded-md bg-zinc-100 p-6 dark:bg-zinc-800">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exemplo@email.com"
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
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="******"
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showPassword ? (
                          <Eye onClick={togglePasswordVisibility} />
                        ) : (
                          <EyeOff onClick={togglePasswordVisibility} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <Button type="submit" size="sm" className="my-6 px-20">
                Criar conta
              </Button>
              <Button
                variant="link"
                className="cursor-pointer text-sm transition-colors hover:text-zinc-300"
                onClick={() => router.push('/login')}
              >
                Já possui uma conta? Entrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
