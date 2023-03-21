import {Navigate} from "react-router-dom";
import keycloak from "../keycloak";
import {useEffect, useState} from "react";
import axios from "axios";

/**
 * Protect routes based on a given role and authenticated status of a Keycloak Session.
 * @description Default redirect is to the base path: "/"
 * @param {{ children: ReactNode, role: string, redirectTo: string }} props
 * @returns {JSX.Element}
 */

const apiUrl = process.env.REACT_APP_API_URL;

// Make redirectTo optional
// If not provided, default to "/"
function KeycloakRoute({children, role, redirectTo = "/"}) {
    const { sub } = keycloak.tokenParsed;
 //   const [userCreated, setUserCreated] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiUrl}users/userByKeycloakId/${sub}`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // If user found in database do nothing
                console.log("User found in database: ", response.data);
              //  setUserCreated(true);
                return {user: response.data, error: null};
            } catch (error) {
                // If user not found in database, create user
                console.log("User not found in database: ", error.message);
                const user = {
                    e_mail: keycloak.tokenParsed?.email,
                    first_name: keycloak.tokenParsed?.given_name,
                    last_name: keycloak.tokenParsed?.family_name,
                    keyCloakId: keycloak.tokenParsed?.sub,
                };


                    try {
                        const response = await axios.post(`${apiUrl}users/newUser`, user, {
                            headers: {
                                'Authorization': `Bearer ${keycloak.token}`,
                                'Content-Type': 'application/json',
                            }
                        });

                  //      setUserCreated(true);
                        return {user: response.data, error: null};
                    } catch (error) {
                        return {user: [], error: error.message};
                    }

            }
        };

        fetchUsers();
    }, [sub]);

    if (!keycloak.authenticated) {
        return <Navigate replace to={redirectTo}/>;
    }

    if (keycloak.hasRealmRole(role)) {
        return <>{children}</>;
    }

    return <Navigate replace to={redirectTo}/>;

}

export default KeycloakRoute;
