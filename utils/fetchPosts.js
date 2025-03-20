// utils/fetchPosts.js
import { supabaseServer } from '@/lib/supabase-server';

// Utility function to safely parse JSON descriptions
const parseDescription = (description) => {
  try {
    return typeof description === 'string' ? JSON.parse(description) : description;
  } catch (error) {
    console.error('Error parsing description:', error);
    return { content: [] }; // Return a default value to avoid breaking the app
  }
};

// Utility function to find the first image in a description's content
const findFirstImage = (nodes) => {
  if (!Array.isArray(nodes)) return null;

  for (const node of nodes) {
    if (node.type === 'image') {
      return node.attrs.src;
    }
    if (node.content) {
      const imageSrc = findFirstImage(node.content);
      if (imageSrc) return imageSrc;
    }
  }
  return null;
};

// Utility function to format a post with user data
const formatPost = (post, usersMap) => {
  const description = parseDescription(post.description);
  const user = usersMap.get(post.user_id);

  const username = user?.username || 'Anonymous';
  const profileImg = user?.profile_image_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=DefaultUser';
  const followersCount = user?.followers_count || 0;

  return {
    id: post.id,
    user_id: post.user_id,
    username,
    profileImg,
    questionTitle: post.title,
    questionDescription: description.content.find((node) => node.type === 'paragraph')?.content?.[0]?.text || 'No description available',
    answers: post.answers_count,
    views: post.views_count,
    likes_count: post.likes_count || 0, // Default to 0 if likes_count is not provided
    dislikes_count: post.dislikes_count || 0,
    followers_count: followersCount,
    slug: post.slug,
    picture: findFirstImage(description.content),
    tags: post.tags || [],
  };
};

// Utility function to fetch users and create a map
const fetchUsersMap = async (userIds) => {
  const { data: users, error } = await supabaseServer()
    .from('users')
    .select('id, username, profile_image_url, followers_count')
    .in('id', userIds);

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }

  return new Map(users.map((user) => [user.id, user]));
};

// Fetch all posts
export const fetchPosts = async () => {
  const supabase = supabaseServer();

  try {
    // Fetch posts and calculate likes_count dynamically
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, post_likes(count)') // Use a subquery to count likes
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to fetch posts');
    }

    // Extract unique user IDs from the posts
    const userIds = [...new Set(posts.map((post) => post.user_id))];
    const usersMap = await fetchUsersMap(userIds);

    // Format posts with user data and include likes_count
    const formattedPosts = posts.map((post) => ({
      ...formatPost(post, usersMap),
      likes_count: post.post_likes[0]?.count || 0, // Add likes_count from the subquery
    }));

    return formattedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Fetch top posts
export const fetchTopPosts = async () => {
  const supabase = supabaseServer();

  try {
    // Fetch posts and calculate likes_count dynamically, then sort by likes_count
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, post_likes(count)') // Use a subquery to count likes
      .order('count', { ascending: false, foreignTable: 'post_likes' }) // Sort by likes_count
      .limit(3);

    if (error) {
      throw new Error('Failed to fetch top posts');
    }

    // Extract unique user IDs from the posts
    const userIds = [...new Set(posts.map((post) => post.user_id))];
    const usersMap = await fetchUsersMap(userIds);

    // Format posts with user data and include likes_count
    const formattedTopPosts = posts.map((post) => ({
      ...formatPost(post, usersMap),
      likes_count: post.post_likes[0]?.count || 0, // Add likes_count from the subquery
    }));

    return formattedTopPosts;
  } catch (error) {
    console.error('Error fetching top posts:', error);
    throw error;
  }
};

// Fetch a post by slug
export const fetchPostBySlug = async (slug) => {
  const supabase = supabaseServer();

  try {
    // Fetch the post and calculate likes_count dynamically
    const { data: post, error } = await supabase
      .from('posts')
      .select('*, post_likes(count), users:user_id (id, username, profile_image_url, followers_count)')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to fetch post');
    }

    // Parse the description
    const parsedDescription = parseDescription(post.description);

    // Format the post with user data and include likes_count
    const formattedPost = {
      ...formatPost(post, new Map([[post.users.id, post.users]])),
      likes_count: post.post_likes[0]?.count || 0, // Add likes_count from the subquery
    };

    // Remove the nested users object to avoid redundancy
    delete formattedPost.users;

    return formattedPost;
  } catch (error) {
    console.error('Error in fetchPostBySlug:', error);
    throw error;
  }
};

// Fetch related posts by user ID
export const fetchRelatedPosts = async (userId) => {
  const supabase = supabaseServer();

  try {
    // Fetch related posts and calculate likes_count dynamically
    const { data: relatedPosts, error } = await supabase
      .from('posts')
      .select('*, post_likes(count), users:user_id (id, username, profile_image_url, followers_count)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      throw new Error('Failed to fetch related posts');
    }

    // Format related posts with user data and include likes_count
    const formattedRelatedPosts = relatedPosts.map((post) => ({
      ...formatPost(post, new Map([[post.users.id, post.users]])),
      likes_count: post.post_likes[0]?.count || 0, // Add likes_count from the subquery
    }));

    return formattedRelatedPosts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    throw error;
  }
};