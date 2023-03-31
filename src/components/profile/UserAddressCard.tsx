import {Card, CardActions, CardContent, Typography} from "@mui/material";
import ScrollDialog from "../../components/dialogs/ScrollDialog";
import AddressForm from "../../components/forms/AddressForm";
import React, {useEffect, useState} from "react";
import axios from "axios";
import keycloak from "../../keycloak";
import {useMeFitContext} from "../../MeFitMyContext";
import {UserAddress as User} from "../../const/interface";

interface UserDetailsCardProps {
    user: User;
    onSubmit: () => void;
}

export function UserAddressCard({ user, onSubmit }: UserDetailsCardProps) {
    const {profile} = useMeFitContext();
    const [userObject, setUserObject] = useState({
        address: "",
        post_code: "",
        city: "",
        country: "",
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);



    //create user adress object

    //TODO: useeffect to populate user info
    //https://database-mefit.herokuapp.com/addresses/addressByUserId/1

    useEffect(() => {



        const fetchAdress = async () => {
            const response = await axios.get(`https://database-mefit.herokuapp.com/addresses/addressByUserId/${profile?.user}`, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                }
            })

            setUserObject({  address: response.data.address,
                post_code: response.data.post_code,
                city: response.data.city,
                country:response.data.country,})

        }


        fetchAdress();


    },[isFormSubmitted]);
    const handleFormSubmit = () => {
        if (isFormSubmitted == true){

            setIsFormSubmitted(false);
        }else {
            setIsFormSubmitted(true);
        }
    };


    return (
        <>
            <Card sx={{ maxWidth: 400 }}>
                <CardContent sx={{ width: '100%', padding: '20px' }}>
                    <Typography sx={{ fontSize: 20, lineHeight: '24px', marginBottom: '20px' }} color="text.secondary" gutterBottom>
                        User details
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 16 }}>
                        Address: {userObject.address} <br />
                        Postal code: {userObject.post_code} <br />
                        City: {userObject.city} <br />
                        Country: {userObject.country} <br />
                    </Typography>
                    <CardActions>
                        <ScrollDialog  content={<AddressForm onSubmit={handleFormSubmit} headerText={"Update info"} />} buttonText="Update" headerText="Update info"  />
                    </CardActions>
                </CardContent>
            </Card>
        </>
    );
}

export default UserAddressCard;