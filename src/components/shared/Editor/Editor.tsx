import React, {
  forwardRef, useImperativeHandle, useRef,
} from 'react';
import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';
import { EditorWrapper } from './Editor.styled';

interface EditorProps {
  initialValue: string;
  draftName: string;
}

interface EditorRef {
  saveDraft: () => void;
  pasteDraft: () => void;
  getContent: () => string;
  setContent: (data: string | null) => void;
  editor: any;
}

const Editor = forwardRef((props: EditorProps, ref) => {
  const editorRef = useRef<EditorRef>(null);

  useImperativeHandle(ref, () => ({
    saveDraft() {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        localStorage.setItem(props.draftName, content);
      }
    },

    pasteDraft() {
      if (editorRef.current) {
        const data = localStorage.getItem(props.draftName);
        editorRef.current.setContent(data);
      }
    },

    getContent() {
      if (editorRef.current) {
        return editorRef.current.getContent();
      }

      return null;
    },
  }));

  return (
    <EditorWrapper className="editor">
      <TinyMceEditor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        // eslint-disable-next-line no-return-assign
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={props.initialValue}
        init={{
          height: 400,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
          ],
          menu: {
            file: { title: 'File', items: 'newdocument' },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall' },
            view: { title: 'View', items: 'code | visualaid' },
            insert: { title: 'Insert', items: 'link | image' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | blocks align | removeformat' },
            tools: { title: 'Tools', items: 'code' },
          },
          menubar: 'file edit view insert format tools',
          mobile: {
            menubar: 'file edit view insert format tools',
          },
          toolbar: 'bold italic alignleft aligncenter alignright alignjustify link image',
          content_style: 'body { font-family:Poppins,sans-serif; font-size:14px }',
        }}
      />
    </EditorWrapper>
  );
});

Editor.displayName = 'Editor';

export default Editor;
