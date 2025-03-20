// hooks/useLike.js
'use client'
import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase';
import { getCurrentUserId } from '@/utils/auth';

export function useLike(documentId) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch initial like state and likes count on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      const userId = await getCurrentUserId();

      // Check if the user has liked the document
      if (userId) {
        const { data: likeData, error: likeError } = await supabase
          .from('document_likes')
          .select('*')
          .eq('user_id', userId)
          .eq('document_id', documentId)
          .single();

        if (!likeError && likeData) {
          setIsLiked(true);
        }
      }

      // Fetch the current likes count
      const { data: documentData, error: documentError } = await supabase
        .from('documents')
        .select('likes_count')
        .eq('id', documentId)
        .single();

      if (!documentError && documentData) {
        setLikesCount(documentData.likes_count);
      }
    };

    fetchInitialData();
  }, [documentId]);

  const toggleLike = async () => {
    setLoading(true);
    const userId = await getCurrentUserId();
    if (!userId) {
      alert('Please log in to like this document.');
      setLoading(false);
      return;
    }

    if (isLiked) {
      // Unlike the document
      await supabase
        .from('documents')
        .update({ likes_count: likesCount - 1 })
        .eq('id', documentId);

      await supabase
        .from('document_likes')
        .delete()
        .eq('user_id', userId)
        .eq('document_id', documentId);

      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      // Like the document
      await supabase
        .from('documents')
        .update({ likes_count: likesCount + 1 })
        .eq('id', documentId);

      await supabase
        .from('document_likes')
        .insert([{ user_id: userId, document_id: documentId }]);

      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
    setLoading(false);
  };

  return {
    isLiked,
    likesCount,
    loading,
    toggleLike,
  };
}