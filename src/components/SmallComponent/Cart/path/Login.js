import React, {useContext, useEffect, useState} from "react";
// CONTEXT
import { UserContext } from "../../../../context/UserContext";
// ROUTER
import { Link , withRouter } from "react-router-dom";
import auth from "../../../ProtectRoutes/auth";
import admin from "../../../ProtectRoutes/admin";
// FIREBASE
import firebase from "../../../../firebase/firebase"
//COMPONENTS
const Login = (props) => {
    const { idUser , ChangeStateLog } = useContext(UserContext);
    const [ dataUser , setDataUser ] = useState({})
    useEffect(() =>{
        LoadDataId(idUser)
    },[idUser])
    const LoadDataId = async (uid) => {
        if ( uid !== "4aPienVKCXh3MgJAnlOrk4Y9P463") {
            const ref = firebase.firestore().collection('users')
            const res = await ref
                    .where('id', '==' , uid)
                    .get()
            res.docs.forEach((doc) => {
                setDataUser(doc.data())
            })
            auth.login(() => console.log('user active'))
        }
        else {
            const ref = firebase.firestore().collection('admin')
            const res = await ref
                    .where('id', '==' , uid)
                    .get()
            res.docs.forEach((doc) => {
                setDataUser(doc.data())
            })
            admin.login(() =>  console.log('admin active'))
        }
    }
    const { name , url } = dataUser
    return (
        <div className="navbar">
            <div className="Header-navbar">
                <div className="user">
                    {
                        idUser !== "4aPienVKCXh3MgJAnlOrk4Y9P463" ?
                            <Link to="/profile=user/idUser">
                                <img alt="icon"/>
                            </Link>
                            :
                            <Link to="/profile=admin/:4aPienVKCXh3MgJAnlOrk4Y9P463">
                                <img alt="icon"/>
                            </Link>
                        // !url ?
                        // <Link to="/profile">
                        //     <img alt="icon"/>
                        // </Link>
                        // :
                        // <Link to="/profile">
                        //     <img alt="icon" src={url}/>
                        // </Link> 
                    }
                    <p>{name}</p>   
                </div>
                <Link to="/checkout" >
                    cart
                </Link>
                <button onClick={() => auth.logout(() => {
                    ChangeStateLog("Logout")
                    props.history.push("/")
                })}>
                    Log out
                </button>
            </div>
        </div>
    )
}
export default withRouter(Login);