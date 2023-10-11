import React, { useState } from 'react';
import { marked } from 'marked';
import { Textarea } from '../ui/textarea';
import { FormDescription } from '../ui/form';

type Props = {
  initialBody?: string;
  onBodyChange?: (markdown: string) => void;
};

const MarkdownEditor: React.FC<Props> = ({ initialBody = '', onBodyChange }) => {
  const [body, setBody] = useState(initialBody);
  
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    onBodyChange?.(e.target.value);
  };

  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <Textarea
          id="body"
          value={body}
          onChange={handleBodyChange}
          placeholder="Insira aqui o seu artigo"
          maxLength={30000}
          className="mt-1 p-2 w-full h-60 border rounded"
        />
      </div>
      <div className="w-1/2 p-4 border rounded bg-white" dangerouslySetInnerHTML={{ __html: marked(body) }} />
    </div>
  );
};

export default MarkdownEditor;
