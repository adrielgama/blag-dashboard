'use client'
import { lazy, Suspense } from 'react'

import { useRouter } from 'next/navigation'

import { Header } from '@/components/form'
import Sidebar from '@/components/sidebar'
import Spinner from '@/components/spinner'
import { Form } from '@/components/ui/form'
import { useArticleForm } from '@/hooks/useArticleForm'

const ArticleForm = lazy(() => import('@/components/form/article.form'))

export default function NewArticle() {
  const router = useRouter()
  const { form, onSubmit, isLoading } = useArticleForm()

  return (
    <Sidebar>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header onClick={() => router.back()} title="Criar um novo artigo" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Suspense fallback={<Spinner />}>
                <ArticleForm form={form} />
              </Suspense>
            </form>
          </Form>
        </>
      )}
    </Sidebar>
  )
}
