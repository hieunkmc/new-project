//COMPONENTS
import { useState, useEffect } from "react";
// SUPPORT
import classNames from "classnames";
// CONTEXT
import auth from "../../ProtectRoutes/auth";
import { CartContext } from "../../../context/CartContext";
// LOGO
import logo_cart from "../../logo/cart.svg"
import { useContext } from "react";
// ------------------------------------------ //
const ItemSlider = (props) => {
    const { data, pagination, changeItem, currentItem } = props
    const { AddItemToCart } = useContext(CartContext)
    // STATE
    const [ currentImg, setCurrentImg ] = useState()
    const [ description, setDescription ] = useState([])
    const [ activeMainImg , setActiveMainImg ] = useState(false)
    // ALERT
    const [ productAdd,setProductAdd ] = useState(false)
    useEffect(()=> {
        if ( data !== undefined ) {
            setCurrentImg(0)
            ConvertText()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])
    const ChangeCurrentImg = (index) => {
        setCurrentImg(index)
        setActiveMainImg(!activeMainImg)
    }
    const ConvertText = () => {
        const text = data.description
        let dot = 0
        let array = []
        for ( let i= 0 ; i < text.length ; i++ ) {
            if ( text[i] === "." ) {
                array.push(text.split(".")[dot])
                dot = dot + 1
            }
        }
        setDescription(array)
    }
    const ADD_TO_CART = (data) => {
        setProductAdd(true)
        setTimeout(() => {
            AddItemToCart(data)
            setProductAdd(false)
        }, 1500);
    }
    return (
        <div className="flex-item">
            { data !== undefined && 
            <>
                <div className="Item">
                    <div className="view-content">
                        <div className="main-content">
                            <div className="mobile-main-content">
                                <h2 className="mobile name">{data.name}</h2>
                                <p className="mobile type">{data.design}<span> / </span>FASHION WEEK SHOW</p>
                            </div>
                            <div className="main-flex-item">
                                <div className="main-flex-item-work">
                                    <div className="active-cart">
                                        <div className="active-cart-description">  
                                            {
                                                description.map((item,index) => 
                                                    <p key={index}>{item}</p>
                                                )
                                            }
                                        </div>
                                        <div className="active-cart-btn-action">
                                            <p className="active-cart-btn-price">{data.price}</p>
                                            {
                                                auth.authenticated === true ?
                                                    <div onClick={() => ADD_TO_CART(data)}>
                                                        <img 
                                                            alt="active-cart-btn" 
                                                            src={logo_cart}
                                                        />
                                                    </div>
                                                :
                                                    <p className="active-cart-success">You need login as "User" to buy product</p>
                                            }
                                        </div>
                                        {
                                           productAdd === true && <p className="active-cart-success">Product is had added in your cart</p>
                                        }
                                    </div>
                                    <img 
                                        className={classNames('main-image' , {'active': activeMainImg})}
                                        alt="imageProduct"
                                        src={data.url[currentImg]}   
                                    />
                                </div>
                                <div className="mobile-flex-img">
                                    {data.url.map((item,index) => 
                                        <div className="main-image-preview" key={index}>
                                            {
                                                currentImg === index ? 
                                                    <img
                                                        className="active"
                                                        alt="gif" src={item}
                                                        width= {window.innerHeight*0.05*0.66}
                                                        height= {window.innerHeight*0.05}
                                                        onClick={() => ChangeCurrentImg(index)}
                                                    />
                                                    :
                                                    <img
                                                        alt="gif" src={item}
                                                        width= {window.innerHeight*0.05*0.66}
                                                        height= {window.innerHeight*0.05}
                                                        onClick={() => ChangeCurrentImg(index)}
                                                    /> 
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="main-content-pagination">
                            { pagination.map((item,index) => 
                                <div className="button-switch-item" key={index}>
                                    {   currentItem === index ?
                                        <div className="button active" onClick={() => changeItem(index)} /> 
                                        :
                                        <div className="button" onClick={() => changeItem(index)} />
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-content">
                        <div className="content1">
                            <p className="name">FASHION WEEK SHOW</p>
                            <h3>{data.name}</h3>
                            <p className="name">{data.design}</p>
                            <p className="name price">{data.price}</p>
                            <div className="flex-img">
                                {data.url.map((item,index) => 
                                    <div key={index}>
                                        {
                                            currentImg === index ? 
                                                <img
                                                    className="active"
                                                    alt="gif" src={item}
                                                    width= {window.innerHeight*0.05*0.66}
                                                    height= {window.innerHeight*0.05}
                                                    onClick={() => ChangeCurrentImg(index)}
                                                />
                                                :
                                                <img
                                                    alt="gif" src={item}
                                                    width= {window.innerHeight*0.05*0.66}
                                                    height= {window.innerHeight*0.05}
                                                    onClick={() => ChangeCurrentImg(index)}
                                                /> 
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="content2">
                            <div className="name break">  
                                    {
                                        description.map((item,index) => 
                                            <p key={index}>{item}</p>
                                        )
                                    }
                            </div>
                            <h3 className="name item">{`0${currentItem + 1}`}</h3>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    );
}
export default ItemSlider;
