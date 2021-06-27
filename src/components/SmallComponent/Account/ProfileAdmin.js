import { useEffect , useContext , useState} from "react";
// lOGO
import camera_icon from "../../logo/camera.svg"
import avatar_icon from "../../logo/logo.png"
import phone_icon from "../../logo/phone.svg"
import user2_icon from "../../logo/user2.svg"
// CONTEXT
import { UserContext } from "../../../context/UserContext";
// FIREBASE 
import firebase from '../../../firebase/firebase'
// 
import MenuAdmin from "../../Multi_useComponent/MenuAdmin";
import InputName from "../../Multi_useComponent/InputName";
import InputEmail from "../../Multi_useComponent/InputEmail";
import InputNewPassword from "../../Multi_useComponent/InputNewPassword";
//================COMPONENT===================//
const ProfileAdmin = ( props ) => {
    const { idUser } = useContext(UserContext)
    const [ img , setImg] = useState({
        preview: "",
        file: ""
    })
    const [dataUser , setDataUser] = useState({})
    useEffect(() =>{
        LoadDataId(idUser)
    },[idUser])
    const LoadDataId = async (uid) => {
        const ref = firebase.firestore().collection('admin')
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
    const changeInformation = () => {
        const { newPass , password } = dataUser
        reauthenticate(password).then(()=> {
            firebase.auth().currentUser.updatePassword(newPass).then(() => {
                props.history.push("/")
            })
            .catch((error) => { console.log(error) })
        })
        .catch((error) => console.log(error))
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
    const { name, password, phone, email, url, newPass } = dataUser
    const { preview } = img
    return (
        <div className="Profile">
            <MenuAdmin user={dataUser} />
            <div className="edit">
                <div className="edit-container">
                    <div className="avatar">
                        <div className="avatar-icon">
                            {   preview === "" ?
                                <div className="avatar-icon">
                                    <img alt="avatar-non" src={avatar_icon} />
                                </div>
                                :
                                <div className="avatar-icon">
                                    <img alt="avatar-able" src={preview} />
                                </div>
                            }
                        </div>
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
                        <button onClick={() => changeInformation()}>
                            <p>SAVE</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileAdmin;