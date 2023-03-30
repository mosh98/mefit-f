import keycloak from "../../keycloak";
import UserProfileCard from "../../components/profile/UserProfileCard";
import React from "react";
import UserMedicalCard from "../../components/profile/UserMedicalCard";
import UserAddressCard from "../../components/profile/UserAddressCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useMeFitContext} from "../../MeFitMyContext";
import {UserProfile, UserKeycloak, UserAddress} from "../../const/interface";

function ProfilePage() {
    const {profile} = useMeFitContext();


    if (!profile) {
        return <div>loading...</div>
    }

    const tokenParsed = keycloak.tokenParsed as {
        name?: string;
        given_name?: string;
        family_name?: string;
        preferred_username?: string;
        sub?: string;
        email?: string;
        roles?: string[];
    };

    const profileUser: UserProfile = {
        profileImg: profile?.profileImg || undefined,
        weight: profile?.weight || 0,
        height: profile?.height || 0,
        disabilities: profile?.disabilities || undefined,
        medicalCondition: profile?.medicalCondition || undefined,
    };

    console.log("profileUser: ", profileUser);

    const userKeycloak: UserKeycloak = {
        name: tokenParsed.name || '',
        firstName: tokenParsed.given_name || '',
        lastName: tokenParsed.family_name || '',
        username: tokenParsed.preferred_username || '',
        sub: tokenParsed.sub || '',
        email: tokenParsed.email || '',
        roles: keycloak.tokenParsed?.realm_access?.roles || [],
    };

    const userAddress: UserAddress = {
        address: "",
        post_code: "",
        city: "",
        country: "",
    };

    function handleSubmit() {
        // Your form submission logic here
        console.log("submitting");
    }

    return (
        <Box className={"page-view"}>
            <h1>Profile Page</h1>

            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <img
                            src={`${profileUser.profileImg}`}
                            alt="avatar"
                            style={{
                                width: "300px",
                                height: "300px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                objectPosition: "center",
                                margin: "0 auto",
                                display: "block",
                                border: "2px solid #fff",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                            }}
                        />

                    </Grid>
                    <Grid item xs={4}>

                        <UserProfileCard user={userKeycloak}/>

                    </Grid>
                    <Grid item xs={8}>

                        <UserMedicalCard user={profileUser} onSubmit={handleSubmit}/>

                    </Grid>
                    <Grid item xs={4}>

                        <UserAddressCard user={userAddress} onSubmit={handleSubmit}/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ProfilePage;