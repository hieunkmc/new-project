import React, {Component} from "react"
class InputString extends Component {
    render() {
        const { name, onChange, value } = this.props;
            return (
                <div className="string">
                    <p>{name}</p>
                    { name === 'date' ? 
                        <input className="inputDate" 
                            type="date"
                            name={name}
                            placeholder="Add a new name"
                            onChange = {onChange}
                            value = {value}
                            >
                        </input>
                        :
                        <input type="text"
                            name={name}
                            placeholder="Add a new name"
                            onChange = {onChange}
                            value = {value}>
                        </input>
                    }
                </div>
            );
    }
}
export default InputString;