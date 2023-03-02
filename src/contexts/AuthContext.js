import React, {createContext, useContext, useEffect, useState} from 'react'
import {auth, db} from '../utils/init-firebase'
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {doc, setDoc} from "firebase/firestore";


const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  manualLogin: () => Promise


})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user ? user : null)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }


  function register(email, password,displayName) {
    return createUserWithEmailAndPassword(auth, email, password,displayName)
        .then(async cred => {
          const usersCollectionRef = doc(db, 'users', cred.user.uid);
          await setDoc(usersCollectionRef, {
            email: email,
            id: cred.user.uid,
            displayName: displayName,
            isAdmin: false,
          });
        })
  }




  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    return signOut(auth)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  function manualLogin(values) {
     const password = "123456"
    return createUserWithEmailAndPassword(auth, values.email, password)
        .then(async cred => {
          const userRef = doc(db, 'users', cred.user.uid);
          await setDoc(userRef, {
            email: values.email,
            id: cred.user.uid,
            displayName: values.displayName,
          })
        })
  }

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    manualLogin,


  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
