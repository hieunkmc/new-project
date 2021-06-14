import React, {useContext, useEffect, useState} from "react";
// CONTEXT
import { UserContext } from "../../../../context/UserContext";
// ROUTER
import { Link , withRouter } from "react-router-dom";
import auth from "../../../ProtectRoutes/auth";
// import admin from "../../../ProtectRoutes/admin";
// FIREBASE
import firebase from "../../../../firebase/firebase"
import admin from "../../../ProtectRoutes/admin";
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
        }
        else {
            const ref = firebase.firestore().collection('admin')
            const res = await ref
                    .where('id', '==' , uid)
                    .get()
                    res.docs.forEach((doc) => {
                        setDataUser(doc.data())
                    })
        }
    }
    const { name , url } = dataUser
    return (
        <div className="navbar">
            <div className="Header-navbar">
                <div className="user">
                    {
                        idUser !== "4aPienVKCXh3MgJAnlOrk4Y9P463" ?
                            <Link to={`/user/${idUser}`}>
                                <img alt="icon"/>
                            </Link>
                            :
                            <Link to="/admin/4aPienVKCXh3MgJAnlOrk4Y9P463">
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
                {
                    idUser !== "4aPienVKCXh3MgJAnlOrk4Y9P463" ?
                        <button onClick={() => auth.logout(() => {
                            ChangeStateLog(idUser,"Logout")
                            props.history.push("/")
                        })}>
                            log out
                        </button>
                    :
                        <button onClick={() => admin.logout(() => {
                            ChangeStateLog(idUser,"Logout")
                            props.history.push("/")
                        })}>
                            log out
                        </button>
                }
            </div>
        </div>
    )
}
export default withRouter(Login);