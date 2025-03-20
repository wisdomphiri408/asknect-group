import supabase from '@/utils/supabase';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns'; // Date formatting
import { Heart, ArrowDownToLine } from 'lucide-react';
import BookCard from "/components/BookCard.jsx";

export async function generateMetadata({ params }) {
  // Fetch the document data based on the slug
  const { data: document, error: documentError } = await supabase
    .from('documents')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (documentError || !document) {
    return {
      title: 'Document Not Found',
      description: 'No description available.',
    };
  }

  // Fetch related documents that share any of the tags
  const { data: relatedDocuments, error: relatedError } = await supabase
    .from('documents')
    .select('*')
    .overlaps('tags', document.tags); // Use the 'overlap' operator for matching at least one tag

  if (relatedError) {
    console.error('Error fetching related documents:', relatedError);
  }

  // Use the fetched data for metadata
  return {
    title: document.title || 'Document Not Found',
    description: document.description || 'No description available.',
    relatedDocuments: relatedDocuments || [], // Pass related documents for rendering
  };
}

export default async function DocumentPage({ params }) {
  // Fetch document data
  const { data: document, error } = await supabase
    .from('documents')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !document) {
    return <div>Document not found.</div>;
  }

  // Fetch related documents (same query as in generateMetadata)
  const { data: relatedDocuments } = await supabase
    .from('documents')
    .select('*')
    .contains('tags', document.tags);

  const uploadDate = new Date(document.upload_date);
  const timeAgo = formatDistanceToNow(uploadDate, { addSuffix: true });

  return (
    <main className="container mx-auto px-4 py-8 mt-20">
      {/* Document Preview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Cover Image */}
        <div className="flex justify-center">
          <div className="max-w-[500px] max-h-[400px] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={`https://civirsurnnllejysilct.supabase.co/storage/v1/object/public/cover-images/${document.cover_image_url}`}
              alt={document.title}
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Document Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold dark:text-white">{document.title}</h1>
          <div className="text-gray-600 dark:text-white" style={{ whiteSpace: 'pre-wrap' }}>
            {document.description}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {document.tags?.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <img
              src={document.user?.profile_image_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=DefaultUser'}
              alt={document.user?.username || 'Unknown User'}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{document.user?.username || 'Unknown User'}</p>
              <p className="text-sm text-gray-500">Uploaded {timeAgo}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <p className="text-gray-600 flex gap-1">
              {document.likes_count} <Heart width={15} />
            </p>
            <p className="text-gray-600">{document.downloads_count} downloads</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button>
              <Heart />
            </button>
            <a
              href={`https://civirsurnnllejysilct.supabase.co/storage/v1/object/public/documents/${document.file_url}`}
              download={document.title}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex gap-1"
            >
              <ArrowDownToLine /> Download
            </a>
          </div>
        </div>
      </div>

      {/* Related Documents Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedDocuments?.map((relatedDoc) => (
            <BookCard key={relatedDoc.id} book={relatedDoc} />
          ))}
        </div>
      </section>
    </main>
  );
}