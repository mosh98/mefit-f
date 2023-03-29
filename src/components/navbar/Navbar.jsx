import {AppBar, Container, Stack} from "@mui/material";
import React from "react";

function Navbar() {
    return (
        <AppBar sx={{  width: "100%" }}>
            <Container maxWidth="xl">
                <Stack direction="row" spacing={2} sx={{  width: "100%" }}>
                    <img
                        src={"/img/image_1.png"}
                        alt="Fit me"
                        style={{ maxWidth: "100%", height: "50px" }}
                    />
                    <h1>ME FIT</h1>
                </Stack>
            </Container>
        </AppBar>
    );
}

export default Navbar;
