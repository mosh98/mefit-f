import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface User {
    id: number,
    first_name: string,
    last_name: string,
    e_mail: string,
    profile: number,
    keyCloakId: number,
    userType: string,
}

interface UserTableProps {
    users: any | null,
    error: string | null,
}


export default function UserTable(props: UserTableProps) {

    const { users, error } = props;

    if (error) {
        return <p>{error}</p>;
    }

    if (!users) {
        return <p>Loading workouts...</p>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User id</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell align="right">Last name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Profile id</TableCell>
                        <TableCell align="right">keyCloak Id</TableCell>
                        <TableCell align="right">Roles</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user: User) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="right">{user.first_name}</TableCell>
                            <TableCell align="right">{user.last_name}</TableCell>
                            <TableCell align="right">{user.e_mail}</TableCell>
                            <TableCell align="right">{user.profile}</TableCell>
                            <TableCell align="right">{user.keyCloakId}</TableCell>
                            <TableCell align="right">{user.userType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
