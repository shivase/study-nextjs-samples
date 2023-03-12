'use client';
import { DocumentData, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';

import { db } from '@/config/firebase';

import CommentModal from '../../components/CommentModal';
import Post from '../../components/Post';
import Sidebar from '../../components/Sidebar';
import Widgets from '../../components/Widgets';
import { useNews } from '../../hooks/useNews';
import { useUsers } from '../../hooks/useUsers';

import Comment from './components/Comment';

const PostsPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const [post, setPost] = useState<DocumentData>();
  const [comments, setComments] = useState<DocumentData[]>([]);
  const { news } = useNews();
  const { users } = useUsers();

  useEffect(() => {
    onSnapshot(doc(db, 'posts', params.slug), (snapshot) => setPost(snapshot));
  }, [params]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts', params.slug, 'comments'), orderBy('timestamp', 'desc')),
      (snapshot) => setComments(snapshot.docs),
    );
  }, [params]);

  return (
    <main id="twitter-app" className="mx-auto flex min-h-screen">
      <Sidebar />
      <div className="max-w-xl grow border-x sm:ml-[73px] lg:ml-[370px] lg:min-w-[576px]">
        <div className="sticky top-0 z-50 flex items-center space-x-2 border-b border-gray-200 bg-white py-2 px-3">
          <HiArrowLeft className="hover-effect" onClick={() => router.push('/twitter-clone')} />
          <h2 className="cursor-pointer text-lg font-bold sm:text-2xl">Tweet</h2>
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            {post && <Post id={params.slug} post={post} />}
            <div className="">
              {comments.map((comment) => (
                <Comment
                  commentId={comment.id}
                  originalPostId={params.slug}
                  key={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {news && users && <Widgets news={news} users={users} />}
      <CommentModal />
    </main>
  );
};

export default PostsPage;
