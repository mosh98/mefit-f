import {Card, CardActions, CardContent, Typography} from "@mui/material";
import ScrollDialog from "../../components/dialogs/ScrollDialog";
import ProfileForm from "../../components/forms/ProfileForm";
import React from "react";
import {UserProfile} from "../../const/interface";
import {updateProfile} from "../../api/profile";
import {useMeFitContext} from "../../MeFitMyContext";

interface User {
    weight?: number;
    height?: number;
    disabilities?: string;
    medicalCondition?: string;
    profileImage?: string;
}

interface UserMedicalCardProps {
    user: User;
    onSubmit: () => void;
}

function UserMedicalCard({user, onSubmit}: UserMedicalCardProps) {
    const {profile, fetchProfileData} = useMeFitContext();

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (values: UserProfile) => {
        // Call your API to update the user profile here
        const {profile: updatedProfile, error} = await updateProfile(values, profile?.id);

        if (error) {
            // Handle the error here, e.g. show an error message to the user
            console.log("Error updating profile", error);
        } else {
            // Update the profile in the context
            fetchProfileData();
        }
    }

    return (
        <Card sx={{maxWidth: 400}}>
            <CardContent sx={{width: '100%', padding: '20px'}}>
                <Typography sx={{fontSize: 20, lineHeight: '24px', marginBottom: '20px'}} color="text.secondary"
                            gutterBottom>
                    User Medical Info
                </Typography>
                <Typography variant="body2" sx={{fontSize: 16}}>
                    Weight: {user.weight} <br/>
                    Height: {user.height} <br/>
                    Disabilities: {user.disabilities} <br/>
                    Medical Conditions: {user.medicalCondition} <br/>
                </Typography>
                <CardActions>
                    <ScrollDialog
                        content={<ProfileForm user={user} onSubmit={handleSubmit} headerText={"Update info"}/>}
                        buttonText="Update" headerText="Update info"/>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default UserMedicalCard;
