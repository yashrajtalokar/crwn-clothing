import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log("error creating the user",error.message);
        }
    }

    return userDocRef;
}
