import keycloak from "../keycloak";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {fetchProfileByKeycloakId} from "../api/profile";

/**
 * Example Start Page using Keycloak Context.
 */
function StartPage() {

    const navigate = useNavigate();

    useEffect(() => {

        if (keycloak.authenticated) {
            setTimeout(() => {
            const init = async () => {
                try {

                    const { profile } = await fetchProfileByKeycloakId(keycloak.idTokenParsed.sub);

                    localStorage.setItem("profile", JSON.stringify(profile));

                } catch (error) {

                    console.log(error);

                }
            };
            init();
            }, 3000);

            const profile = JSON.parse(localStorage.getItem("profile"));

            console.log("profile", profile);

            if (profile.profileImg == null) {
                navigate("/registration");
            } else {
                navigate("/dashboard");
            }

        }
    }, [navigate])


    function handleLogout() {
        //Clear local storage
        localStorage.clear();
        keycloak.logout();

    }

    return (
        <div>
            <h1>Start Page</h1>

            <section className="actions">
                {!keycloak.authenticated && (
                    <Button onClick={() => keycloak.login()}>Login</Button>
                )}
                {keycloak.authenticated && (
                    <Button onClick={handleLogout}>Logout</Button>
                )}
            </section>

        </div>
    );
}

export default StartPage;