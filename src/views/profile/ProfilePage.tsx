import keycloak from "../../keycloak";
import UserProfileCard from "../../components/profile/UserProfileCard";
import React from "react";
import UserMedicalCard from "../../components/profile/UserMedicalCard";
import UserAddressCard from "../../components/profile/UserAddressCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
        // medicalCondition: userInfo.profile.medicalCondition
        medicalCondition: '',
        profileImage: "",
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
                            src={user.profileImage}
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

                        <UserMedicalCard user={user} onSubmit={handleSubmit}/>

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