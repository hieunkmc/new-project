// ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// CONTEXT
import './App.css'
import NumberProvider from "./context/CartContext";
import UserProvider  from "./context/UserContext";
// PROTECT ROUTER
import ProtectRoutesUser from "./components/ProtectRoutes/ProtectRoutesUser"
import ProtectRoutesAdmin from "./components/ProtectRoutes/ProtectRoutesAdmin"
// COMPONENT
import Home from "./components/Slider/Home"
import Storage from "./components/SmallComponent/Storage/Storage";
import EditProduct from "./components/SmallComponent/Products/EditProduct";
import NewProduct from "./components/SmallComponent/Products/NewProduct";
import Authentication from "./components/SmallComponent/Account/Authentication";
import Register from "./components/SmallComponent/Account/Register";
import Customers from "./components/SmallComponent/User/Customers";
import ProfileUser from "./components/SmallComponent/Account/ProfileUser";
import ProfileAdmin from "./components/SmallComponent/Account/ProfileAdmin";
import ForgotPassword from "./components/SmallComponent/Account/ForgotPassword";

const  App = () => {
    return (
            <NumberProvider>
                    <UserProvider>
                        <div className="App">
                                <Router> 
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <ProtectRoutesAdmin
                                            path="/storage"
                                            component={Storage}
                                        />
                                        <ProtectRoutesAdmin
                                            path="/newproduct"
                                            component={NewProduct}
                                        />
                                        <ProtectRoutesAdmin
                                            path="/edit"
                                            component={EditProduct}
                                        />
                                        <ProtectRoutesAdmin
                                            path="/customers"
                                            component={Customers}
                                        />
                                        <ProtectRoutesAdmin
                                            path="/admin"
                                            component={ProfileAdmin}
                                        />
                                        <ProtectRoutesUser
                                            path="/user"
                                            component={ProfileUser}
                                        />
                                        <Route path="/forgot" exact component={ForgotPassword} />
                                        <Route path="/authentication" exact component={Authentication} />
                                        <Route path="/authentication/register" component={Register} />
                                        <Route path="*" component={() => "404 NOT FOUND"} />
                                        <Route path="/customers" component={Customers} />
                                    </Switch> 
                                </Router>
                        </div>
                    </UserProvider>
            </NumberProvider>
    );
}
export default App;
