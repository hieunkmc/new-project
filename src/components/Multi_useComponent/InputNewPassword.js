import { useState } from "react"
import pen from "../logo/pen.svg"
import close from "../logo/close.svg"

const InputNewPassword = (props) =>  {
    const [ activeEdit , setActiveEdit ] = useState(false)
    const { name , onChange, value, password } = props;
        return (
            <div className="input password">
                {   activeEdit ?
                        <div>
                            <input className="info password" type="password"
                                name={name}
                                autoComplete="off"
                                onChange= {onChange}
                                value= {password || ""}
                            />
                            <img className="close" alt="close" src={close} 
                                onClick={() => setActiveEdit(!activeEdit)}
                            />
                        </div>
                    :
                        <div>
                            <input className="info password" type="password"
                                disabled
                                name={name}
                                placeholder={name}
                                autoComplete="off"
                                onChange= {onChange}
                                value = { value || ""}
                            />
                            <img className="edit" alt="pen" src={pen} 
                                onClick={() => setActiveEdit(!activeEdit)}
                            />
                        </div>
                }
                

            </div>
        )
}
export default InputNewPassword;