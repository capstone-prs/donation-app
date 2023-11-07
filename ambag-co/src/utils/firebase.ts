import { getDoc, doc, setDoc } from 'firebase/firestore';
import app, { db } from '../boot/firebase';
import { NewUser } from '../types/Users';

import { GoogleAuthProvider, getAuth, signInWithPopup,signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const getUid = () => auth.currentUser?.uid;
export const getUser = (id: string) =>
  getDoc(doc(db, 'Users', id)).then((snap) => {
    if (snap.exists()) {
      return snap.data();
    } else {
      throw new Error('user not found');
    }
  });

const signin = () =>
  signInWithPopup(auth, provider).then((result) =>
    getUser(result.user.uid)
      .then((user) => {
        return { success: true, user, uid: result.user.uid };
      })
      .catch((e) => {
        if (e.message === 'user not found') {
          return { success: false, uid: result.user.uid };
        }
        throw e;
      })
  );

export const addUser = (data: NewUser, id: string) =>
  setDoc(doc(db, 'Users', id), {
    ...data,
    user_id: id,
  });

export const logout = () => signOut(auth);

export default signin;
