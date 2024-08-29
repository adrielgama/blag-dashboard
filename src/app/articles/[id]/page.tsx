'use client'

import { useParams, useRouter } from 'next/navigation'

import { ArticleForm, Header } from '@/components/form'
import Sidebar from '@/components/sidebar'
import Spinner from '@/components/spinner'
import { Form } from '@/components/ui/form'
import { useArticleForm } from '@/hooks/useArticleForm'
import { useArticleDetail } from '@/hooks/useArticles'

export default function ArticleDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  const { article, isLoading, error } = useArticleDetail(id as string)
  const { form, onSubmit, isLoading: isLoadingForm } = useArticleForm(article!)

  return (
    <Sidebar>
      {error && <p>Erro ao carregar o artigo.</p>}
      {isLoading || isLoadingForm ? (
        <Spinner />
      ) : (
        <>
          <Header onClick={() => router.back()} title="Edite o seu artigo" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ArticleForm form={form} article={article} />
            </form>
          </Form>
        </>
      )}
    </Sidebar>
  )
}
