import keycloak from "../../keycloak";
import UserProfileCard from "../../components/profile/UserProfileCard";
import React, {useEffect} from "react";
import UserMedicalCard from "../../components/profile/UserMedicalCard";
import UserAddressCard from "../../components/profile/UserAddressCard";
import axios from "axios";

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

        const fetchAdress = async () => {
            console.log("Fetch adress from profile page:");

            const response = await axios.get(`https://database-mefit.herokuapp.com/addresses/addressByUserId/${profile.user}`, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                }
            })
            user.address = response.data.address;
            user.post_code = response.data.post_code;
            user.city = response.data.city;
            user.country = response.data.country;
        }

        fetchAdress();
        console.log(user)
    },[]);

    function handleSubmit() {
        // Your form submission logic here
        console.log("submitting");
    }

    return (
        <>
            <h1>Profile Page</h1>

            <UserProfileCard user={user} />

            <UserMedicalCard user={user} onSubmit={handleSubmit} />

            <UserAddressCard user={user} onSubmit={handleSubmit} />

        </>
    );
}

export default ProfilePage;