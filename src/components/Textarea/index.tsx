/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useRef } from 'react'

import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEEditor } from 'tinymce'

const { VITE_TINY_API_KEY } = import.meta.env

export interface TextareaEditorProps {
  value?: string
  onChange?: (content: string) => void
}

export const TextareaEditor: React.FC<TextareaEditorProps> = ({
  value,
  onChange,
}) => {
  const editorRef = useRef<TinyMCEEEditor | null>(null)

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

  const handleInit = useCallback((_: any, editor: TinyMCEEEditor) => {
    editorRef.current = editor
  }, [])

  const handleEditorChange = (content: string) => {
    onChange?.(content)
  }

  return (
    <Editor
      apiKey={VITE_TINY_API_KEY}
      onInit={handleInit}
      value={value}
      onEditorChange={handleEditorChange}
      init={initConfig}
    />
  )
}
