import edit from "../../../logo/edit.svg"
import cancel from "../../../logo/cancel.svg"
import stop from "../../../logo/stop.svg"
import { Link } from "react-router-dom";
function Item ( props ) {
    const { data , clear } = props
    return (
        <div className="item">
            <div className="tag">
                <p>{data.id}</p>
            </div>
            <div className="tag image">
                { data.url === undefined ?
                    <img 
                        alt="preview"
                    />
                    :
                    <img 
                        alt="preview" 
                        width={window.innerHeight*0.06*0.66} 
                        height={window.innerHeight*0.06}
                        src={data.url[0]}
                    />
                }
            </div>
            <div className="tag name">
                <p>{data.name}</p>
            </div>
            <div className="tag">
                <p>{data.price}</p>
            </div>
            <div className="tag small">
                <p>{data.quantity}</p>
            </div>
            <div className="tag small">
                {
                    !data.quantity ? 
                        <p>out of stock</p>
                        :
                        <p>in stock</p>
                }
            </div>
            <div className="tag">
                <p>{data.date}</p>
            </div>
            <div className="tag">
                <p>Update</p>
            </div>
            <div className="tag action">
                <button className="left" onClick={() => clear(data)} >
                    <img alt="stop" src={stop}/>
                </button>
                <button onClick={() => clear(data)} >
                    <img alt="cancel" src={cancel}/>
                </button>
                <button className="right">
                    <Link
                        to={{
                            pathname: `/edit/${data.id}`,
                            ItemToEdit: data
                        }}>
                        <img alt="edit" src={edit}/>
                    </Link>
                </button>
            </div>
        </div>
    )
}
export default Item;