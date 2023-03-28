import {Card, CardContent, Typography} from "@mui/material";
import useUsers from "../hooks/useUsers";
import UserTable from "../components/profile/UserTable";
import keycloak from "../keycloak";
import React from "react";
import {Box} from "@mui/system";

function AdminPage() {

    const {users, error} = useUsers();
    console.log(users);


    return (
        <Box className={"page-view"}>
            <Typography variant="h2" component="h1">
                Admin Page
            </Typography>
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
            <div>
                <h1>Users List</h1>
                <UserTable users={users} error={error}/>
            </div>
        </Box>
    );
}

export default AdminPage;