import React, { useState } from 'react';
// import instances from '../firebase/instances';s
export const CartContext = React.createContext();

export default function NumberProvider (props) {
    // FROM ---- <STORAGE> TO <EDIT PRODUCT>
    const [ Index , setIndex ]  = useState();
    const [ Item , setItem ] = useState([]);
    const ChangeIndex = (item,index) =>  {
        setIndex(index)
        setItem([item])
    }
    // FROM <INFORMATION> active "reviewMode" 
    const [ previewMode , setPreviewMode ] = useState(
        { 
            beforeActive: false,
            afterActive: false,
        }
    )
    const ActiveMode = () =>  {
        setTimeout(() => {
            setPreviewMode({
                ...previewMode , beforeActive : !previewMode.beforeActive
            })
        }, 0);
        setTimeout(() => {
            setPreviewMode({
                ...previewMode , afterActive : !previewMode.afterActive
            })
        }, 1100);
    }
    return(
        <CartContext.Provider value={{
                // FROM ---- <STORAGE> TO <EDIT PRODUCT>
                Index: Index,
                GiveIndex: ChangeIndex,
                Item: Item,
                // FROM <INFORMATION> active "previewMode" 
                previewMode : previewMode,
                ActiveMode: ActiveMode,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
