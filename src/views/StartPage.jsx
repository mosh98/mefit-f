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
            const init = async () => {
                try {
                    const { profile } = await fetchProfileByKeycloakId(keycloak.idTokenParsed.sub);

                    localStorage.setItem("profile", JSON.stringify(profile));
                } catch (error) {
                    console.log(error);
                }
            };
            init();

            const profile = JSON.parse(localStorage.getItem("profile"));

            console.log(profile.profileImg == null);

            if (profile.profileImg == null) {
                navigate("/profile");
            } else {
                navigate("/dashboard");
            }

        }
    }, [navigate])


    function handleLogout() {
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

            {keycloak.token && (
                <div>
                    <h4>Token</h4>
                    <pre>{keycloak.token}</pre>
                </div>
            )}
        </div>
    );
}

export default StartPage;