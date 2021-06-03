import React from 'react'
import { Button } from "@material-ui/core";
import '../styles/Login.css'
import { auth, provider } from '../firebase/firebase';
import { useStateValue } from '../redux/store/StateProvider';
import { actionTypes } from '../redux/reducer/reducer';

function Login() {

    const [{ user }, dispatch] = useStateValue()

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://upload.wikimedia.org/wikipedia"
                    alt=""
                />

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    SignIn With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
