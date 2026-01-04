'use client'

import { useState, useRef } from 'react'

interface RichTextEditorProps {
  content: string
  onContentChange: (content: string) => void
}

export default function RichTextEditor({ content, onContentChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML)
    }
  }

  const insertTable = () => {
    const table = `
      <table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Cell 1</td>
          <td style="padding: 8px; border: 1px solid #ccc;">Cell 2</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Cell 3</td>
          <td style="padding: 8px; border: 1px solid #ccc;">Cell 4</td>
        </tr>
      </table>
    `
    formatText('insertHTML', table)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => formatText('bold')}
          className="p-1 hover:bg-gray-200 rounded text-xs font-bold"
          title="Bold"
        >
          B
        </button>
        <button
          onClick={() => formatText('italic')}
          className="p-1 hover:bg-gray-200 rounded text-xs italic"
          title="Italic"
        >
          I
        </button>
        <button
          onClick={() => formatText('underline')}
          className="p-1 hover:bg-gray-200 rounded text-xs underline"
          title="Underline"
        >
          U
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button
          onClick={() => formatText('justifyLeft')}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Align Left"
        >
          ⬅
        </button>
        <button
          onClick={() => formatText('justifyCenter')}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Center"
        >
          ⬌
        </button>
        <button
          onClick={() => formatText('justifyRight')}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Align Right"
        >
          ➡
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button
          onClick={() => formatText('insertUnorderedList')}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Bullet List"
        >
          •
        </button>
        <button
          onClick={() => formatText('insertOrderedList')}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Numbered List"
        >
          1.
        </button>
        <button
          onClick={insertTable}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Insert Table"
        >
          ⊞
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="flex-1 p-4 focus:outline-none overflow-y-auto"
        style={{ 
          fontFamily: 'Arial, sans-serif', 
          fontSize: '11pt',
          lineHeight: '1.5'
        }}
        onInput={(e) => {
          const target = e.target as HTMLDivElement
          onContentChange(target.innerHTML)
        }}
        dangerouslySetInnerHTML={{ __html: content }}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}