import keycloak from "../keycloak";
import {Typography} from "@mui/material";
import ScrollDialog from "../components/dialogs/ScrollDialog";
import UpdateForm from "../components/forms/UpdateForm";
import {useState} from "react";
import Box from "@mui/material/Box";

interface User {
    name: string;
    username: string;
    sub: string;
    weight?: number;
    height?: number;
    disabilities?: string;
    medicalConditions?: string;
    profileImage?: string;
}

function ProfilePage() {

    const tokenParsed = keycloak.tokenParsed as { name?: string; preferred_username?: string; sub?: string };

    const user: User = {
        name: tokenParsed.name || '',
        username: tokenParsed.preferred_username || '',
        sub: tokenParsed.sub || '',
    };

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const handleSubmit = () => {
        // Your form submission logic here
        setFormSubmitted(true);
        console.log('Form submitted');
    };


    return (
        <>
            <Typography variant="h2" component="h1">
                Profile Page
            </Typography>
            { keycloak.tokenParsed &&
                <Box>
                    <Typography variant="h4" component="h2">
                        User
                    </Typography>

                    <Typography>Name: { user?.name }</Typography>
                    <Typography>Username: { user?.username}</Typography>
                    <Typography>Sub: { user?.sub }</Typography>

                </Box>
            }
            <Typography variant="h4" component="h2">
                Update profile
            </Typography>

            {formSubmitted ? (
                <Typography variant="h6" component="h2">
                    Update submitted!
                </Typography>
            ) : (
                <ScrollDialog content={<UpdateForm onSubmit={handleSubmit}  />} buttonText="Open update"  />
            )}


        </>
    );
}
export default ProfilePage;