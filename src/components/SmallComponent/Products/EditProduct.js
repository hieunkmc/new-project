import React , { useEffect, useState } from "react";
// CSS
// SUPPORT
import axios from 'axios';
// import { Link } from "react-router-dom";
// FIREBASE 
// SMALL COMPONENTS
import Preview from "./path/Preview";
import Information from "./path/Information";
import Menu from "../../Multi_useComponent/MenuUser";
// ------------------------------------------ //
//COMPONENTS
const EditProduct  = (props) => {
    const { ItemToEdit } = props.location
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
            url:''
        }
    );
    // IMAGE CHOOSE TO VIEW 
    const [ currentImg , setCurrentImg] = useState()
    // INDEX USE FOR UPLOAD
    const [ imgUpLoad , setImgUpLoad ] = useState([]);
    const [ indexForUpLoad , setIndexForUpLoad] = useState()
    const [ activeImg , setActiveImg ] = useState(false);
    // ALERT UPDATE COMPLETE
    const [ activeAlert , setActiveAlert ] = useState(false);
    // GET DATA
    useEffect(() => {
        if ( ItemToEdit ) {
        // ADD ITEM TO LOCAL --- FIRST CONT
            localStorage.setItem('DataToEdit', JSON.stringify(ItemToEdit));
        // GET DATA FROM LOCAL
            setState(ItemToEdit)
        }
        else {
        // GET DATA FROM LOCAL --- REFRESH
            let data = JSON.parse(localStorage.getItem('DataToEdit'));
            setState(data)
        }
    },[ItemToEdit])
    // CHANGE CONTENT --- INPUT STRING , INPUT DESCRIPTION
    function onChange (event) {
        const value = event.target.value
        setState({
            ...state, 
            [event.target.name]: value
        })
    }
    // CHANGE IMAGE --- INFORMATION COMPONENT
    async function ChangeImage (event) {
        // CREATE LOCAL LINK PREVIEW IMAGE
        if (event.target.files) {
            const imgUrl = URL.createObjectURL(event.target.files[0])
            let oldUrl = Object.values(state.url)
            let newUrl = []
            newUrl = [  
                    ...oldUrl.slice(0,indexForUpLoad),
                    imgUrl,
                    ...oldUrl.slice(indexForUpLoad + 1)
                ]
            setState({
                ...state, 
                url: newUrl
            })
            // MAKE NEWEST IMAGE TO PREVIEW --- REPLACE IMAGE PREVIEW BEFORE
            setCurrentImg(imgUrl)
            setActiveImg(!activeImg)
            // ARRAY IMAGE UPLOAD TO PREVIEW
            setImgUpLoad(old => [
                ...old , 
                {
                    fileWillUpload: event.target.files[0],
                    indexOfFile: indexForUpLoad
                }
            ])
        }
    }
    function IndexCurrentImage(index) {
        setIndexForUpLoad(index)
        // SHOW IMAGE CHOOSE TO VIEW PRESENT
        setCurrentImg(state.url[index])
        setActiveImg(!activeImg)
    }
    // SAVE EDIT --- INFORMATION COMPONENT
    async function SaveEdit (imgUpLoad) {
        for ( const file of imgUpLoad) {
            await upLoadImg(file)
        }
    }
    async function upLoadImg(file) {
        const function1 = await getDownloadURL(file)
        const function2 = await combineDownloadURL(function1)
        if ( function2 === null ) {
            const function3 = await pushStateToFirebase(function2) 
            return function3
        }
        return [ function1, function2 ]
    }
    function getDownloadURL(file) {
        // const img = file.fileWillUpload
        // const index = file.indexOfFile
        // return new Promise(resolve => 
        //     storage.ref(`images/${img.name}`).put(img).on(
        //         'STATE_CHANGED',
        //         snapshot => {},
        //         error => {
        //         console.log(error);
        //         },
        //         () => {
        //             storage
        //                 .ref("images")
        //                 .child(img.name)
        //                 .getDownloadURL()
        //                 .then(url => resolve([url,index]))
        //         }
        //     )
        // )
    }
    function combineDownloadURL(getDownloadURL,index) {
        return new Promise(function(resolve,reject) {
            const maxIndex = Math.max(...imgUpLoad.map((index) => index.indexOfFile));
            state.url[index] = getDownloadURL
            if ( index === maxIndex ) {
                resolve(null)
                console.log('step2')
            }
            else { resolve() }
        })
    }
    function pushStateToFirebase() {
        return new Promise(function(resolve,reject) {
            axios.put('https://imageshop-210507-default-rtdb.asia-southeast1.firebasedatabase.app/products/'+ state.id + '.json/', state).then(res => {
                setActiveAlert(true)
                console.log('done')
            })
            resolve()
        })
    }
    return (
        <div className="New-Product">
            <Menu />
            <Preview
                state= {state}
                currentImg = {currentImg}
                activeImg = {activeImg}
                IndexCurrentImage= {(index) => IndexCurrentImage(index)}
            />
            <Information 
                // TITLE PAGE
                    namePage = {'EDIT PRODUCT'}
                    nameAddImage = {'REPLACE IMAGE'}
                    nameActiveAlert = {'Product was edit'}
                // ONCHANGE VALUE
                    addImg= {(event)=> ChangeImage(event)}
                    onChange= {(event) => onChange(event)}
                    state= {state}
                // COMPLETE EDIT
                    SaveEdit = {() => SaveEdit(imgUpLoad)}
                    activeAlert = {activeAlert}
            />
        </div>
    )
}
export default EditProduct;