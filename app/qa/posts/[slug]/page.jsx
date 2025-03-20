// app/qa/posts/[slug]/page.jsx
import SinglePost from '@/components/SinglePost';
import { fetchPostBySlug, fetchRelatedPosts } from '@/utils/fetchPosts';

export default async function PostPage({ params }) {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto p-4 mt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-blue-600">No pages available</h1>
          <p className="text-gray-600">The post you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const relatedPosts = await fetchRelatedPosts(post.user_id);

  return (
    <div className="container lg:mx-auto px-0 mx-0 lg:p-4 mt-20">
      <SinglePost post={post} relatedPosts={relatedPosts.slice(0, 3)} />
    </div>
  );
}