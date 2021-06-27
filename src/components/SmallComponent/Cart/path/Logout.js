// ROUTER
import { Link } from "react-router-dom";
// LOGO
import logo_user from "../../../logo/user3.svg"
//COMPONENTS
const Logout = (props) => {
    return (
        <div className="account">
            <Link to="/authentication/" >
                <img alt="icon-user" src={logo_user} />
            </Link>
        </div>
    )
}
export default Logout;