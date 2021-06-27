const InputName = (props) => {
    const { name , onChange, value, icon } = props;
        return (
            <div id="input">
                {
                    name === "name"
                    ?
                    <div>
                        <img className="icon" alt="input name" src={icon} />
                        <input className="info" type="text"
                            name= {name}
                            placeholder={`${name}@example`}
                            autoComplete="off"
                            onChange= {onChange}
                            value = {value || ""} 
                        />
                    </div>
                    :
                    <div>
                        <img className="icon" alt="input email" src={icon} />
                        <input className="info" type="text"
                            name= {name}
                            placeholder={name}
                            autoComplete="off"
                            onChange= {onChange}
                            value = {value || ""} 
                        />
                    </div>
                }
            </div>
        );
}
export default InputName;