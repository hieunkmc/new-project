// ROUTER
import avatar from "../logo/avatar.jpg"
import { Link, withRouter } from "react-router-dom";
// CONTEXT
import auth from "../ProtectRoutes/auth";
import { useContext } from "react";
import {UserContext} from "../../context/UserContext"
//================COMPONENT===================//
const MenuUser = ( props ) => {
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
                <div className="item"><Link to="/checkout">Cart</Link></div>
                <div className="item"><Link to="/history">history</Link></div>
            </div>
            <div className="side end">
                <div className="item">
                    <button onClick={() => auth.logout(() => {
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
export default withRouter(MenuUser);