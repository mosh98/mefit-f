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
    medicalConditions?: string;
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
        disabilities: "hehe" || '',
        //  medicalConditions: userInfo.profile.medicalConditions
        medicalConditions: '',
        profileImage: "",
        address: "",
        post_code: "",
        city: "",
        country: "",
    };

    //https://database-mefit.herokuapp.com/addresses/addressByUserId/1
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

{/*


            <Card sx={{maxWidth: 400}}>
                <CardContent sx={{width: '100%', padding: '20px'}}>
                    <Typography sx={{fontSize: 20, lineHeight: '24px', marginBottom: '20px'}}
                                color="text.secondary" gutterBottom>
                        User details
                    </Typography>
                    <Typography variant="body2" sx={{fontSize: 16}}>
                        Address: {user.address} <br/>
                        Postal code: {user.post_code} <br/>
                        City: {user.city} <br/>
                        Country: {user.country} <br/>
                    </Typography>
                    <CardActions>
                        <ScrollDialog
                            content={<AddressForm onSubmit={handleSubmit} headerText={"Update info"}/>}
                            buttonText="Update" headerText="Update info"
                        />
                    </CardActions>
                </CardContent>
            </Card>

            <Card sx={{maxWidth: 400}}>
                <CardContent sx={{width: '100%', padding: '20px'}}>
                    <Typography sx={{fontSize: 20, lineHeight: '24px', marginBottom: '20px'}}
                                color="text.secondary" gutterBottom>
                        User Medical Info
                    </Typography>
                    <Typography variant="body2" sx={{fontSize: 16}}>
                        Medical Conditions: {user.medicalConditions} <br/>
                        Weight: {user.weight} <br/>
                        Height: {user.height} <br/>
                        Disabilities: {user.disabilities} <br/>
                        Medical Conditions: {user.medicalConditions} <br/>
                    </Typography>
                    <CardActions>
                        <ScrollDialog content={
                            <ProfileForm onSubmit={handleSubmit} headerText={"Update info"}/>}
                                      buttonText="Update"
                                      headerText="Update info"
                        />
                    </CardActions>
                </CardContent>
            </Card>


             <Card sx={{maxWidth: 400}}>
                <CardContent sx={{width: '100%', padding: '20px'}}>
                    {keycloak.tokenParsed && user.roles && (
                        <>
                            <Typography sx={{fontSize: 20, lineHeight: '24px', marginBottom: '20px'}}
                                        color="text.secondary" gutterBottom>
                                Username: {user?.username}
                            </Typography>
                            <Typography variant="body2" sx={{fontSize: 16}}>
                                Name: {user?.name} <br/>
                                Sub: {user?.sub} <br/>
                                Email: {user?.email} <br/>
                            </Typography>
                            <Typography variant="subtitle1"
                                        sx={{fontSize: 18, marginTop: '20px'}}
                                        color="text.secondary">
                                Roles
                            </Typography>
                            <List sx={{ margin: 0, paddingInlineStart: '20px'}}>
                                {user.roles
                                    .filter((role) => role === "ADMIN" || role === "USER")
                                    .map((role, index) => (
                                        <ListItem sx={{fontSize: 16, paddingBottom: 0}} key={index}>{role}</ListItem>
                                    ))}
                            </List>
                        </>
                    )}
                </CardContent>
            </Card>


 <Box>
                <Typography variant="h4" component="h2">
                    User Medical Info
                </Typography>
                <Typography>Weight: { user.weight }</Typography>
                <Typography>Height: { user.height }</Typography>
                <Typography>Disabilities: { user.disabilities }</Typography>
                <Typography>Medical Conditions: { user.medicalConditions }</Typography>

                <ScrollDialog content={<ProfileForm onSubmit={handleSubmit}   headerText={"Update info"}/>} buttonText="Update" headerText="Update info" />
            </Box>
                        <Box>
                <Typography variant="h4" component="h2">
                    User Info
                </Typography>
                <Typography>Address: { user.address }</Typography>
                <Typography>Postal code: { user.post_code }</Typography>
                <Typography>City: { user.city }</Typography>
                <Typography>Country: { user.country }</Typography>

                <ScrollDialog content={<AddressForm onSubmit={handleSubmit} headerText={"Update info"}/>} buttonText="Update" headerText="Update info" />
            </Box>

            {keycloak.tokenParsed &&
                <Box>
                    <Typography variant="h4" component="h2">
                        User
                    </Typography>

                    <Typography>Name: {user?.name}</Typography>
                    <Typography>First name: {user?.firstName}</Typography>
                    <Typography>Last name: {user?.lastName}</Typography>
                    <Typography>Username: {user?.username}</Typography>
                    <Typography>Sub: {user?.sub}</Typography>
                    <Typography>Email: {user?.email}</Typography>
                    {user.roles && (
                        <>
                            <Typography variant="h6" component="h3">
                                Roles
                            </Typography>
                            <ul>
                                {user.roles
                                    .filter((role) => role === "ADMIN" || role === "USER")
                                    .map((role, index) => (
                                        <li key={index}>{role}</li>
                                    ))}
                            </ul>
                        </>
                    )}

                </Box>
            }

            */
}