import keycloak from "../keycloak";
import {Button, CircularProgress, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {useMeFitContext} from "../MeFitMyContext";


// TODO: add error handling for Forms
function StartPage() {
    const navigate = useNavigate();
    const {profile, fetchProfileData} = useMeFitContext();
    const [isProfileDataFetched, setIsProfileDataFetched] = useState(false);

    useEffect(() => {
        if (keycloak.authenticated) {
            if (profile) {
                setIsProfileDataFetched(true);
            }
        }
    }, [profile]);

    useEffect(() => {

        if (keycloak.authenticated) {

            if (isProfileDataFetched) {
                if (profile?.profileImg == null) {
                    navigate("/registration");
                } else {
                    navigate("/dashboard");
                }
            } else {
                fetchProfileData();
            }
        }
    }, [ isProfileDataFetched, navigate ])


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