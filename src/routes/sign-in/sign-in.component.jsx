import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopup, signInWithGoogleRedirect ,createUserDocumentFromAuth } from "../../utils/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    useEffect(() => {
        async function data(){
            const response = await getRedirectResult(auth);
            if(response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
        }
        data();
    }},[]);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
        // const userDocRef = await createUserDocumentFromAuth(user);
        //console.log({ user });
    }


    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google Popup
            </button>
            {/*<button onClick={logGoogleRedirectUser}>
                Sign In with Google Redirect
    </button>*/}
            <SignUpForm />
        </div>
    );
}

export default SignIn;