'use client'
import { useCallback, useMemo, useRef, useState } from 'react'

import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEEditor } from 'tinymce'

import { Skeleton } from './ui/skeleton'

export interface TextareaEditorProps {
  value?: string
  onChange?: (content: string) => void
}

// const TinyMCEKey = process.env.NEXT_PUBLIC_TINY_API_KEY // TODO: use env variable

export default function TextareaEditor({
  value,
  onChange,
}: TextareaEditorProps) {
  const editorRef = useRef<TinyMCEEEditor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const initConfig = useMemo(
    () => ({
      height: 300,
      menubar: false,
      statusbar: false,
      toolbar_sticky: true,
      language: 'pt_BR',
      plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'code',
        'help',
        'wordcount',
        'emoticons',
      ],
      toolbar:
        'undo redo | blocks | link | ' +
        'bold italic underline  forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent blockquote | ' +
        'emoticons | removeformat | help | wordcount |',
      content_style:
        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    }),
    []
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInit = useCallback((_: any, editor: TinyMCEEEditor) => {
    editorRef.current = editor
    setIsLoading(false)
  }, [])

  const handleEditorChange = (content: string) => {
    onChange?.(content)
  }

  return (
    <>
      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-8 w-auto" />
          <Skeleton className="h-44 w-auto" />
        </div>
      )}
      <Editor
        apiKey="4suzg0l2301xnfoxihzty0ovre6ibi8idndp0fuvv68thiii"
        onInit={handleInit}
        value={value}
        onEditorChange={handleEditorChange}
        init={initConfig}
      />
    </>
  )
}
