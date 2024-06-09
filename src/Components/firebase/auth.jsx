import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = (auth, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (auth, email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = (auth) => {
  return signOut(auth);
};
