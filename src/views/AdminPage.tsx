import {Typography} from "@mui/material";
import useUsers from "../hooks/useUsers";
import UserTable from "../components/profile/UserTable";

function AdminPage() {

    const {users, error} = useUsers();
    console.log(users);


    return (
        <>
            <Typography variant="h2" component="h1">
                Admin Page
            </Typography>

            <div>
                <h1>Users List</h1>
                <UserTable users={users} error={error}/>
            </div>
        </>
    );
}

export default AdminPage;