const  HeaderUser = ( props ) => {
    return (
        <div className="HeaderStorage">
            <div className="tag user">
                <p>ID</p>
            </div>
            <div className="tag user image">
                <p>Avatar</p>
            </div>
            <div className="tag user name">
                <p>Name</p>
            </div>
            <div className="tag user">
                <p>Total Order</p>
            </div>
            <div className="tag user">
                <p>Total Price</p>
            </div>
            <div className="tag user">
                <p>Status</p>
            </div>
            <div className="tag user">
                <p>Create At</p>
            </div>
            <div className="tag user">
                <p>Update At</p>
            </div>
            <div className="tag action">
                <p>Action</p>
            </div>
        </div>
    )
}
export default HeaderUser;