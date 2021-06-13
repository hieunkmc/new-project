import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { CartContext } from "../../../../context/CartContext";

const  Preview = ( props ) => {
const { state, activeImg, currentImg , IndexCurrentImage } = props;
// ACTIVE CURRENT PAGE 
const [ lastImgOfItem , setLastImgOfItem ] = useState()

useEffect(() => {
    if ( currentImg === undefined ) {
        const max = state.url.length - 1
        setLastImgOfItem(state.url[max])
    }
    else { setLastImgOfItem(currentImg)}
},[currentImg, state])

return (
    <CartContext.Consumer>
        {({previewMode}) => (
            <div className="preview">
                <div className="preview-img">
                    <div className="position-img-change">
                        <div className="each-item">
                            {/* MINI IMAGE */}
                            <div className="mini-img">
                                {   state.url.length > 0 &&
                                    state.url.map((item,index) =>
                                        <button 
                                            type="checkbox"
                                            key={index} 
                                            onClick={() => IndexCurrentImage(index)}
                                        >
                                            <img 
                                                alt="preview" 
                                                width={window.innerHeight*0.05*0.66} 
                                                height={window.innerHeight*0.05}
                                                src={item}
                                            />
                                        </button>
                                )}
                            </div>
                            {   state.url.length > 0 ?
                                    <div className={
                                        classNames('pv-img', 
                                                    {'active': activeImg}
                                        )}
                                    >
                                        <img 
                                            alt="preview" 
                                            width={window.innerHeight*0.6*0.66} 
                                            height={window.innerHeight*0.6}
                                            src={lastImgOfItem}
                                        />
                                    </div>
                                :
                                <div className={classNames('non-img')}>
                                </div>
                            }  
                        </div>
                    </div>
                </div>
            </div>
        )}
    </CartContext.Consumer>
    )
}
export default Preview;