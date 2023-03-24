import keycloak from "../../keycloak";
import UserProfileCard from "../../components/profile/UserProfileCard";
import React, {useEffect} from "react";
import UserMedicalCard from "../../components/profile/UserMedicalCard";
import UserAddressCard from "../../components/profile/UserAddressCard";
import axios from "axios";
import {Card, CardContent, Typography} from "@mui/material";

interface User {
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    sub: string;
    email: string;
    weight?: number;
    height?: number;
    disabilities?: string;
    medicalCondition?: string;
    profileImage?: string;
    address: string;
    post_code: string;
    city: string;
    country: string;

    roles?: string[];
}

function ProfilePage() {


    const tokenParsed = keycloak.tokenParsed as {
        name?: string;
        given_name?: string;
        family_name?: string;
        preferred_username?: string;
        sub?: string;
        email?: string;
    };

    const user: User = {
        name: tokenParsed.name || '',
        firstName: tokenParsed.given_name || '',
        lastName: tokenParsed.family_name || '',
        username: tokenParsed.preferred_username || '',
        sub: tokenParsed.sub || '',
        email: tokenParsed.email || '',
        roles: keycloak.tokenParsed?.realm_access?.roles || [],
        // weight: userInfo.profile.weight
        weight: 0,
        //  height: userInfo.profile.height ,
        height: 0,
        //  disabilities: userInfo.profile.disabilities || '',,
        disabilities: '',
        //  medicalCondition: userInfo.profile.medicalCondition
        medicalCondition: '',
        profileImage: "",
        address: "",
        post_code: "",
        city: "",
        country: "",
    };

    useEffect(() => {

        const profile:  Record<string, any>  = JSON.parse(localStorage.getItem('profile') || '{}');


    function handleSubmit() {
        // Your form submission logic here
        console.log("submitting");
    }

    return (
        <>
            <h1>Profile Page</h1>

            <Card sx={{maxWidth: 500}}>
                <CardContent sx={{width: '100%', padding: '20px'}}>
                    <Typography sx={{fontSize: 18, lineHeight: '24px'}} color="text.secondary" gutterBottom>
                        Token
                    </Typography>
                    <Typography variant="body2" sx={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 14}}>
                        {keycloak.token}
                    </Typography>
                </CardContent>
            </Card>

            <UserProfileCard user={user} />

            <UserMedicalCard user={user} onSubmit={handleSubmit} />

            <UserAddressCard user={user} onSubmit={handleSubmit} />

        </>
    );
}

export default ProfilePage;