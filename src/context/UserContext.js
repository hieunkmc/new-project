import React, { useState } from 'react';
import { useEffect } from 'react';
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
                setIdUser(valueId)
            }
            ChangeStateLog('Success')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const ChangeStateLog = (report) => {
        const { Success } = StateLog
        if ( report === 'Success') {
            if ( document.cookie ) {
                console.log(report)
                setStateLog(state => ({
                    ...state,
                    Success : !Success
                    })
                )
            }
        }
        if ( report === 'Logout') {
            console.log(report)
            setStateLog(state => ({
                ...state,
                Success : !Success
                })
            )
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

