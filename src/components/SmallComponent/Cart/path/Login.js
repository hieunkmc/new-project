import React, {useContext, useEffect, useState} from "react";
// LOGO
import logo from "../../../logo/logo.png"
// CONTEXT
import { UserContext } from "../../../../context/UserContext";
import { CartContext } from "../../../../context/CartContext";
// ROUTER
import { Link , withRouter } from "react-router-dom";
import auth from "../../../ProtectRoutes/auth";
import admin from "../../../ProtectRoutes/admin";
// FIREBASE
import firebase from "../../../../firebase/firebase"
//COMPONENTS
const Login = (props) => {
    const { idUser , ChangeStateLog } = useContext(UserContext);
    const { Item } = useContext(CartContext);
    const [ dataUser , setDataUser ] = useState({})
    useEffect(() =>{
        LoadDataId(idUser)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                { dataUser.url === "" ?
                                    <img alt="icon" src={logo} />
                                    :
                                    <img alt="icon" src={url} />
                                }
                            </Link>
                            :
                            <Link to="/admin/4aPienVKCXh3MgJAnlOrk4Y9P463">
                                { dataUser.url === "" ?
                                    <img alt="icon" src={logo} />
                                    :
                                    <img alt="icon" src={url} />
                                }
                            </Link>
                    }
                        <p>{name}</p>   
                </div>
                <button>
                    <Link to="/checkout">
                        cart
                    </Link>
                </button>
                {
                    idUser !== "4aPienVKCXh3MgJAnlOrk4Y9P463" ?
                        <button onClick={() => auth.logout(() => {
                            ChangeStateLog(idUser,"Logout")
                            props.history.push("/")
                        })}>
                            logout
                        </button>
                    :
                        <button onClick={() => admin.logout(() => {
                            ChangeStateLog(idUser,"Logout")
                            props.history.push("/")
                        })}>
                            logout
                        </button>
                }

            </div>
        </div>
    )
}
export default withRouter(Login);