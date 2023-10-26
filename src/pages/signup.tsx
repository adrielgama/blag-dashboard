import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { Logo } from '@/components/logo'
import { Spinner } from '@/components/spinner'
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
import { api } from '@/lib/httpClient'
import { ISignup } from '@/types'
import { signupSchema } from '@/utils/schema'

const { VITE_RECAPTCHA_KEY } = import.meta.env

export const Signup = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    if (!recaptchaValue) {
      toast.error('Por favor, verifique o reCAPTCHA.')
      return
    }
    setLoading(true)
    try {
      await api.post<ISignup>('/users/new', {
        name: values.name,
        email: values.email,
        password: values.password,
        recaptchaValue,
      })

      toast.success('Conta criada com sucesso!')

      setTimeout(() => {
        navigate('/')
      }, 2000)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Ocorreu algum erro ao tentar criar sua conta.')
      setLoading(false)
    } finally {
      form.reset()
      setLoading(false)
    }
  }

  const handleLogin = () => {
    navigate('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly container mx-auto p-10">
      <Logo />
      <Toaster />
      {loading && <Spinner />}

      <div className="w-96 h-auto bg-blue-400 p-6 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="******"
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
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
              <ReCAPTCHA
                sitekey={VITE_RECAPTCHA_KEY}
                onChange={(value) => setRecaptchaValue(value)}
              />
              <Button type="submit" className="w-[180px]">
                Criar conta
              </Button>
              <a
                className="cursor-pointer hover:text-slate-300 transition-colors"
                onClick={handleLogin}
              >
                Fazer login
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
