import React, { useState , useEffect} from "react";
// ROUTER
// import avatar from "../logo/avatar.jpg"
// import { Link } from "react-router-dom";
// import {UserContext} from "../../context/UserContext"
// FIREBASE 
import firebase from '../../../firebase/firebase'
//COMPONENTS
import HeaderStorage from "../Storage/path/HeaderStorage";
import Item from "../Storage/path/ItemStorage";
import FilterStorage from "../Storage/path/FilterStorage";
import PaginationStorage from "../Storage/path/PaginationStorage";
import Menu from "../../Multi_useComponent/MenuUser";
// import Menu from "./User/Menu";
//================COMPONENT===================//
function Customers( props ) {
    const [users, setUsers] = useState([]);
    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [totalUser, setTotalUser ] = useState([])
    const [searchUser, setSearchUser] = useState();
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('UsersInPage'))
        const localTotalPage = JSON.parse(localStorage.getItem('TotalPageUser'))
        const localCurrentPage = JSON.parse(localStorage.getItem('CurrentPageUser'))
            if ( localData ) {
                setUsers(localData)
                setTotalUser(localTotalPage)
                setCurrentPageUser(localCurrentPage)
            }
            else {
                LoadData()
                LoadTotalProduct()
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const LoadData = async () => {
        const ref = await firebase.firestore().collection('users')
        const res = await ref.orderBy('create_at' , 'desc').limit(5).get()
        const arr = []
            res.docs.forEach((doc) => {
                arr.push(doc.data())
            })
            setUsers(arr)
            localStorage.setItem('UsersInPage', JSON.stringify(arr));
    }
    const LoadByCurrentPage = async (newCurrentPage) => {
        const ref = firebase.firestore().collection('users')
        const item_in_page = 5
        const navigate_index = newCurrentPage*5
        if ( newCurrentPage !== currentPageUser ) {
            setCurrentPageUser(newCurrentPage)
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
                    setUsers(arr)
                    localStorage.setItem('UsersInPage', JSON.stringify(arr));
                    localStorage.setItem('CurrentPageUser', JSON.stringify(newCurrentPage));
            return null
        }
    }
    const ChangeCurrentPage = (number) => {
        if ( number === 'next' ) {
            currentPageUser !== totalUser.length 
                    && LoadByCurrentPage(currentPageUser +1)
                return null
        }
        if ( number === 'back') {
            currentPageUser !== 1
                    && LoadByCurrentPage(currentPageUser -1)
                return null
        }
        else {
            LoadByCurrentPage(number)
        }
    }
    const Delete = async (item) => {
        const ref = firebase.firestore().collection('users')
            await ref.doc(item.id).delete()
        const res = await ref.orderBy('value').get()
            await res.docs.map((doc) =>
                ref.doc('total_user').update({ value: +doc.data.val().value - 1 })
            )
        LoadData()
    }
    const LoadTotalProduct = async () => {
        const ref = firebase.firestore().collection('users')
        const res = await ref.orderBy('value').get()
            res.docs.forEach((response) => {
            const array = []
            const maxPage = (Math.ceil((response.data().value)/5))
                for (let page = 1 ; page < maxPage + 1 ; page++ ) {
                    array.push(page)
                }
            setTotalUser(array)
            localStorage.setItem('TotalPageUser', JSON.stringify(array));
        }) 
    }
    const onChange = (event) => {
        setSearchUser(event.target.value)
    }
    const onKeyUp = async ( event ) => {
        event.preventDefault()
        if ( event.keyCode === 13 ) {
            const ref = firebase.firestore().collection('users')
            const res = await ref
            .where('name', '==' , searchUser ) 
            .get()
            res.docs.forEach((doc) => {
                console.log(doc.data())
            })
        } 
    }
    return (
        <div className="Customers">
        <Menu />
        <div id="content-container">
            <div className="container">
                <FilterStorage 
                    value = {searchUser}
                    onChange={(event) => onChange(event)}
                    onKeyUp= {onKeyUp}
                />
                
                <div className="listItem">
                    <HeaderStorage />
                    { users.map((item) =>
                        <Item key={item.id} data={item} clear={(item) => Delete(item)}/>
                    )}
                </div>
                <PaginationStorage 
                    CurrentPage ={currentPageUser}
                    ChangeCurrentPage={(number) => ChangeCurrentPage(number)}
                    totalProduct={totalUser}
                />
            </div>
        </div>
        </div>
    )
}
export default Customers;