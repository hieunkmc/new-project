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
    const AddToCart = (item) =>  {
        if ( Item.length === 0 ) {
            console.log(item)
            setItem(prevState => [...prevState ,item])
        }
        if ( Item.length >= 1 ){
            // console.log( Item)
            // console.log(item.id);
            let find_similar_Id = Item.find(x => x.id === item.id)
            console.log(find_similar_Id);
            // if ( find_similar_Id === -1 ) {
            //     const newArray = Item.concat(item)
            //     setItem(newArray)
            // }
            // else {
            //     const index = find_similar_Id
            //     console.log(index)
            // }
        }
    }
    return(
        <CartContext.Provider value={{
                // FROM ---- <STORAGE> TO <EDIT PRODUCT>
                Index: Index,
                GiveIndex: ChangeIndex,
                Item: Item,
                AddItemToCart: AddToCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
