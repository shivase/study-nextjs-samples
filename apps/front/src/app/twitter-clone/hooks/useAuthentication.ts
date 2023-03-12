import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { app, db } from '@/config/firebase';

import { userState } from '../atom/userAtom';
import { UserAuth } from '../types';

export const useAuthentication = () => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      onAuthStateChanged(auth, async () => {
        if (auth.currentUser) {
          const docRef = doc(db, 'users', auth.currentUser.providerData[0].uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data() as UserAuth);
          }
        }
      });
    };
    fetchUser();
  }, [auth, setCurrentUser]);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      if (auth.currentUser) {
        const user = auth.currentUser.providerData[0];
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (user.displayName && !docSnap.exists()) {
          await setDoc(docRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            username: user.displayName.split(' ').join('').toLocaleLowerCase(),
            userImg: user.photoURL,
            timestamp: serverTimestamp(),
          });
        }

        onAuthStateChanged(auth, async () => {
          if (auth.currentUser) {
            const docRef = doc(db, 'users', auth.currentUser.providerData[0].uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setCurrentUser(docSnap.data() as UserAuth);
            }
          }
        });
        router.push('/twitter-clone');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  return {
    currentUser,
    signOut,
    signIn,
  };
};
