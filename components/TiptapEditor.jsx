"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { Mark } from "@tiptap/core";
import supabase from "@/utils/supabase";
import { ImagePlus, List, ListOrdered } from "lucide-react";
import { getCurrentUserId } from "@/utils/auth";
import { useCallback } from "react";

const Capitalize = Mark.create({
  name: "capitalize",
  addAttributes() {
    return {
      style: {
        default: "text-transform: uppercase;",
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (node) => node.style.textTransform === "uppercase",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },
  addCommands() {
    return {
      toggleCapitalize: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
    };
  },
});

const TiptapEditor = ({ value, onChange }) => {
  const debouncedOnChange = useCallback(
    (json) => {
      const timeoutId = setTimeout(() => {
        onChange(JSON.stringify(json));
      }, 500); // Adjust the delay as needed (e.g., 500ms)
      return () => clearTimeout(timeoutId);
    },
    [onChange]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "text-base border-none dark:text-white",
          },
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: "font-bold border-none dark:text-white",
        },
      }),
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      Capitalize,
      Placeholder.configure({
        placeholder: "Start typing here...",
        emptyEditorClass: "is-editor-empty",
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg inline-block max-w-full h-auto",
          style: "width: 200px; height: 200px;",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-5",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-5",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      debouncedOnChange(json); // Use the debounced function
    },
  });

  const handleImageUpload = async (file) => {
    try {
      const userId = await getCurrentUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("resizeWidth", 500);

      const response = await fetch("/api/compress-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to compress image");
      }

      const compressedImageBlob = await response.blob();

      const filePath = `${userId}/${Date.now()}-${file.name.replace(/\.\w+$/, ".webp")}`;
      const { data, error } = await supabase.storage
        .from("qastorage")
        .upload(filePath, compressedImageBlob);

      if (error) {
        throw new Error("Failed to upload image to Supabase");
      }

      const { data: publicUrlData } = supabase.storage
        .from("qastorage")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Menu Bar */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive("bold") ? "text-blue-500" : "dark:text-white"
            }`}
        >
          <span className="font-semibold">B</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive("italic") ? "text-blue-500" : "dark:text-white"
            }`}
        >
          <span className="italic">I</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive("underline") ? "text-blue-500" : "dark:text-white"
            }`}
        >
          <span className="underline underline-offset-1">U</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${editor.isActive("heading", { level: 1 }) ? "text-blue-500" : "dark:text-white"
            }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "text-blue-500" : "dark:text-white"
            }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${editor.isActive("heading", { level: 3 }) ? "text-blue-500" : "dark:text-white"
            }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive("bulletList") ? "text-blue-500" : "dark:text-white"
            }`}
        >
          <List width={20} height={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive("orderedList") ? "text-blue-500" : "dark:text-white"
            }`}
        >
          <ListOrdered width={24} height={20} />
        </button>
        <button
          type="button"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async (event) => {
              const file = event.target.files[0];
              if (file) {
                try {
                  const url = await handleImageUpload(file);
                  editor.chain().focus().setImage({ src: url }).run();
                } catch (error) {
                  console.error("Error uploading image:", error);
                  alert("Failed to upload image. Please try again.");
                }
              }
            };
            input.click();
          }}
          className="dark:text-white"
        >
          <ImagePlus width={20} height={20} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter the URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="dark:text-white"
        >
          Link
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCapitalize().run()}
          type="button"
          className={`p-2 rounded ${editor.isActive("capitalize") ? "text-blue-500" : "dark:text-white"
            }`}
        >
          Cap
        </button>
        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color || "#000000"}
          className="p-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        />
      </div>

      {/* Editor Content Area */}
      <div className="border border-gray-300 rounded px-2 dark:border-gray-600">
        <EditorContent
          editor={editor}
          className="outline-none min-h-[200px] dark:text-white dark:bg-gray-900 is-editor-empty"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;