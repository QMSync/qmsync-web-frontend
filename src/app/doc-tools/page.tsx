'use client'

import { useState } from 'react'
import DocToolLayout from './layouts/DocToolLayout'
import RichTextEditor from './components/RichTextEditor'

export default function DocCreationPage() {
  const [documentContent, setDocumentContent] = useState<string>('')

  return (
    <DocToolLayout>
      <div className="h-full">
        <RichTextEditor 
          content={documentContent}
          onContentChange={setDocumentContent}
        />
      </div>
    </DocToolLayout>
  )
}