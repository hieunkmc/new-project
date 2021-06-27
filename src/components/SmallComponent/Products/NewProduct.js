import React , { useState } from "react"
// FIREBASE 
import firebase from '../../../firebase/firebase'
// import { storage } from '../firebase/firebase'
// SMALL COMPONENTS
import Preview from "./path/Preview"
import Information from "./path/Information"
import MenuAdmin from "../../Multi_useComponent/MenuAdmin"
//COMPONENTS
const NewProduct = (props) => {
    // STATE DATA
    const [ state , setState ] = useState(
        {
            name: '',
            price: '',
            quantity: '',
            date: '',
            made: '',
            design: '',
            description: '',
            url:'',
        }
    )
    // ALERT UPDATE COMPLETE
    const [ activeAlert , setActiveAlert ] = useState(false)
    // PREVIEW IMAGE WILL CHANGE 
    const [ img , setImg ] = useState([])
    // COMPLETE ADD PRODUCT
    var array = []
    function getDownloadURL(file) {
        return new Promise( resolve => {
            const storage = firebase.storage()
            storage.ref(`images/${file.name}`).put(file).on(
            'STATE_CHANGED',
            snapshot => {},
            error => {
            console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => resolve(url))
            }
            )
        })
    }
    function combineURL (url,max) {
        return new Promise(resolve => {
            array.push(url)
            if ( array.length === max ) {
                console.log( "that the last" , array )
                resolve(array)
            }
            else { resolve(null) }
        })
    }
    function upLoad (data) {
        return new Promise(resolve => {
            const db = firebase.firestore()
            const ref = db.collection('products')
            const newItem = {
                id: Math.random().toString(15).substring(7), 
                name: state.name,
                price: state.price,
                quantity: +state.quantity,
                date: state.date,
                made: state.made,
                design: state.design,
                description: state.description,
                create_at: +Date.now(),
                url : data
            }
            ref.doc(newItem.id).set(newItem).then(setActiveAlert(!activeAlert))
            resolve()
        })
    }
    async function createNewProduct(file,image) {
        const function1 = await getDownloadURL(file)
        const function2 = await combineURL(function1,image.length)
        if ( function2 !== null ) {
            const function3 = await upLoad(function2)
            return [ function3 ]
        }
        return [ function1, function2 ]
    }
    async function Add() {
        for ( const file of img) {
            await createNewProduct(file,img)
        }
        await totalProduct()
    }
    // ADD IMAGE TO PREVIEW
    async function AddImage (event) {
        // ADD MULTI
        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file))
            const fileUpload = Array.from(event.target.files)
                setImg (fileUpload)
                setState({
                    ...state, 
                    url: fileArray
                })
        }
    }
    // CHANGE CONTENT --- INPUT STRING , INPUT DESCRIPTION
    function onChange (event) {
        const value = event.target.value
            setState({ 
                ...state, 
                [event.target.name] : value
            })
    }
    const totalProduct = async () => {
        const previousValue = []
        const ref = firebase.firestore().collection('products')
        const res = await ref.orderBy('value').get()
            res.docs.map((doc) => previousValue.push(doc.data()))
            ref.doc('total_product').update({ value: +previousValue[0].value + 1 })
    }
    // COMPONENT
    return (
        <div className="New-Product"> 
            <MenuAdmin />
            {/* PREVIEW PRODUCT */}
            <Preview
                state={state}
            />
            {/* INPUT INFORMATION PRODUCT --- FLEX */}
            <Information
                // TITLE PAGE
                namePage = {'NEW PRODUCT'}
                nameAddImage = {'ADD IMAGE'}
                nameActiveAlert = {'Product was add'}
                // ONCHANGE VALUE
                addImg= {(event) => AddImage(event)}
                onChange= {(event) => onChange(event)}
                state= {state}
                // COMPLETE ADD
                SaveEdit = {() => Add()}
                activeAlert = {activeAlert}
            />
        </div>
    )
}
export default NewProduct;