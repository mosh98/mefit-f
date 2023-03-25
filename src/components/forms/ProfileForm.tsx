import {Button, Stack, TextField, Typography, Container} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from "react";

interface ProfileFormProps {

    onSubmit: (values: any) => void;
    headerText: string;
}

interface ProfileFormData {
  //  profileImg: string;
    weight: number;
    height: number;
    disabilities?: string;
    medicalCondition?: string;
}

function ProfileForm({onSubmit, headerText}: ProfileFormProps) {
    const [formData, setFormData] = useState<ProfileFormData>({
     //   profileImg: '',
        weight: 0,
        height: 0,
        disabilities: '',
        medicalCondition: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        console.log("formData ", formData);
    };

    return (
        <Container maxWidth="xs">
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
                    />
                    <TextField
                        id="height"
                        type="number"
                        label="Height"
                        variant="standard"
                        required
                        value={formData.height}
                        onChange={handleChange}
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
                        Update
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default ProfileForm;