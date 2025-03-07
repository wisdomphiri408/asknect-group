'use client'
import { useDropzone } from "react-dropzone";
import styles from "../styles/Upload.module.css";


export default function UploadPage() {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div className={`${styles.container}`}>
      <h3 className={`${styles.title}  dark:text-white`}>Document Upload</h3>
      <p className={styles.description}>
        Upload your document and additional details below. Please ensure your
        document is in PDF, DOCX, or TXT format.
      </p>

      <form className={styles.form}>
        {/* Title Input */}
        <div className={styles.inputContainer}>
          <label htmlFor="documentTitle" className={`${styles.label}`}>
            <span className="text-black dark:text-white">
              Title
            </span>
          </label>
          <input
            type="text"
            id="documentTitle"
            name="title"
            placeholder="Enter the title of your document"
            className={styles.input}
          />
        </div>

        {/* Description Box */}
        <div className={styles.inputContainer}>
          <label htmlFor="description" className={styles.label}>
            <span className="text-black dark:text-white">
              Description
            </span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide a detailed description..."
            className={styles.textarea}
          />
        </div>

        {/* Document Upload (Drag & Drop + Button) */}
        <div className={styles.uploadContainer}>
          <label className={styles.uploadLabel}>
            <span className="text-black dark:text-white">
              Upload Document
            </span>
            </label>
          <div
            {...getRootProps()}
            className={styles.dropzone}
          >
            <input {...getInputProps()} />
            <p className="text-white">Drag & drop your document here or click to select files</p>
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className={styles.inputContainer}>
          <label className={styles.label}><span className="text-black dark:text-white">Cover Image</span></label>
          <input
            type="file"
            accept="image/*"
            name="coverImage"
            className={styles.fileInput}
          />
        </div>

        {/* Tags */}
        <div className={styles.inputContainer}>
          <label htmlFor="tags" className={styles.label}>
            <span className="text-black dark:text-white">
              Tags
            </span>
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Add tags separated by commas(e.g physics, science, language, etc)"
            className={styles.input}
          />
        </div>

        {/* Submit Button */}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Post Document
          </button>
        </div>
      </form>
    </div>
  );
}
