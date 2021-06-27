import user2 from "../logo/user2.svg"
const InputEmail = (props) => {
    const { name , onChange, value} = props;
        return (
            <div id="input">
                <img className="icon" alt="input email" src={user2}
                />
                <input className="info" type="email"
                    name= {name}
                    placeholder="email@gmail.com"
                    autoComplete="off"
                    onChange= {onChange}
                    value = {value || ""} 
                />
            </div>
        );
}
export default InputEmail;