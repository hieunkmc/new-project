// ROUTER
import camera from "../../logo/camera.svg"
import avatar from "../../logo/avatar.jpg"
// FIREBASE 
// import firebase from '../../../firebase/firebase'
import InputCreateUser from "../../Multi_useComponent/InputCreateUser";
import MenuUser from "../../Multi_useComponent/MenuUser";
//================COMPONENT===================//
const ProfileUser = ( {match} ) => {
    return (
        <div className="Profile">
            <MenuUser />
            <div className="edit">
                <div className="edit-container">
                    {/* <div className="input-img">
                        <div className="input-file">
                            <label htmlFor="file">
                                <p>change avatar</p>    
                            </label>
                            <input  id="file" type="file" accept="image/"
                            />
                        </div>
                    </div> */}
                    <div className="avatar">
                        <div className="avatar-icon">
                            <img alt="avatar" src={avatar}/>
                        </div>
                        <div className="camera-icon">
                            <img alt="camera" src={camera} />
                        </div>
                    </div>
                    <InputCreateUser name="name"/>
                    <InputCreateUser name="password"/>
                    <InputCreateUser name="phone"/>
                    <InputCreateUser name="email"/>
                    <div className="button-add">
                        <button>
                            <p>SAVE</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileUser;