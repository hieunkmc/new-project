import React , { useEffect, useState } from "react";
// CSS
// SUPPORT
import { Link } from "react-router-dom";
// FIREBASE 
import firebase from '../../../firebase/firebase'
// SMALL COMPONENTS
import Preview from "./path/Preview";
import Information from "./path/Information";
import MenuAdmin from "../../Multi_useComponent/MenuAdmin";
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
    const [ imgUpLoad , setImgUpLoad ] = useState([])
    const [ indexForUpLoad , setIndexForUpLoad] = useState()
    const [ activeImg , setActiveImg ] = useState(false)
    // ALERT UPDATE COMPLETE
    const [ activeAlert , setActiveAlert ] = useState(false)
    // GET DATA
    useEffect(() => {
        if ( ItemToEdit ) {
        // ADD ITEM TO LOCAL --- FIRST CONT
            localStorage.setItem('DataToEdit', JSON.stringify(ItemToEdit))
        // GET DATA FROM LOCAL
            setState(ItemToEdit)
            setIndexForUpLoad(0)
        }
        else {
        // GET DATA FROM LOCAL --- REFRESH
            let data = JSON.parse(localStorage.getItem('DataToEdit'))
            setState(data)
            setIndexForUpLoad(0)
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
    // SAVE EDIT --- INFORMATION COMPONENT
    const SaveEdit = async (imgUpLoad) => {
        for ( const file of imgUpLoad) {
            await UpLoadImg(file)
        }
    }
    const UpLoadImg = async (file) => {
        const function1 = await getDownloadURL(file)
        const function2 = await CombineDownloadURL(function1)
        if ( function2 === null ) {
            const function3 = await CompleteEdit()
            return function3
        } 
        return [ function1, function2 ]
    }
    const getDownloadURL = (file) => {
        return new Promise(resolve => {
            const img = file.fileWillUpload
            const index = file.indexOfFile
            const storage = firebase.storage()
            storage.ref(`images/${img.name}`).put(img).on(
                'STATE_CHANGED',
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(img.name)
                        .getDownloadURL()
                        .then(url => { 
                            console.log(url)
                            resolve([url,index])
                        })
                }
            )
        })
    }
    const CombineDownloadURL = ([downloadURL,index]) => {
        return new Promise ( resolve => {
            const maxIndex = Math.max(...imgUpLoad.map((index) => index.indexOfFile))
            state.url[index] = downloadURL
            if ( index === maxIndex ) {
                resolve(null)
            }
            else {
                resolve()
            }
        })
    }
    const CompleteEdit = async () => {
        const ref = await firebase.firestore().collection("products")
        return new Promise ( resolve => {
            ref.doc(state.id).set(state).then(() => {
                setActiveAlert(true)
                resolve()
            })
        })
    }
    // CHANGE SINGLE IMG
    const ChangeImage = (event) => {
        // CREATE LOCAL LINK PREVIEW IMAGE
        if ( event.target.files[0] !== undefined ) {
            const imgUrl = URL.createObjectURL(event.target.files[0])
            let oldUrl = Object.values(state.url)
            let newUrl = [  
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
    const AddImage = (event) => {
        if ( event.target.files[0] !== undefined ) {
            if ( state.url.length < 5) {
                let newUrl = []
                let oldUrl = Object.values(state.url)
                for ( let i = 0 ; i < event.target.files.length; i++ ) {
                    let imgUrl = URL.createObjectURL(event.target.files[i])
                    newUrl.push(imgUrl)
                    // ARRAY IMAGE UPLOAD TO PREVIEW
                    setImgUpLoad(old => [
                        ...old , 
                        {
                            fileWillUpload: event.target.files[i],
                            indexOfFile: i + 1
                        }
                    ])
                    if ( state.url.length + newUrl.length === 5 ) {
                        break
                    }
                }
                const combineUrl = oldUrl.concat(newUrl)
                setState({
                    ...state, 
                    url: combineUrl
                })
                // MAKE NEWEST IMAGE TO PREVIEW --- REPLACE IMAGE PREVIEW BEFORE
                setActiveImg(!activeImg)
            }
        }
    }
    const IndexCurrentImage = (index) => {
        setIndexForUpLoad(index)
        // SHOW IMAGE CHOOSE TO VIEW PRESENT
        setCurrentImg(state.url[index])
        setActiveImg(!activeImg)
    }
    return (
        <div className="New-Product">
            <MenuAdmin />
            <Preview
                state= {state}
                currentImg = {currentImg}
                activeImg = {activeImg}
                IndexCurrentImage= {(index) => IndexCurrentImage(index)}
            />
            <Information 
                // TITLE PAGE
                    namePage = {'EDIT PRODUCT'}
                    nameAddImage = {'ADD IMAGE'}
                    nameReplaceImage = {'REPLACE IMAGE'}
                    nameActiveAlert = {'Product was edit'}
                // ONCHANGE VALUE
                    addImg= {(event)=> AddImage(event)}
                    changeImg= {(event)=> ChangeImage(event)}
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