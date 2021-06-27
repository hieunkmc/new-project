import React, { useContext } from "react";
import logo from "../../logo/white_mountaineering_wt.png"
// CONTEXT
import { UserContext } from "../../../context/UserContext";
// ROUTER
import { Link } from "react-router-dom";
import Login from "./path/Login";
import Logout from "./path/Logout";
//COMPONENTS
const Header = (props) => {
    const { LogInSuccess } = useContext(UserContext);
    return (
        <div id="Header">
            <div className="side-profile">
                <div className="navbar-home">
                    <Link to="/" className="Header-navbar">
                        <img alt="logo" src={logo} />
                    </Link>
                </div>
            </div>
            {   LogInSuccess  ?
                <Login />
                :
                <Logout />
            }
        </div>
    )
}
export default Header;