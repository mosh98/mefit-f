import {Button, Stack, TextField, Typography, Container} from '@mui/material';
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import keycloak from "../../keycloak";
import axios from "axios";
import {fetchProfileByKeycloakId} from "../../api/profile";

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
    const localProfile = JSON.parse(localStorage.getItem('profile') || '{}');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<AddressFormData>({
        address: "",
        post_code: "",
        city: "",
        country: "",
    });
    const [profile, setProfile] = useState<any>(null);

    //https://database-mefit.herokuapp.com/addresses/addressByUserId/1
    useEffect(() => {

        console.log("profile local Adressform: ", localProfile.user);
       // console.log("Adressform mounted:", profile.user);
        const fetchAdress = async () => {
            const response = await axios.get(`https://database-mefit.herokuapp.com/addresses/addressByUserId/${localProfile?.user}`, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                }
            })
            setFormData(response.data)

        }
        fetchAdress();

    },[]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    //TODO: is this necessary?
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(formData);
        onSubmit(formData);
    };

    const updateAddress = async (id: number, data: any) => {
        try {
            const response = await axios.patch(`https://database-mefit.herokuapp.com/addresses/updateAddress/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    };

    const handleClick = () => {
        console.log(formData);
        onSubmit(formData)
        //TODO: update user profile in server

        //get profile from local storage
        const profile:  Record<string, any>  = JSON.parse(localStorage.getItem('profile') || '{}');
        const address_id: number = localProfile.address
        updateAddress(address_id, formData)
        setIsModalOpen(true);
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
                        onClick={handleClick}
                    >
                        Update
                    </Button>
                </Stack>
            </form>
            )}
        </Container>
    );
}

export default AddressForm;