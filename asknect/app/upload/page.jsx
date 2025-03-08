'use client';
import { useSession } from '@/context/SessionContext';
import styles from '../styles/Upload.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/utils/supabase';

// Utility function to generate a slug
const generateSlug = (title) => {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .trim(); // Remove leading/trailing spaces
};

// Function to generate a unique slug
const generateUniqueSlug = async (title) => {
  let slug = generateSlug(title);
  let isUnique = false;
  let attempt = 1;

  while (!isUnique) {
    const { data: existingDocument, error } = await supabase
      .from('documents')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') {
      // Ignore "No rows found" error
      throw new Error('Error checking slug uniqueness: ' + error.message);
    }

    if (!existingDocument) {
      isUnique = true; // Slug is unique
    } else {
      // Append a number to make it unique
      slug = `${generateSlug(title)}-${attempt}`;
      attempt++;
    }
  }

  return slug;
};

export default function UploadPage() {
  const { loading, session } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (loading) {
    return <p>Loading....</p>;
  }

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setIsLoading(true);

    try {
      // Get email from session
      const sessionEmail = session.user.email;

      if (!sessionEmail) {
        throw new Error('You are not signed in');
      }

      // Check if file is selected
      if (!file) {
        throw new Error('Please select a document to upload');
      }

      // Check if cover image is selected
      if (!coverImage) {
        throw new Error('Please select a cover image');
      }

      // Generate a unique slug from the title
      const slug = await generateUniqueSlug(title);

      // Using session email to get user_id
      const { data: user, error: gettingUserError } = await supabase
        .from('users')
        .select('id')
        .eq('email', sessionEmail)
        .single();

      if (gettingUserError) {
        throw new Error('Error while fetching user_id: ' + gettingUserError.message);
      }

      if (!user) {
        throw new Error('User not found');
      }

      const user_id = user.id;

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop(); // Get file extension
      const fileName = `${user_id}-${Date.now()}.${fileExt}`; // Create unique file name
      const { data: fileData, error: fileError } = await supabase.storage
        .from('documents') // Replace with your bucket name
        .upload(fileName, file);

      if (fileError) {
        throw new Error('Error uploading file: ' + fileError.message);
      }

      const file_url = fileData.path;

      // Upload cover image to Supabase Storage
      const coverImageExt = coverImage.name.split('.').pop(); // Get image extension
      const coverImageName = `${user_id}-${Date.now()}.${coverImageExt}`; // Create unique image name
      const { data: coverImageData, error: coverImageError } = await supabase.storage
        .from('cover-images') // Replace with your bucket name
        .upload(coverImageName, coverImage);

      if (coverImageError) {
        throw new Error('Error uploading cover image: ' + coverImageError.message);
      }

      const cover_image_url = coverImageData.path;

      // Insert data into the documents table
      const { data: document, error: documentError } = await supabase
        .from('documents')
        .insert([
          {
            user_id: user_id,
            title: title,
            description: description,
            slug: slug,
            cover_image_url: cover_image_url,
            file_url: file_url,
            tags: tags.split(',').map((tag) => tag.trim()), // Convert tags to an array
          },
        ])
        .single();

      if (documentError) {
        throw new Error('Error while inserting the document: ' + documentError.message);
      }

      setSuccess('Successfully uploaded document');
      router.push('/'); // Redirect to homepage or another page
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <h3 className={`${styles.title} dark:text-white`}>Document Upload</h3>
      <p className={styles.description}>
        Upload your document and additional details below. Please ensure your document is in PDF,
        DOCX, or TXT format.
      </p>

      <form onSubmit={handleDocumentUpload} className={styles.form}>
        {/* Title Input */}
        <div className={styles.inputContainer}>
          <label htmlFor="documentTitle" className={`${styles.label}`}>
            <span className="text-black dark:text-white">Title</span>
          </label>
          <input
            type="text"
            id="documentTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter the title of your document"
            className={styles.input}
          />
        </div>

        {/* Description Box */}
        <div className={styles.inputContainer}>
          <label htmlFor="description" className={styles.label}>
            <span className="text-black dark:text-white">Description</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Provide a detailed description..."
            className={styles.textarea}
          />
        </div>

        {/* Document Upload (File Input) */}
        <div className={styles.inputContainer}>
          <label className={styles.label}>
            <span className="text-black dark:text-white">Upload Document</span>
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.txt" // Specify accepted file types
            onChange={(e) => setFile(e.target.files[0])} // Set the selected file
            required
            className={styles.fileInput}
          />
        </div>

        {/* Cover Image Upload */}
        <div className={styles.inputContainer}>
          <label className={styles.label}>
            <span className="text-black dark:text-white">Cover Image</span>
          </label>
          <input
            type="file"
            accept="image/*" // Accept all image types
            onChange={(e) => setCoverImage(e.target.files[0])} // Set the selected image
            required
            className={styles.fileInput}
          />
        </div>

        {/* Tags */}
        <div className={styles.inputContainer}>
          <label htmlFor="tags" className={styles.label}>
            <span className="text-black dark:text-white">Tags</span>
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
            placeholder="Add tags separated by commas (e.g., physics, science, language, etc)"
            className={styles.input}
          />
        </div>

        <div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>

        {/* Submit Button */}
        <div className={styles.submitContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || !file || !coverImage} // Disable if files are not selected
          >
            {isLoading ? 'Uploading...' : 'Post Document'}
          </button>
        </div>
      </form>
    </div>
  );
}