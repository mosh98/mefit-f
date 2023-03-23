import {Button, Stack, TextField, Typography, Container} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from "react";

interface AddressFormProps {
    onSubmit: (values: any) => void;
    headerText: string;
}

interface AddressFormData {
    address: string,
    post_code: string,
    city: string,
    country: string,
}

function AddressForm({onSubmit, headerText}: AddressFormProps) {
    const [formData, setFormData] = useState<AddressFormData>({
        address: "",
        post_code: "",
        city: "",
        country: "",
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        onSubmit(formData);
    };

    return (
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <Stack direction='column' spacing={3}>
                    <Typography variant="h4" component="h1">
                        {headerText}
                    </Typography>
                    <TextField
                        id="address"
                        type="text"
                        label="Address"
                        variant="standard"
                        //  required
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <TextField
                        id="post_code"
                        type="text"
                        label="Post code"
                        variant="standard"
                        required
                        value={formData.post_code}
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
                        value={formData.country}
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

export default AddressForm;