import { useEffect , useContext , useState} from "react";
// ROUTER
import camera_icon from "../../logo/camera.svg"
import avatar_icon from "../../logo/logo.png"
import phone_icon from "../../logo/phone.svg"
import user2_icon from "../../logo/user2.svg"
// CONTEXT
import { UserContext } from "../../../context/UserContext";
// FIREBASE 
import firebase from '../../../firebase/firebase'
// 
import MenuUser from "../../Multi_useComponent/MenuUser";
import InputName from "../../Multi_useComponent/InputName";
import InputEmail from "../../Multi_useComponent/InputEmail";
import InputNewPassword from "../../Multi_useComponent/InputNewPassword";
//================COMPONENT===================//
const ProfileUser = ( props ) => {
    const { idUser } = useContext(UserContext)
    const [ img , setImg] = useState({
        preview: "",
        file: ""
    })
    const [ dataUser , setDataUser] = useState({})
    useEffect(() =>{
        LoadDataId(idUser)
    },[idUser])
    const LoadDataId = async (uid) => {
        const ref = firebase.firestore().collection('users')
        const res = await ref
                .where('id', '==' , uid)
                .get()
                res.docs.forEach((doc) => {
                    setDataUser(doc.data())
                })
    }
    const onChange = (event) => {
        const value = event.target.value
            setDataUser({
                ...dataUser, 
                [event.target.name] : value 
            })
    }
    const reauthenticate = () => {
        const { email , password } = dataUser
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(email,password)
        return user.reauthenticateWithCredential(cred)
    }
    const Save = async () => {
        const { file } = img
            if ( dataUser.newPass === undefined || dataUser.newPass === "" ) {
                if (file === "") {
                    changeInformation()
                }
                else {
                    getDownloadURL(file)
                }
            }
            else {
                reauthenticate(password).then(()=> {
                    firebase.auth().currentUser.updatePassword(newPass).then(() => {
                        props.history.push("/")
                    })
                    .catch((error) => { console.log(error) })
                })
                .catch((error) => console.log(error))
            }
    }
    const getDownloadURL = (file) => {
        const storage = firebase.storage()
            storage.ref(`users/${file.name}`).put(file).on(
                'STATE_CHANGED',
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("users")
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => changeInformation(url))
                }
            )
    }
    const changeInformation = async (url) => {
        const ref = firebase.firestore().collection('users')
        const res = await ref
            if ( url !== undefined ) {
                dataUser.url = url
                dataUser.update_at = +Date.now()
            }
            res.doc(idUser).set(dataUser)
    }
    // PREVIEW IMAGE
    const changeImage = (event) => {
        if ( event.target.files[0] ) {
            const file = event.target.files[0]
            const imgUrl = URL.createObjectURL(event.target.files[0])
            setImg({
                preview: imgUrl,
                file : file
            })
        }
    }
    const { name, password, phone, email , url, newPass } = dataUser
    const { preview } = img
    return (
        <div className="Profile">
            <MenuUser user={dataUser} />
            <div className="edit">
                <div className="edit-container">
                    <div className="avatar">
                        {   preview === "" ?
                            <div className="avatar-icon">
                                <img alt="avatar-non" src={url} />
                            </div>
                            :
                            <div className="avatar-icon">
                                <img alt="avatar-able" src={preview} />
                            </div>
                        }
                        <div className="camera-icon">
                            <label htmlFor="file">
                                <img alt="camera" src={camera_icon}/>
                            </label>
                            <input  id="file" 
                                    type="file" 
                                    accept="image/" 
                                    onChange={changeImage}
                            />
                        </div>
                    </div>
                    <InputName name="name" icon={user2_icon} value={name} onChange={onChange} />
                    <InputNewPassword name="newPass" password={newPass} value={password} onChange={onChange} />
                    <InputName name="phone" icon={phone_icon} value={phone} onChange={onChange} />
                    <InputEmail name="email" value={email} onChange={onChange}/>
                    <div className="button-add">
                        <button onClick={() => Save()}>
                            <p>SAVE</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileUser;