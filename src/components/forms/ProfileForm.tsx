import {Button, Stack, TextField, Typography, Container} from '@mui/material';
import React, {ChangeEvent, FormEvent, useState} from "react";

interface ProfileFormData {

    weight?: number;
    height?: number;
    disabilities?: string;
    medicalCondition?: string;
    profileImage?: string;
}
interface ProfileFormProps {
    user?: ProfileFormData;
    onSubmit: (values: any) => void;
    headerText: string;
}

function ProfileForm({ user, onSubmit, headerText}: ProfileFormProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>({
        profileImage: user?.profileImage || '',
        weight: user?.weight || 0,
        height: user?.height || 0,
        disabilities: user?.disabilities || '',
        medicalCondition: user?.medicalCondition || '',
    });
    const [isComplete, setIsComplete] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        /*        console.log("formData ", formData);
                setIsModalOpen(true)*/
        setIsComplete(true);

    };

    return (
        <Container maxWidth="xs">
            {isModalOpen ? <p>Update successfully</p> : (
            <form onSubmit={handleSubmit}>
                <Stack direction='column' spacing={3}>
                    <Typography variant="h4" component="h1">
                        {headerText}
                    </Typography>
                    <TextField
                        id="weight"
                        type="number"
                        label="Weight"
                        variant="standard"
                        required
                        value={formData.weight}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        id="height"
                        type="number"
                        label="Height"
                        variant="standard"
                        required
                        value={formData.height}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        id="disabilities"
                        type="text"
                        label="Disabilities"
                        variant="standard"
                        value={formData.disabilities}
                        onChange={handleChange}
                    />
                    <TextField
                        id="medicalCondition"
                        type="text"
                        label="Medical Conditions"
                        variant="standard"
                        value={formData.medicalCondition}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disableElevation
                    >
                        Update Now
                    </Button>

                    {isComplete && (
                    <div  style={{ display: "flex", justifyContent: "center" }}>
                    The content is updated!</div>
                    )}

                </Stack>
            </form>
            )}
        </Container>
    );
}

export default ProfileForm;