import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { db, storage } from '@/config/firebase';

import { useAuthentication } from './useAuthentication';

export const useTweet = () => {
  const { currentUser } = useAuthentication();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) =>
      setPosts(snapshot.docs),
    );
  }, []);

  const sendTweet = async (input: string, image?: string) => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: currentUser?.uid,
      name: currentUser?.name,
      username: currentUser?.username,
      userImg: currentUser?.userImg,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (image) {
      await uploadString(imageRef, image, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
  };

  const deleteTweet = async (post: DocumentData) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'posts', post.id));
      if (post.data().image) {
        await deleteObject(ref(storage, `posts/${post.id}/image`));
      }
    }
  };

  const addComment = async (postId: string, comment: string) => {
    await addDoc(collection(db, 'posts', postId, 'comments'), {
      comment: comment,
      id: currentUser?.uid,
      name: currentUser?.name,
      username: currentUser?.username,
      userImg: currentUser?.userImg,
      timestamp: serverTimestamp(),
    });
  };

  const likePost = async (postId: string) => {
    if (currentUser?.uid) {
      await setDoc(doc(db, 'posts', postId, 'likes', currentUser.uid), {
        username: currentUser.username,
      });
    } else {
      signIn();
    }
  };

  const unlikePost = async (postId: string) => {
    if (currentUser?.uid) {
      await deleteDoc(doc(db, 'posts', postId, 'likes', currentUser.uid));
    } else {
      signIn();
    }
  };

  return {
    loading,
    posts,
    sendTweet,
    addComment,
    deleteTweet,
    likePost,
    unlikePost,
  };
};
