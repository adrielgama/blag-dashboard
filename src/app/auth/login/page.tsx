'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Logo from '@/components/logo'
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

import { loginFormSchema } from './_schema/login.schema'

export default function SignInPage() {
  const { status } = useSession()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  if (status === 'authenticated') router.push('/dashboard')

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })

    if (result?.ok) {
      router.push('/dashboard')
    } else {
      console.error('Failed to sign in', result?.error)
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <Logo />
      <div className="w-full max-w-sm rounded-md p-6 dark:bg-zinc-800">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
                Entrar
              </Button>
              <Button
                variant="link"
                className="cursor-pointer text-sm transition-colors hover:text-zinc-300"
                onClick={() => router.push('/auth/register')}
              >
                Não tem uma conta? Criar uma
              </Button>
              <a
                className="cursor-pointer text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                href="mailto:adrielgama@gmail.com"
                rel="noreferrer"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
