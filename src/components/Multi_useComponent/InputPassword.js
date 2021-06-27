import lock from "../logo/lock.svg"
const InputPassword = (props) => {
    const { name , onChange, value} = props;
        return (
            <div id="input">
                <img className="icon" alt="input email" src={lock}
                />
                <input className="info" type="password"
                    name= {name}
                    placeholder= {name}
                    autoComplete="off"
                    onChange= {onChange}
                    value = {value || ""}
                />
            </div>
        );
}
export default InputPassword;