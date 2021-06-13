import React , { useState, useEffect } from "react";
// CSS
import firebase from '../../../firebase/firebase'
//COMPONENTS
import HeaderStorage from "./path/HeaderStorage";
import ItemStorage from "./path/ItemStorage";
import FilterStorage from "./path/FilterStorage";
import PaginationStorage from "./path/PaginationStorage";
import Menu from "../../Multi_useComponent/MenuUser";
import Cart from "../Cart/Cart"
// ------------------------------------------ //
const Storage = () => {
    const [Products, setProducts] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(1);
    const [totalProduct, setTotalProduct ] = useState([])
    const [SearchProduct, setSearchProduct] = useState();
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('ItemInPage'))
        const localTotalPage = JSON.parse(localStorage.getItem('TotalPage'))
        const localCurrentPage = JSON.parse(localStorage.getItem('CurrentPage'))
            if ( localData ) {
                setProducts(localData)
                setTotalProduct(localTotalPage)
                setCurrentPage(localCurrentPage)
            }
            else {
                LoadData()
                LoadTotalProduct()
            }
             // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const LoadData = async () => {
        const ref = firebase.firestore().collection('products')
        const res = await ref.orderBy('create_at' , 'desc').limit(5).get()
        const arr = []
            res.docs.forEach((doc) => {
                arr.push(doc.data())
            })
            setProducts(arr)
            localStorage.setItem('ItemInPage', JSON.stringify(arr));
    }
    const LoadByCurrentPage = async (newCurrentPage) => {
        const ref = firebase.firestore().collection('products')
        const item_in_page = 5
        const navigate_index = newCurrentPage*5
        if ( newCurrentPage !== CurrentPage ) {
            setCurrentPage(newCurrentPage)
            const arr = []
            const get_all_item  = await ref.orderBy('create_at' , 'desc').get()
            const navigate_item = get_all_item
                    .docs[navigate_index-item_in_page]
                    .data().create_at
            const res = await ref
                    .orderBy('create_at' , 'desc')
                    .limit(item_in_page).startAt(navigate_item).get()
                    res.docs.forEach((doc) => {
                        arr.push(doc.data())
                    })
                    setProducts(arr)
                    localStorage.setItem('ItemInPage', JSON.stringify(arr));
                    localStorage.setItem('CurrentPage', JSON.stringify(newCurrentPage));
            return null
        }
    }
    const ChangeCurrentPage = (number) => {
        if ( number === 'next' ) {
                CurrentPage !== totalProduct.length 
                    && LoadByCurrentPage(CurrentPage +1)
                return null
        }
        if ( number === 'back') {
                CurrentPage !== 1
                    && LoadByCurrentPage(CurrentPage -1)
                return null
        }
        else {
            LoadByCurrentPage(number)
        }
    }
    const Delete = async (item) => {
        const ref = firebase.firestore().collection('products')
            await ref.doc(item.id).delete()
        const res = await ref.orderBy('value').get()
            await res.docs.map((doc) => 
                ref.doc('total_product').update({ value: +doc.data.val().value - 1 })
            )
        LoadData()
    }
    const LoadTotalProduct = async () => {
        const ref = firebase.firestore().collection('products')
        const res = await ref.orderBy('value').get()
            res.docs.forEach((response) => {
            const array = []
            const maxPage = (Math.ceil((response.data().value)/5))
                for (let page = 1 ; page < maxPage + 1 ; page++ ) {
                    array.push(page)
                }
            setTotalProduct(array)
            localStorage.setItem('TotalPage', JSON.stringify(array));
        }) 
    }
    const onChange = (event) => {
        setSearchProduct(event.target.value)
    }
    const onKeyUp = async ( event ) => {
        event.preventDefault()
        if ( event.keyCode === 13 ) {
            const ref = firebase.firestore().collection('products')
            const res = await ref
            .where('name', '==' , SearchProduct ) 
            .get()
            res.docs.forEach((doc) => {
                console.log(doc.data())
            })
        } 
    }
    return(
        <div className="Storage">
            <Menu />
            <div id="content-container">
                <Cart />
                <div className="container">
                    <FilterStorage 
                        value = {SearchProduct}
                        onChange={(event) => onChange(event)}
                        onKeyUp= {onKeyUp}
                    />
                    <div className="listItem">
                        <HeaderStorage />
                        { Products.map((item) => 
                            <ItemStorage key={item.id} data={item} clear={(item) => Delete(item)}/>
                        )}
                    </div>
                    <PaginationStorage 
                        CurrentPage ={CurrentPage}
                        ChangeCurrentPage={(number) => ChangeCurrentPage(number)}
                        totalProduct={totalProduct}
                    />
                </div>
            </div>
        </div>
    )
}
export default Storage;