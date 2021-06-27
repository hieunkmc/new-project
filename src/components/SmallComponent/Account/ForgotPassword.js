import { useState } from "react";
import InputCreateUser from "../../Multi_useComponent/InputName";

const ForgotPassword = ( props ) => {
    const [ reset , setReset ] = useState({
        email: ""
    })
    const onChange = (event) => {
        const value = event.target.value
        setReset({...reset , email: value})
    }
    const { email } = reset
    return (
        <div className="ForgotPassword">
            <div className="content">
            <div className="user-info login">
                    <InputCreateUser 
                        name="email"
                        onChange={onChange}
                        value={email}
                    />
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword;