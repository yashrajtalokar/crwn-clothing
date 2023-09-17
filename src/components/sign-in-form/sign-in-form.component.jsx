import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";


import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }   

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            //setCurrentUser(user);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/user-not-found':
                    alert("No existing user with this email!");
                    break;
                case 'auth/wrong-password':
                    alert("Incorrect Password!!!");
                    break;
                default:
                    console.log(error);
            }
        }   
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email" 
                    name="email" 
                    onChange={handleChange} 
                    value={email} 
                    autoComplete="off"
                    required
                />

                <FormInput
                    label="Password"
                    type="password" 
                    name="password" 
                    onChange={handleChange} 
                    value={password} 
                    required
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;