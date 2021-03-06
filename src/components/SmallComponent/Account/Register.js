import React, { useState } from "react"
// LOGO 
import phone_call from "../../logo/phone.svg"
import user2 from "../../logo/user2.svg"
// ROUTER
import { Link, withRouter , useHistory } from "react-router-dom"
// FIREBASE 
import firebase from '../../../firebase/firebase'
import InputEmail from "../../Multi_useComponent/InputEmail"
import InputName from "../../Multi_useComponent/InputName"
import InputPassword from "../../Multi_useComponent/InputPassword"
//================COMPONENT===================//
const Register = ( props ) => {
    const history = useHistory();
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
                                    create_at: +Date.now(),
                                    update_at: +Date.now(),
                                    status: true,
                                    role: 'user',
                                }
                                    userCollection.doc(newUser.id).set(newUser).then(response => {
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
                <div className="user-info">
                    <h3>personal information</h3>
                    <InputName
                        name="name"
                        icon={user2}
                        onChange={onChange}
                        value={name}
                    />
                    <InputName 
                        name="phone"
                        icon={phone_call}
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
export default withRouter(Register);