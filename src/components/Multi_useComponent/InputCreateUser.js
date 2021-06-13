import React, {Component} from "react"
class InputCreateUser extends Component {
    render() {
        const { name , onChange, value,} = this.props;
            return (
                <div className="input">
                    { name === 'name' ?
                        <input className="info" type="text"
                            name={name}
                            placeholder="name@example"
                            autoComplete="off"
                            onChange= {onChange}
                            value = {value} 
                        />
                        :
                        <input className="info" type="text"
                            name={name}
                            placeholder={name}
                            autoComplete="off"
                            onChange= {onChange}
                            value = {value}
                        />
                    }
                </div>
            );
    }
}
export default InputCreateUser;