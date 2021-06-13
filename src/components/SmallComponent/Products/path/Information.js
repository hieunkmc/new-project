import React from "react";
// CSS
import { CartContext } from "../../../../context/CartContext";
// COMPONENTS
import InputString from "../../../Multi_useComponent/InputString";
import InputDescription from "../../../Multi_useComponent/InputDescription";
import classNames from "classnames";

function Information ( props ) {
const { 
        // Data 
        state,
        // FUNCTION 
        addImg, onChange, SaveEdit , activeAlert,
        // TITLE PAGE
        namePage, nameAddImage,
        nameActiveAlert
    } = props
return (
    <CartContext.Consumer>
        {({ ActiveMode , previewMode}) =>
            !previewMode.afterActive ?
                <>
                    <div className={classNames(
                                        'input-info' , 
                                        {'beforeActive': previewMode.beforeActive}
                                    )}>
                        <div className="input">
                            <div className="input-title">
                                <h2>{namePage}</h2>
                            </div>
                            <div className="input-img">
                                <div className="input-file">
                                    <label htmlFor="file">
                                        <p>{nameAddImage}</p>    
                                    </label>
                                    <input  id="file" type="file" multiple accept="image/"
                                        onChange={addImg}
                                    />
                                    <label htmlFor="file">
                                        <p>GIF IMAGE</p>    
                                    </label>
                                    <input  id="file" type="file" accept="image/"
                                        onChange={addImg}
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
                                <div className={classNames('standard')}>
                                    {   state.url.length > 0 &&
                                        <p 
                                            onClick={() => ActiveMode()}  
                                        >   
                                            Preview Product &gt;
                                        </p>
                                    }
                                </div>
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
                                        <a href="/Storage/">CANCEL</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={classNames(
                                        'input-info' , 
                                        {'beforeActive': previewMode.beforeActive}
                                    )}>
                        <div className="position-button">
                            <div className="box1">
                                <div className={classNames('standard')}>
                                    <p 
                                        onClick={() => ActiveMode()} 
                                    >
                                        Cancel Preview Product
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        }
    </CartContext.Consumer>
    )
}
export default Information;