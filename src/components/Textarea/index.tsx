import { useRef, useState } from 'react'

import * as Emoji from 'quill-emoji'
import ReactQuill, { Quill } from 'react-quill'

import { htmlToMarkdown, markdownToHtml } from '@/utils/parser'

import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'

Quill.register('modules/emoji', Emoji)

export interface EditorContentChanged {
  html: string
  markdown: string
}

export interface EditorProps {
  value?: string
  onChange?: (changes: EditorContentChanged) => void
}

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['emoji'],
  ['clean'],
]

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
]

export const TextareaEditor = (props: EditorProps) => {
  const [value, setValue] = useState<string>(markdownToHtml(props.value || ''))
  const reactQuillRef = useRef<ReactQuill>(null)

  const onChange = (content: string) => {
    setValue(content)

    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: htmlToMarkdown(content),
      })
    }
  }

  return (
    <div className="bg-white">
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        placeholder="Escreva seu artigo aqui"
        modules={{
          toolbar: {
            container: toolbarOptions,
          },
          'emoji-toolbar': true,
          'emoji-textarea': false,
          'emoji-shortname': true,
        }}
        formats={formats}
        value={value}
        onChange={onChange}
        // {...props}
      />
    </div>
  )
}
