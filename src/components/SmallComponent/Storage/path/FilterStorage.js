import React from "react";
import { Link } from "react-router-dom";
import search from "../../../logo/search.svg"
import box from "../../../logo/box.svg"
//  ../ path ../ storage ../Small 
// import sort from "../logo/sort-descending.svg"
const FilterStorage = ( props ) => {
    const { onChange, value, onKeyUp } = props
    return (
        <div className="FilterStorage">
            <div className="NewItem">
                <Link to="/newproduct" className="button">
                    <p>add product</p>
                    <img alt="product" src={box}/>
                </Link>
            </div>
            {/* <div className="softItem">
                <button>
                    <img alt="product" src={sort}/>
                </button>
            </div> */}
            <div className="SearchBox">
                <input  type="text" 
                        placeholder="Find Name Product"
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