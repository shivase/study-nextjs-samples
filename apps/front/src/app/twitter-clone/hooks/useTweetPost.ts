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
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { db, storage } from '@/config/firebase';

export const useTweetPost = () => {
  const { data: session } = useSession();
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
      id: session?.user.uid,
      name: session?.user.name,
      username: session?.user.username,
      userImg: session?.user.image,
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

  const likePost = async (postId: string) => {
    if (session?.user?.uid) {
      await setDoc(doc(db, 'posts', postId, 'likes', session.user.uid), {
        username: session?.user.username,
      });
    } else {
      signIn();
    }
  };

  const unlikePost = async (postId: string) => {
    if (session?.user?.uid) {
      await deleteDoc(doc(db, 'posts', postId, 'likes', session.user.uid));
    } else {
      signIn();
    }
  };

  return {
    loading,
    posts,
    sendTweet,
    likePost,
    unlikePost,
  };
};
