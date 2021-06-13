import rightarrow from "../../../logo/right-arrow.svg"
import leftarrow from "../../../logo/left-arrow.svg"
import classNames from "classnames";
const PaginationStorage = ( props ) => {
const { CurrentPage, totalProduct, ChangeCurrentPage } = props
    return (
        <div className="PaginationStorage">
            <div className="CurrentPage">
                <div className="button" onClick={() => ChangeCurrentPage('back')}><img alt="leftarrow" src={leftarrow}/></div>
                {totalProduct.map((item,index) => 
                    CurrentPage === item ? 
                        <div className={classNames(
                            'button' , 
                            {'active': true}
                        )} key={index} onClick={() => ChangeCurrentPage(item)}>{item}</div>
                        :
                        <div className="button" key={index} onClick={() => ChangeCurrentPage(item)}>{item}</div>
                )}
                <div className="button"  onClick={() => ChangeCurrentPage('next')}><img alt="rightarrow" src={rightarrow}/></div>
            </div>
        </div>
    )
}
export default PaginationStorage;