import {Card, CardActions, CardContent, Typography} from "@mui/material";
import ScrollDialog from "../../components/dialogs/ScrollDialog";
import AddressForm from "../../components/forms/AddressForm";
import React from "react";

interface User {
    address: string;
    post_code: string;
    city: string;
    country: string;

}

interface UserDetailsCardProps {
    user: User;
    onSubmit: () => void;
}

export function UserAddressCard({ user, onSubmit }: UserDetailsCardProps) {

    return (
        <>
            <Card sx={{ maxWidth: 400 }}>
                <CardContent sx={{ width: '100%', padding: '20px' }}>
                    <Typography sx={{ fontSize: 20, lineHeight: '24px', marginBottom: '20px' }} color="text.secondary" gutterBottom>
                        User details
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 16 }}>
                        Address: {user.address} <br />
                        Postal code: {user.post_code} <br />
                        City: {user.city} <br />
                        Country: {user.country} <br />
                    </Typography>
                    <CardActions>
                        <ScrollDialog content={<AddressForm onSubmit={onSubmit} headerText={"Update info"} />} buttonText="Update" headerText="Update info" />
                    </CardActions>
                </CardContent>
            </Card>
        </>
    );
}

export default UserAddressCard;