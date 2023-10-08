import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'
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
import { useAuthContext } from '@/context/AuthContext'
import {
  ERROR_MESSAGES,
  STATUS_CODE_TO_ERROR_MESSAGE_MAP,
} from '@/utils/apiError'
import { loginSchema } from '@/utils/schema'

export const Login = () => {
  const navigate = useNavigate()
  const { onLogin, isAuthenticated } = useAuthContext()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await onLogin(values.email, values.password)
      toast.success('Login realizado com sucesso!')

      setTimeout(() => {
        navigate('/home')
      }, 1000)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false)

      if (error && (error as AxiosError).response) {
        const axiosError = error as AxiosError
        const statusCode = axiosError.response?.status

        if (typeof statusCode === 'number') {
          const errorMessage =
            STATUS_CODE_TO_ERROR_MESSAGE_MAP[statusCode] ||
            ERROR_MESSAGES.DEFAULT
          toast.error(errorMessage)
        } else {
          toast.error(ERROR_MESSAGES.DEFAULT)
        }
      } else {
        toast.error(ERROR_MESSAGES.DEFAULT)
      }
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (isAuthenticated) {
      timer = setTimeout(() => {
        navigate('/home')
      }, 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isAuthenticated, navigate])

  const handleCreateAccount = () => {
    navigate('/sign-up')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly container mx-auto p-10">
      <Logo />
      {loading && <Spinner />}

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
              <p
                className="cursor-pointer text-xs hover:text-slate-300 transition-colors"
                onClick={() => console.log('click')}
              >
                Esqueci minha senha
              </p>
              <p
                className="cursor-pointer hover:text-slate-300 transition-colors"
                onClick={handleCreateAccount}
              >
                Criar uma conta
              </p>
              <Button type="submit" className="mt-6 w-[180px]">
                Entrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  )
}
