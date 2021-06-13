import React from "react";
const  HeaderStorage = ( props ) => {
    return (
        <div className="HeaderStorage">
            <div className="tag">
                <p>ID</p>
            </div>
            <div className="tag image">
                <p>Image</p>
            </div>
            <div className="tag name">
                <p>Name</p>
            </div>
            <div className="tag">
                <p>Price</p>
            </div>
            <div className="tag small">
                <p>Quantity</p>
            </div>
            <div className="tag small">
                <p>Status</p>
            </div>
            <div className="tag">
                <p>Create At</p>
            </div>
            <div className="tag">
                <p>Update</p>
            </div>
            <div className="tag action">
                <p>Action</p>
            </div>
        </div>
    )
}
export default HeaderStorage;