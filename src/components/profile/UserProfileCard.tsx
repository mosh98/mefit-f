import keycloak from "../../keycloak";
import {Card, CardContent, Typography} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

interface UserProfileCardProps {
    user: User;
}

interface User {
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    sub: string;
    email: string;
    roles?: string[];
}

function UserProfileCard({ user }: UserProfileCardProps) {
    return (
        <>
        <Card sx={{ maxWidth: 400 }}>
            <CardContent sx={{ width: '100%', padding: '20px' }}>
                {keycloak.tokenParsed && user.roles && (
                    <>
                        <Typography sx={{ fontSize: 20, lineHeight: '24px', marginBottom: '20px' }} color="text.secondary" gutterBottom>
                            Username: {user?.username}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 16 }}>
                            Name: {user?.name} <br />
                            Sub: {user?.sub} <br />
                            Email: {user?.email} <br />
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: 18, marginTop: '20px' }} color="text.secondary">
                            Roles
                        </Typography>
                        <List sx={{ margin: 0, paddingInlineStart: '20px' }}>
                            {user.roles
                                .filter((role) => role === "ADMIN" || role === "USER")
                                .map((role, index) => (
                                    <ListItem sx={{ fontSize: 16, paddingBottom: 0 }} key={index}>{role}</ListItem>
                                ))}
                        </List>
                    </>
                )}
            </CardContent>
        </Card>
        </>
    );
}

export default UserProfileCard;
