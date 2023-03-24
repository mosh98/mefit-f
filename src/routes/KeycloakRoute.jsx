import {Navigate} from "react-router-dom";
import keycloak from "../keycloak";
import {useEffect, useState} from "react";
import {createUser} from "../api/user";

/**
 * Protect routes based on a given role and authenticated status of a Keycloak Session.
 * @description Default redirect is to the base path: "/"
 * @param {{ children: ReactNode, role: string, redirectTo: string }} props
 * @returns {JSX.Element}
 */

// Make redirectTo optional
// If not provided, default to "/"
function KeycloakRoute({children, role, redirectTo = "/"}) {
    const [isNewUser, setIsNewUser] = useState({});


    useEffect(() => {
        if (keycloak.authenticated) {
            const newUser = {
                e_mail: keycloak.tokenParsed.email,
                first_name: keycloak.tokenParsed.given_name,
                last_name: keycloak.tokenParsed.family_name,
                keyCloakId: keycloak.tokenParsed.sub,
            };

            console.log("newUser ",newUser);
            const checkCreateUser = async () => {
                try {
                    const response = await createUser(newUser);
                    setIsNewUser(response);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            };
            checkCreateUser();
        }

    }, [ ]);

    if (!keycloak.authenticated) {
        return <Navigate replace to={redirectTo}/>;
    }

    if (keycloak.hasRealmRole(role)) {
        return <>{children}</>;
    }

    return <Navigate replace to={redirectTo}/>;

}export default KeycloakRoute;
