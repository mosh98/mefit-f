import {Card, CardActions, CardContent, Typography} from "@mui/material";
import ScrollDialog from "../../components/dialogs/ScrollDialog";
import ProfileForm from "../../components/forms/ProfileForm";
import {useProfileDetailByKeycloakId} from "../../hooks/useProfileDetail";
import keycloak from "../../keycloak";
import React from "react";

interface User {
    weight?: number;
    height?: number;
    disabilities?: string;
    medicalConditions?: string;
    profileImage?: string;
}

interface UserMedicalCardProps {
    user: User;
    onSubmit: () => void;
}

function UserMedicalCard({ onSubmit }: UserMedicalCardProps) {

    const user: User = {
        // weight: userInfo.profile.weight
        weight: 0,
        //  height: userInfo.profile.height ,
        height: 0,
        //  disabilities: userInfo.profile.disabilities || '',,
        disabilities: "hehe" || '',
        //  medicalConditions: userInfo.profile.medicalConditions
        medicalConditions: '',
    };

    const userInfo = useProfileDetailByKeycloakId(keycloak.tokenParsed?.sub);

    if (!userInfo) {
        return <div>Loading...</div>;
    }
    if (userInfo.error) {
        return <div>Error: {userInfo.error}</div>;
    }


    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardContent sx={{ width: '100%', padding: '20px' }}>
                <Typography sx={{ fontSize: 20, lineHeight: '24px', marginBottom: '20px' }} color="text.secondary" gutterBottom>
                    User Medical Info
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 16 }}>
                    Medical Conditions: {user.medicalConditions} <br />
                    Weight: {user.weight} <br />
                    Height: {user.height} <br />
                    Disabilities: {user.disabilities} <br />
                    Medical Conditions: {user.medicalConditions} <br />
                </Typography>
                <CardActions>
                    <ScrollDialog content={<ProfileForm onSubmit={onSubmit} headerText={"Update info"} />} buttonText="Update" headerText="Update info" />
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default UserMedicalCard;
