import keycloak from "../../keycloak";
import UserProfileCard from "../../components/profile/UserProfileCard";
import React from "react";
import UserMedicalCard from "../../components/profile/UserMedicalCard";
import UserAddressCard from "../../components/profile/UserAddressCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useProfileDetailByKeycloakId} from "../../hooks/useProfileDetail";

interface User {
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    sub: string;
    email: string;
    address: string;
    post_code: string;
    city: string;
    country: string;

    roles?: string[];
}

interface Profile {
    weight?: number;
    height?: number;
    disabilities?: string;
    medicalCondition?: string;
    profileImg?: string;
}

function ProfilePage() {

    const { profile: rawProfile, error } = useProfileDetailByKeycloakId(keycloak.tokenParsed?.sub );
    const profile = rawProfile as (Profile | null);

    localStorage.setItem('profile', JSON.stringify(rawProfile));

    const localProfile = JSON.parse(localStorage.getItem('profile') || '{}');

    console.log("profile local: ", localProfile);

    if (error) {
        return <div>failed to load</div>
    }

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
    };

    const profileUser: Profile = {
        weight: profile.weight || 0,
        height: profile.height || 0,
        disabilities: profile.disabilities || '',
        medicalCondition: profile.medicalCondition  || '',
        profileImg: profile.profileImg || '',
    };

    console.log("profileUser: ", profileUser);

    const user: User = {
        name: tokenParsed.name || '',
        firstName: tokenParsed.given_name || '',
        lastName: tokenParsed.family_name || '',
        username: tokenParsed.preferred_username || '',
        sub: tokenParsed.sub || '',
        email: tokenParsed.email || '',
        roles: keycloak.tokenParsed?.realm_access?.roles || [],
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

                        <UserProfileCard user={user}/>

                    </Grid>
                    <Grid item xs={8}>

                        <UserMedicalCard user={profileUser} onSubmit={handleSubmit}/>

                    </Grid>
                    <Grid item xs={4}>

                        <UserAddressCard user={user} onSubmit={handleSubmit}/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ProfilePage;

/*  useEffect(() => {

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
    */