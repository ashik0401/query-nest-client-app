import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth'
import { auth } from '../../firebase.init'
import axios from 'axios'

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            if(currentUser?.email){
                const userData={email:currentUser.email};
                axios.post('https://query-nest-server-side.vercel.app/jwt',userData)
                .then(res=>{
                    console.log('token after jwt',res.data);
                    
                })
                .catch(err=>console.log(err))
            }
            console.log('user in the auth state change',currentUser);
            
        })
        return () => unsubscribe()
    }, [])

    const userInfo = {
        user,
        setUser,
        createUser,
        logIn,
        logOut,
        loading,
        setLoading,
        googleSignIn,
        
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
