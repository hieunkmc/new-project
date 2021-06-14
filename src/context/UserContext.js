import React, { useState } from 'react';
import { useEffect } from 'react';
import admin from '../components/ProtectRoutes/admin';
import auth from '../components/ProtectRoutes/auth';
export const UserContext = React.createContext();
const UserProvider = (props) => {
    const [ StateLog, setStateLog ] = useState({
        Success : false,
        Denied : false,
    })
    const [ idUser , setIdUser ] = useState({})
    useEffect(() => {
        if ( document.cookie ) {
            const allcookie = document.cookie
            const cookiearray = allcookie.split(';')
            for( let i = 0; i < cookiearray.length; i++) {
                const valueId = cookiearray[i].split('=')[1];
                if ( valueId !== "4aPienVKCXh3MgJAnlOrk4Y9P463" ) {
                    ChangeStateLog(valueId,"user")
                }
                else {
                    ChangeStateLog(valueId,"admin")
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const ChangeStateLog = (uid,role) => {
        const { Success } = StateLog
        if ( role === "user" ) {
            auth.login(() => {
                setIdUser(uid)
                setStateLog({...StateLog , Success: !Success})
            })
        }
        if ( role === "admin" ) {
            admin.login(() => {
                setIdUser(uid)
                setStateLog({...StateLog , Success: !Success})
            })
        }
        if (role === "Logout") {
            setStateLog({...StateLog , Success: !Success})
            document.cookie.split(";").forEach
                (function(c) { document.cookie = c.replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                });
        }
    }
    const { Success , Denied } = StateLog
    return(
        <UserContext.Provider value={{
                LogInSuccess: Success,
                LogInDenied: Denied,
                ChangeStateLog: ChangeStateLog,
                idUser: idUser,
                setIdUser: setIdUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
export default UserProvider

