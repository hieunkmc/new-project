import { Redirect, Route } from "react-router";
import admin from "./admin"

const ProtectRoutesAdmin = ({component: Component, ...rest}) => {
    return (
        <Route { ...rest } 
            render={(props) => {
                if (admin.isAuthenticated()) {
                    return <Component { ...props } />
                }
                else {
                    return <Redirect to={{
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }}
                    />
                }
            }
        }/>
    )
}
export default ProtectRoutesAdmin;
