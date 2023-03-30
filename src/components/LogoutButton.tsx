import {Button} from "@mui/material";
import keycloak from "../keycloak";
import * as React from "react";

function handleLogout() {

    keycloak.logout();
}

export default function LogoutButton() {

    return (
        <>
            {keycloak.authenticated && (
                <Button onClick={handleLogout}>Logout</Button>
            )}
        </>
    )
}