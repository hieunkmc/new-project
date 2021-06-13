import React, {Component} from "react"
class InputDescription extends Component {
    render() {
        const { name , onChange, value } = this.props;
            return (
                <div className="string">
                    <p>{name}</p>
                    <textarea type="text"
                        name={name}
                        placeholder="Add a new name"
                        onChange = {onChange}
                        value = {value}>
                    </textarea>
                </div>
            );
    }
}
export default InputDescription;