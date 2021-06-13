import axios from "axios";

// export default axios.get('https://imageshop-210507-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')
export default axios.create({
    baseURL: "https://imageshop-210507-default-rtdb.asia-southeast1.firebasedatabase.app/"
})