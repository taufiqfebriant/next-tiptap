'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useLocalStorage } from "@uidotdev/usehooks";
import { useDebouncedCallback } from 'use-debounce';

const Tiptap = () => {
  const [content, saveContent] = useLocalStorage('content', '');
  const debounced = useDebouncedCallback((value) => {
    saveContent(value);
  }, 500);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate({ editor }) {
      debounced(editor.getHTML());
    }
  });

  return <EditorContent editor={editor} />
}

export default Tiptap
