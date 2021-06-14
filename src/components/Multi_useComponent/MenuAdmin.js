// ROUTER
import avatar from "../logo/avatar.jpg"
import { Link } from "react-router-dom";
// CONTEXT
import admin from "../ProtectRoutes/admin";
import { useContext } from "react";
import {UserContext} from "../../context/UserContext"
//================COMPONENT===================//
const MenuAdmin = ( props ) => {
    const { ChangeStateLog , idUser } = useContext(UserContext)
    return (
        <div id="Side-menu">
            <div className="user">
                <div className="avatar">
                    <img alt="avatar" src={avatar}></img>
                </div>
                <p>Store-Keeper</p>
            </div>
            <div className="side">
                <div className="item"><Link to="/profile" onClick={() => console.log(1)}>profile</Link></div>
            </div>
            <div className="side">
                <div className="item"><Link to="/storage">dashboard</Link></div>
                <div className="item"><Link to="/storage">slides</Link></div>
                <div className="item"><Link to="/storage">storage</Link></div>
            </div>
            <div className="side">
                <div className="item"><Link to="/customers">customers</Link></div>
                <div className="item"><Link to="/newproduct">orders</Link></div>
            </div>
            <div className="side end">
                <div className="item">
                    <button onClick={() => admin.logout(() => {
                        ChangeStateLog(idUser,"Logout")
                        props.history.push("/")
                    })}>
                        log out
                    </button>
                </div>
            </div>
        </div>
    )
}
export default MenuAdmin;