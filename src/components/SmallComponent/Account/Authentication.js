import React , { useState, useContext } from "react";
import auth from "../../ProtectRoutes/auth"
import admin from "../../ProtectRoutes/admin"
// ROUTER
import { Link } from "react-router-dom";
// FIREBASE 
import firebase from '../../../firebase/firebase'
import InputCreateUser from "../../Multi_useComponent/InputCreateUser";
// CONTEXT
import { UserContext } from "../../../context/UserContext";
//================COMPONENT===================//
const Authentication = ( props ) => {
    const { ChangeStateLog, setIdUser } = useContext(UserContext);
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
                        if ( uid !== adminId ) {
                            console.log('user' , auth)
                            auth.login(() => {
                                const name = 'userId';
                                const valueId = uid
                                document.cookie= name + '=' + valueId
                                setIdUser(uid)
                                ChangeStateLog("Success")
                                props.history.push("/")
                            })
                        }
                        else {
                            console.log('admin' , admin)
                            admin.login(() => {
                                const name = 'userId';
                                const valueId = uid
                                document.cookie= name + '=' + valueId
                                setIdUser(uid)
                                ChangeStateLog("Success")
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
                <div className="user-info login">
                    <InputCreateUser 
                        name="email"
                        onChange={onChange}
                        value={email}
                    />
                    <InputCreateUser 
                        name="password"
                        onChange={onChange}
                        value={password}
                    />
                </div>
                <div className="flex-l1">
                    <div className="sl1">
                        <input type="checkbox" id="confirm" />
                        <p>Remember</p>
                    </div>
                    <div className="sl2">
                        <p>Forgot Password</p>
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
            </div>
        </div>
    )
}
export default Authentication;