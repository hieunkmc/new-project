import React , { useState, useContext } from "react";
import auth from "../../ProtectRoutes/auth"
import admin from "../../ProtectRoutes/admin"
// ROUTER
import { Link } from "react-router-dom";
// FIREBASE 
import firebase from '../../../firebase/firebase'
// CONTEXT
import { UserContext } from "../../../context/UserContext";
import { useEffect } from "react";
// COMPONENT
import InputPassword from "../../Multi_useComponent/InputPassword";
import InputEmail from "../../Multi_useComponent/InputEmail";
// LOGO
import logo_authentication from "../../logo/logo.png"
//================COMPONENT===================//
const Authentication = ( props ) => {
    const { ChangeStateLog } = useContext(UserContext);
    const [ saveUser , setSaveUser ]   = useState(false)
    const [ user , setUser]   = useState({
        email: '',
        password: '',
    })
    const ComfirmLogIn = async () => {
        const { email , password } = user
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then( response => {
                    const adminId = "4aPienVKCXh3MgJAnlOrk4Y9P463"
                    const uid = response.user.uid
                    if ( response.operationType === "signIn" ) {
                        const name = 'userId';
                        const valueId = uid
                        document.cookie= name + '=' + valueId
                        if ( uid !== adminId ) {
                            auth.login(() => {
                                ChangeStateLog(uid,"user")
                                props.history.push("/")
                            })
                        }
                        else {
                            admin.login(() => {
                                ChangeStateLog(uid,"admin")
                                props.history.push("/")
                            })
                        }
                    }
                }
                )
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(saveUser)
    },[saveUser])
    const onChange = (event) => {
        const value = event.target.value
            setUser({
                ...user, 
                [event.target.name] : value
            })
    }
    const { email , password } = user
    return (
        <div className="Authentication">
            <div className="content">
                <div className="content-theme-logo">
                    <img alt="logo_authentication" src= {logo_authentication} />
                    <p>Welcome To Authentication!</p>
                </div>
                <div className="user-info login">
                    <InputEmail 
                        name="email"
                        onChange={onChange}
                        value={email}
                    />
                    <InputPassword 
                        name="password"
                        onChange={onChange}
                        value={password}
                    />
                </div>
                <div className="flex-l1">
                    <div className="sl1">
                        <input type="checkbox" id="confirm" onClick={() => setSaveUser(!saveUser)}/>
                        <p>Remember</p>
                    </div>
                    <div className="sl2">
                        <Link to="/forgot">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
                <div className="button" onClick={() => ComfirmLogIn()}> 
                    <p>SIGN IN</p>
                </div>
                <div className="flex-l2">
                    <p>Not a member yet?
                        <Link className="link" to="/authentication/register">
                            Register Now
                        </Link>
                    </p>
                </div>
                <div className="cancel"> 
                    <Link to="/">
                        Cancel Authentication
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Authentication;