import { Redirect, Route } from "react-router";
import auth from "./auth"

const ProtectRoutesUser = ({component: Component, ...rest}) => {
    return (
        <Route { ...rest } 
            render={(props) => {
                if (auth.isAuthenticated()) {
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
export default ProtectRoutesUser;
