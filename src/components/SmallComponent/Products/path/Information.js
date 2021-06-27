import { useEffect } from "react";
// CSS
import classNames from "classnames";
// SUPPORT
import { Link } from "react-router-dom";
// CONTEXT
// COMPONENTS
import InputString from "../../../Multi_useComponent/InputString";
import InputDescription from "../../../Multi_useComponent/InputDescription";

const Information = ( props ) => {
    useEffect(()=> {
        console.log("Son")
    },[])
    const { 
            // Data 
            state,
            // FUNCTION
            addImg, 
            changeImg, onChange, 
            SaveEdit , activeAlert,
            // TITLE PAGE
            namePage, nameAddImage,
            nameReplaceImage,
            nameActiveAlert
        } = props
    return (
        <div className={classNames('input-info')}>
            <div className="input">
                <div className="input-title">
                    <h2>{namePage}</h2>
                </div>
                <div className="input-img">
                    <div className="input-file">
                        {/* ADD IMAGE */}
                        <label htmlFor="file-add">
                            <p>{nameAddImage}</p>    
                        </label>
                        <input  id="file-add" type="file" multiple accept="image/"
                            onChange={addImg}
                        />
                        {/* REPLACE IMAGE */}
                        <label htmlFor="file-replace">
                            <p>{nameReplaceImage}</p>    
                        </label>
                        <input  id="file-replace" type="file" accept="image/"
                            onChange={changeImg}
                        />
                    </div>
                </div>
                <div className="input-part">
                    <div className="l1" >
                        <InputString 
                            name="name"
                            onChange={onChange}
                            value={state.name || ""}
                        />
                        <InputString 
                            name="price"
                            onChange={onChange}
                            value={state.price || ""}
                        />
                    </div>
                    <div className="l1" >
                        <InputString 
                            name="quantity"
                            onChange={onChange}
                            value={state.quantity || ""}
                        />
                        <InputString 
                            name="date"
                            onChange={onChange}
                            value={state.date || ""}
                        />
                    </div>
                    <div className="l1" >
                        <InputString 
                            name="design"
                            onChange={onChange}
                            value={state.design || ""}
                        />
                        <InputString 
                            name="made"
                            onChange={onChange}
                            value={state.made || ""}
                        />
                    </div>
                </div>
                <div className="input-description">
                        <InputDescription 
                            name="description"
                            onChange={onChange}
                            value={state.description || ""}
                        />
                </div>
            </div>
            <div className="position-button">
                <div className="box1">
                </div>
                <div className="box2">
                    <div className={classNames('alert-complete', {'active': activeAlert})}>
                        <p>{nameActiveAlert}</p>
                    </div>
                    <div className="button-add">
                        <button onClick={SaveEdit}>
                            <p>SAVE</p>
                        </button>
                    </div>
                    <div className="button-cancel">
                        <button>
                            <Link to="/Storage/">CANCEL</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Information;