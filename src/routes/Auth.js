import React, { useState } from "react";
import mybase, { firebaseInstance } from "mybase";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, browserPopupRedirectResolver} from "firebase/auth";
import * as firebase from "firebase/app"
import 'styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";


<script src="https://www.gstatic.com/firebasejs/5.9.1/firebase-auth.js"></script>
const authService = getAuth(mybase)
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const onChange = (event) =>{
        const {target: {name, value}} = event;
        if (name === "email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                data = createUserWithEmailAndPassword(authService, email, password);
            }
            else{
                data = signInWithEmailAndPassword(authService, email,password);
                }
                console.log(data);
        } catch(error){
            setError(error.message);
        }

        
    }
    const toggleAccount = () => setNewAccount((prev)=>!prev);

    const onSocialClick = async(event) =>{
        const {
            target: {name},
        } = event;
        let provider;
        if(name==='google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
        }
        
        else if(name==='facebook'){
            provider = new firebaseInstance.auth.FacebookAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
        }

        const data = await signInWithPopup(authService, provider, browserPopupRedirectResolver);
        console.log(data);
    };
return(
    <div className="authContainer">
        <FontAwesomeIcon icon={faTwitter} color="#04AAFF" size="3x" style={{marginBottom: 30}} />
        <form onSubmit={onSubmit} className="container" >
            <input name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            className="authInput"
            />

            <input name = "password" type="password" placeholder="Password" required
            value={password} onChange={onChange} className="authInput"/>
            <input type="submit" value={newAccount? "Create Account": "Log In"} className="authInput authSubmit"/>
            {error && <span className="autherror">{error}</span>}
        </form>
        
        <span onClick = {toggleAccount} className="authSwitch">
            {newAccount ? "Log In" : "Create Account"}
        </span>

        <div className="authBtns">
            <button name="google" onClick={onSocialClick} className="authBtn" >
                Continue with Google <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button name="facebook" onClick={onSocialClick} className="authBtn" >
                Continue with Facebook <FontAwesomeIcon icon={faFacebook} />
            </button>
        </div>
    </div>
    );
};
export default Auth;
