import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }   

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords don't match!");
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error){
            if(error.code === 'auth/email-already-in-use') {
                alert("Email already in use!!");
            }else{
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
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    name="displayName" 
                    onChange={handleChange} 
                    value={displayName}
                    autoComplete="off"
                    required
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password" 
                    name="confirmPassword" 
                    onChange={handleChange} 
                    value={confirmPassword} 
                    required
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;