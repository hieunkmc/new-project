import Cart from "./SmallComponent/Cart/Cart"
// import auth from "./ProtectRoutes/auth"
const Home = (props) => {
    return (
        <div className="Products">
            {/* MAIN */}
            <Cart />
            <div className="view-slide">
                <div className="view-content">
                    <div className="box">
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
