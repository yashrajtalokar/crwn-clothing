import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCbkJ5_1WlHPQxJv5lulp0mxxdzyUMoS8o",
    authDomain: "crwn-clothing-db-de3ad.firebaseapp.com",
    projectId: "crwn-clothing-db-de3ad",
    storageBucket: "crwn-clothing-db-de3ad.appspot.com",
    messagingSenderId: "1099294258706",
    appId: "1:1099294258706:web:fb85015159e9a6d78fcacb"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {

    if(!userAuth)
        return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log("error creating the user",error.message);
        }
    }

    return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password)
        return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password)
        return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}