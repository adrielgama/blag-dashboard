'use client'
import { useRouter } from 'next/navigation'

import { Header, ArticleForm } from '@/components/form'
import Sidebar from '@/components/sidebar'
import Spinner from '@/components/spinner'
import { Form } from '@/components/ui/form'
import { useArticleForm } from '@/hooks/useArticleForm'

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
              <ArticleForm form={form} />
            </form>
          </Form>
        </>
      )}
    </Sidebar>
  )
}
