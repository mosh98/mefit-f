import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import keycloak from "../../keycloak";

interface RegisterFormProps {
    onSubmit: () => void;
}

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    weight: number;
    height: number;
    disabilities?: string;
    medicalConditions?: string;
}

function UpdateForm({onSubmit}: RegisterFormProps) {
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: keycloak.tokenParsed?.given_name,
        lastName: keycloak.tokenParsed?.family_name,
        email: keycloak.tokenParsed?.email,
        password: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        weight: 0,
        height: 0,
        disabilities: '',
        medicalConditions: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Container maxWidth="xs">
            <Stack direction="column" spacing={3}>
                <Typography variant="h4" component="h1">
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="firstName"
                        type="text"
                        label="First Name"
                        variant="standard"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        id="lastName"
                        type="text"
                        label="Last Name"
                        variant="standard"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        id="email"
                        type="email"
                        label="Email"
                        variant="standard"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        variant="standard"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        id="address"
                        type="text"
                        label="Address"
                        variant="standard"
                        required
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <TextField
                        id="postalCode"
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        type="text"
                        label="Postal Code"
                        variant="standard"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                    <TextField
                        id="city"
                        type="text"
                        label="City"
                        variant="standard"
                        required
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <TextField
                        id="country"
                        type="text"
                        label="Country"
                        variant="standard"
                        required
                        value={formData.country}
                        onChange={handleChange}
                    />
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
                        id="medicalConditions"
                        type="text"
                        label="Medical Conditions"
                        variant="standard"
                        value={formData.medicalConditions}
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
                </form>
            </Stack>
        </Container>
    );
}

export default UpdateForm;