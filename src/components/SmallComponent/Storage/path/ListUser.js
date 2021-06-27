// LOGO
import box from "../../../logo/box.svg"
import cancel from "../../../logo/cancel.svg"
import stop from "../../../logo/stop.svg"
import dog from "../../../logo/dog.svg"
// ROUTER
import { Link } from "react-router-dom";
const ListUser = ( props ) => {
    const { data , clear, disable } = props
    return (
        <div className="item">
            <div className="tag user">
                <p>{data.id}</p>
            </div>
            <div className="tag user image small">
                { data.url === "" ?
                    <img 
                        alt="preview" 
                        width={window.innerHeight*0.05}
                        height={window.innerHeight*0.05}
                        src={dog}
                    />
                    :
                    <img 
                        alt="preview" 
                        width={window.innerHeight*0.05} 
                        height={window.innerHeight*0.05}
                        src={data.url}
                    />
                }
            </div>
            <div className="tag user name">
                <p>{data.name}</p>
            </div>
            <div className="tag user small">
                <p>10</p>
            </div>
            <div className="tag user small">
                <p>1000</p>
            </div>
            <div className="tag user small">
                <p>active</p>
            </div>
            <div className="tag user">
                <p>{new Date(data.create_at).toString()}</p>
            </div>
            <div className="tag user">
                <p>{new Date(data.update_at).toString()}</p>
            </div>
            <div className="tag action">
                <button onClick={() =>disable(data)} >
                    <img alt="stop" src={stop}/>
                </button>
                <button onClick={clear} >
                    <img alt="cancel" src={cancel}/>
                </button>
                <button>
                    <Link
                        to={{
                            pathname: `/edit/${data.id}`,
                            ItemToEdit: data
                        }}>
                        <img alt="edit" src={box}/>
                    </Link>
                </button>
            </div>
        </div>
    )
}
export default ListUser;