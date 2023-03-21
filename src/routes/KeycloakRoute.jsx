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
    const {sub} = keycloak.tokenParsed;

    useEffect(() => {
        const checkUserExists = async () => {
            try {
                const response = await axios.get(`${apiUrl}users/allUsers`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const users = response.data;

                // Find user with matching sub
                const user = users.find(user => user.keyCloakId === sub);

                console.log(sub)

                if (!user) {
                    const newUser = {
                        e_mail: keycloak.tokenParsed?.email,
                        first_name: keycloak.tokenParsed?.given_name,
                        last_name: keycloak.tokenParsed?.family_name,
                        keyCloakId: keycloak.tokenParsed?.sub,
                    };
                    console.log(newUser);

                    // Create user in database
                    try {
                        const response = await axios.post(`${apiUrl}users/newUser`, newUser, {
                            headers: {
                                'Authorization': `Bearer ${keycloak.token}`,
                                'Content-Type': 'application/json',
                            }
                        });
                        return {user: response.data, error: null};
                    } catch (error) {
                        return {user: [], error: error.message};
                    }

                } else {
                    console.log("User found in database: ", user)
                }

            } catch (error) {
                console.log(error);
            }
        }

        checkUserExists();
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
