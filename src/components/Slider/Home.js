import { useEffect , useState } from "react";
import video from "../logo/background.mp4"
import what_we_do from "../logo/whatwedo.jpg"
// FIREBASE
import firebase from "../../firebase/firebase";
import ItemSlider from "./path/ItemSlider";
import SidePresent from "./path/SidePresent";
//COMPONENTS
import Cart from "../SmallComponent/Cart/Cart"
// ------------------------------------------ //
const Home = (props) => {
    const [ slider, setSlider ] = useState([])
    const [ currentItem, setCurrentItem ] = useState(0)
    const [ paginationItem, setPaginationItem] = useState([])
    useEffect(() => {
        LoadData()
        LoadTotalProduct()
    },[])
    const LoadData = async () => {
        const ref = firebase.firestore().collection('products')
        const res = await ref.orderBy('create_at' , 'desc').limit(5).get()
        const arr = []
            res.docs.forEach((doc) => {
                arr.push(doc.data())
            })
            setSlider(arr)
    }
    const LoadTotalProduct = async () => {
        const ref = firebase.firestore().collection('products')
        const res = await ref.orderBy('value').get()
            res.docs.forEach(doc => {
            const maxItem = doc.data().value
            const array = []
                for (let item = 1 ; item < maxItem + 1 ; item++ ) {
                    array.push(item)
                }   
                
            setPaginationItem(array)
        }) 
    }
    return (
        <div className="Products">
            {/* MAIN */}
            <Cart />
            <video autoPlay  muted loop id="myVideo">
                <source src={video} type="video/mp4" />
            </video>
            <div className="view-slide">
                    <div className="side-content">
                        <SidePresent classActive="1"/>
                            <div className="video">
                                <img alt="what_we_do" src={what_we_do} />
                            </div>
                            <p className="content">
                                “The field in which we wear clothes is all outdoors.”
                            </p>
                            <p className="content">
                                One, design. Two,utility. Three, technology.
                                The imagination to fuse these elements together. 
                                The attitude of not submitting to sales or market needs.
                            </p>
                    </div>
                    <ItemSlider
                        data={slider[currentItem]}
                        pagination={paginationItem}
                        currentItem={currentItem}
                        changeItem={(index) => setCurrentItem(index)}
                    />
            </div>
        </div>
    );
}
export default Home;
