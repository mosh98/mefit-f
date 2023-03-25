import keycloak from "../keycloak";
import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {fetchProfileByKeycloakId} from "../api/profile";
import {Box} from "@mui/system";

/**
 * Example Start Page using Keycloak Context.
 */

// TODO: add error handling for Forms
function StartPage() {

    const navigate = useNavigate();

    useEffect(() => {

        if (keycloak.authenticated) {

            const init = async () => {
                try {

                    const { profile } = await fetchProfileByKeycloakId(keycloak.idTokenParsed.sub);

                    localStorage.setItem("profile", JSON.stringify(profile));

                } catch (error) {

                    console.log(error);

                }
            };
            init();

        setTimeout(() => {
            const profile = JSON.parse(localStorage.getItem("profile"));
            console.log("profile", profile);

            if (profile.profileImg == null) {
                navigate("/registration");
            } else {
                navigate("/dashboard");
            }
        }, 1500);
        }
    }, [navigate])


    /*function handleLogout() {
        localStorage.clear();
        keycloak.logout();
    }*/

    return (
        <div>
            <h1>Start Page</h1>

            <section className="actions">
                {!keycloak.authenticated && (
                    <Button onClick={() => keycloak.login()}>Login</Button>
                )}
                {keycloak.authenticated && (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    /*<Button onClick={handleLogout}>Logout</Button>*/
                )}
            </section>

        </div>
    );
}

export default StartPage;