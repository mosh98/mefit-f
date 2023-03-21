import keycloak from "../keycloak";
import {Typography} from "@mui/material";
import ScrollDialog from "../components/dialogs/ScrollDialog";
import {useState} from "react";
import Box from "@mui/material/Box";
import CreateUser from "../components/forms/CreateUser";

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

    roles?: string[];
}

function ProfilePage() {

    const tokenParsed = keycloak.tokenParsed as {
        name?: string;
        given_name?: string;
        family_name?: string;
        preferred_username?: string;
        sub?: string;
        email?: string };

    const user: User = {
        name: tokenParsed.name || '',
        firstName: tokenParsed.given_name || '',
        lastName: tokenParsed.family_name || '',
        username: tokenParsed.preferred_username || '',
        sub: tokenParsed.sub || '',
        email: tokenParsed.email || '',
        roles: keycloak.tokenParsed?.realm_access?.roles || [],
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
                    <Typography>First name: { user?.firstName }</Typography>
                    <Typography>Last name: { user?.lastName }</Typography>
                    <Typography>Username: { user?.username}</Typography>
                    <Typography>Sub: { user?.sub }</Typography>
                    <Typography>Email: { user?.email }</Typography>
                    {user.roles && (
                        <>
                            <Typography variant="h6" component="h3">
                                Roles
                            </Typography>
                            <ul>
                                {user.roles.map((role, index) => (
                                    <li key={index}>{role}</li>
                                ))}
                            </ul>
                        </>
                    )}

                </Box>
            }
            <Typography variant="h4" component="h2">
                Create User!
            </Typography>

            {formSubmitted ? (
                <Typography variant="h6" component="h2">
                    Update submitted!
                </Typography>
            ) : (
                <ScrollDialog content={<CreateUser onSubmit={handleSubmit}  />} buttonText="Open create new user"  />
            )}
        </>
    );
}
export default ProfilePage;