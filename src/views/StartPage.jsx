import keycloak from "../keycloak";
import {Button, CircularProgress, Stack} from "@mui/material";
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

                    const {profile} = await fetchProfileByKeycloakId(keycloak.idTokenParsed.sub);

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
            <section className="actions">
                {!keycloak.authenticated && (
                    <Box className={"fullscreen-mode"}>

                        <Stack sx={{minWidth: 300}} spacing={3}>
                            <img src={'/img/image_1.png'} alt="Fit me" style={{width: "300px", height: "300px"}}/>
                            <h1>ME FIT</h1>
                        </Stack>
                        <Stack sx={{minWidth: 300}} direction={'row'} spacing={5}>
                            <Button className={'start-button'} onClick={() => keycloak.login()}>Login</Button>
                            <Button className={'start-button'} onClick={() => keycloak.register()}>Register</Button>
                        </Stack>

                    </Box>
                )}
                {keycloak.authenticated && (
                    <Box sx={{display: 'flex'}}>
                        <CircularProgress/>
                    </Box>
                )}

            </section>
        </div>
    );
}

export default StartPage;