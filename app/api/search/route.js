// app/api/search/route.js
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// Function to recursively find the first image node
const findFirstImage = (nodes) => {
  for (const node of nodes) {
    if (node.type === "image") {
      return node.attrs.src;
    }
    if (node.content) {
      const imageSrc = findFirstImage(node.content);
      if (imageSrc) return imageSrc;
    }
  }
  return null;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const supabase = supabaseServer();

  try {
    // Step 1: Fetch posts using websearch_to_tsquery
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .textSearch('search_vector', query, {
        type: 'websearch',
        config: 'english',
      })
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      throw new Error("Failed to fetch posts");
    }

    // Step 2: Fetch all users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username, profile_image_url, followers_count');

    if (usersError) {
      throw new Error("Failed to fetch users");
    }

    // Create a map of user IDs to user data for quick lookup
    const usersMap = new Map(users.map(user => [user.id, user]));

    // Step 3: Format posts to match the QuestionCard component's expected structure
    const formattedPosts = posts.map(post => {
      const description = typeof post.description === "string" ? JSON.parse(post.description) : post.description;

      // Extract the first paragraph from the description
      const firstParagraph = description.content
        .find(node => node.type === "paragraph")?.content?.[0]?.text || "No description available";

      // Find the first image in the description
      const firstImage = findFirstImage(description.content);

      // Get user info from the usersMap
      const user = usersMap.get(post.user_id);
      const username = user?.username || "Anonymous";
      const profileImg = user?.profile_image_url || "https://api.dicebear.com/7.x/bottts/svg?seed=DefaultUser";
      const followersCount = user?.followers_count || 0;

      return {
        id: post.id,
        user_id: post.user_id,
        username,
        profileImg,
        questionTitle: post.title,
        questionDescription: firstParagraph,
        answers: post.answers_count || 0,
        views: post.views_count || 0,
        likes_count: post.likes_count || 0,
        dislikes_count: post.dislikes_count || 0,
        followers_count: followersCount,
        slug: post.slug,
        picture: firstImage,
        tags: post.tags || [], // Ensure tags are included
      };
    });

    return NextResponse.json({
      posts: formattedPosts,
      total: posts.length,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error searching posts:", error);
    return NextResponse.json({ error: 'Failed to search posts' }, { status: 500 });
  }
}