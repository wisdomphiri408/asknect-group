'use client';
import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import { getCurrentUserId } from '@/utils/auth';
import { supabase } from '@/utils/supabase';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Italic,
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: '<p>Start writing your post...</p>',
  });

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response) {
      throw new Error('Failed to upload image');
    }

    const { url } = await response.json();
    return url;
  };

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = await handleImageUpload(file);
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  };

  const setLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userId = await getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');

      let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      let uniqueSlug = slug;

      const { data: existingPosts } = await supabase
        .from('posts')
        .select('slug')
        .ilike('slug', `${slug}%`);

      if (existingPosts.length > 0) {
        uniqueSlug = `${slug}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      }

      const description = editor.getHTML();
      const imageUrls = await Promise.all(
        Array.from(editor.state.doc.content)
          .filter(node => node.type.name === 'image')
          .map(async node => {
            const src = node.attrs.src;
            if (src.startsWith('data:')) {
              const file = await fetch(src).then(res => res.blob());
              return await handleImageUpload(file);
            }
            return src;
          })
      );

      const { data, error } = await supabase
        .from('posts')
        .insert([{
          user_id: userId,
          title,
          description,
          slug: uniqueSlug,
          tags: tags.split(',').map(tag => tag.trim()),
        }]);

      if (error) throw error;

      alert('Post created successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : 'bg-white'}`}
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : 'bg-white'}`}
            >
              <em>I</em>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded ${editor?.isActive('underline') ? 'bg-gray-200' : 'bg-white'}`}
            >
              <u>U</u>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded ${editor?.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'bg-white'}`}
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'bg-white'}`}
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'bg-white'}`}
            >
              H3
            </button>
            <button
              type="button"
              onClick={setLink}
              className={`p-2 rounded ${editor?.isActive('link') ? 'bg-gray-200' : 'bg-white'}`}
            >
              Link
            </button>
            <button
              type="button"
              onClick={addImage}
              className="p-2 rounded bg-white"
            >
              Image
            </button>
          </div>
          <EditorContent editor={editor} className="p-4" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}