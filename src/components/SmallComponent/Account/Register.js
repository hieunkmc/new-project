import React, { useState, useContext } from "react";
// ROUTER
import { Link, useHistory } from "react-router-dom";
// import {UserContext} from "../../context/UserContext"
// FIREBASE 
import firebase from '../../../firebase/firebase'
import InputCreateUser from "../../Multi_useComponent/InputCreateUser";
//================COMPONENT===================//
function Register( props ) {
    const history = useHistory();
    // const { ChangeStateLogIn } = useContext(UserContext)
    const [ user , setUser] = useState(
        {
            email: '',
            password: '',
            phone:'',
            name: ''
        }
    )
    const CreateNewAccount = async () => {
        const { email, password, phone, name } = user
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password).then( response =>
                    {
                        const uid = response.user.uid
                        const res = response.operationType
                            if ( res === 'signIn' ) {
                                const userCollection = firebase.firestore().collection('users')
                                const newUser = {
                                    id: uid,
                                    name: name,
                                    email: email,
                                    password: password,
                                    phone: phone,
                                    create_At: + Date.now(),
                                    role: 'user',
                                }
                                userCollection.doc(newUser.id).set(newUser).then( response => {
                                    history.push("/")
                                })
                            }
                    }
                )
            } catch(error) {
                console.log(error)
            }
    }
    const onChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setUser({
            ...user,
            [name] : value
        })
    }
    const { email, password, phone, name } = user
    return (
        <div className="Authentication">
            <div className="content">
                <div className="user-info"> 
                    <h3>account information</h3>
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
                <div className="user-info">
                    <h3>personal information</h3>
                    <InputCreateUser 
                        name="name"
                        onChange={onChange}
                        value={name}
                    />
                    <InputCreateUser 
                        name="phone"
                        onChange={onChange}
                        value={phone}
                    />
                </div>
                <div className="button"
                    onClick={() => CreateNewAccount()}
                > 
                    <p>SIGN UP</p>
                </div>
                <div className="cancel"> 
                    <Link to="/authentication">
                        Cancel Register 
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Register;