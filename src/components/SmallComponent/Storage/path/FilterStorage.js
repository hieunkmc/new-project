// ROUTER
import { Link } from "react-router-dom";
// LOGO
import search from "../../../logo/search.svg"
import box from "../../../logo/box.svg"
// CONTEXT
import { UserContext } from "../../../../context/UserContext";
import { useContext } from "react";
const FilterStorage = ( props ) => {
    const { idUser } = useContext(UserContext)
    const { onChange, value, onKeyUp } = props
    return (
        <div className="FilterStorage">
            {
                idUser === "4aPienVKCXh3MgJAnlOrk4Y9P463" &&
                <div className="NewItem">
                    <Link to="/newproduct" className="button">
                        <p>add product</p>
                        <img alt="product" src={box}/>
                    </Link>
                </div>
            }
            <div className="SearchBox">
                <input  type="text" 
                        placeholder="Find Name Customer"
                        onChange= {onChange}
                        value= {value || ""}
                        onKeyUp= {onKeyUp}
                />
                <div className="icon">
                    <img alt="search" src={search} />
                </div>
            </div>
        </div>
    )
}
export default FilterStorage;