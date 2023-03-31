import {Fragment, useEffect, useState} from 'react';
import {Box, Button, Stepper, Step, StepLabel, Typography} from '@mui/material';
import AvatarSelector from '../components/forms/AvatarSelector';
import ProfileForm from '../components/forms/ProfileForm';
import {fetchProfileByKeycloakId, updateProfile} from "../api/profile";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useNavigate} from "react-router-dom";
import keycloak from "../keycloak";
import {useMeFitContext} from "../MeFitMyContext";
const steps = ['Select avatar', 'Fill out profile form', 'Review and submit'];


export default function RegistrationStepper() {
    const {profile, fetchProfileData} = useMeFitContext();
    const profileId = profile?.id;

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        profileImg: null,
        weight: 0,
        height: 0,
        disabilities: '',
        medicalCondition: '',
    });
    const navigate = useNavigate();

    const handleAvatarSelect = (profileImg: any) => {
        setFormData({...formData, profileImg});
    };

    const handleAvatarSubmit = (profileImg: any) => {
        setFormData((prevFormData) => ({ ...prevFormData, profileImg }));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleProfileFormSubmit = (newFormData: any) => {
        setFormData((prevFormData) => ({ ...prevFormData, ...newFormData }));
        setActiveStep(2);
    };

    const handleRegistrationSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const {profile: updatedProfile, error} = await updateProfile(formData, profile?.id);

        if (error) {
            // Handle the error here, e.g. show an error message to the user
            console.log("Error updating profile", error);
        } else {
            // Update the profile in the context
            fetchProfileData();
        }

        navigate("/dashboard");
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setFormData({
            profileImg: null,
            weight: 0,
            height: 0,
            disabilities: '',
            medicalCondition: '',
        });
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <Fragment>
                    <Typography sx={{mt: 2, mb: 1}}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </Fragment>
            ) : (
                <Fragment>
                    {activeStep === 0 && (
                        <AvatarSelector
                            onSelect={handleAvatarSelect}
                            handleSubmit={handleAvatarSubmit}
                            headerText="Select your avatar"
                        />)}
                    {activeStep === 1 && (
                        <ProfileForm onSubmit={handleProfileFormSubmit} headerText="Profile form"/>
                    )}
                    {activeStep === 2 && (
                        <Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>Review and submit</Typography>
                            <Box sx={{mt: 2}}>
                                <Typography sx={{mb: 1}}>Please review your information:</Typography>
                                <Card sx={{width: 275}}>
                                    <CardContent>

                                        <Box sx={{display: 'flex', mb: 1}}>
                                            <Typography sx={{fontWeight: 'bold', mr: 1}}>Avatar:</Typography>
                                            <img src={`${formData.profileImg}`} alt="avatar"
                                                 style={{width: "100px", height: "100px"}}/>
                                        </Box>
                                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                            <Typography sx={{fontWeight: 'bold', mr: 1}}>Weight:</Typography>
                                            <Typography>{formData.weight}</Typography>

                                            <Typography sx={{fontWeight: 'bold', mr: 1}}>Height:</Typography>
                                            <Typography>{formData.height}</Typography>

                                            <Typography sx={{fontWeight: 'bold', mr: 1}}>Disabilities:</Typography>
                                            <Typography>{formData.disabilities}</Typography>

                                            <Typography sx={{fontWeight: 'bold', mr: 1}}>Medical
                                                conditions:</Typography>
                                            <Typography>{formData.medicalCondition}</Typography>

                                        </Box>
                                    </CardContent>
                                </Card>

                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', pt: 2}}>
                                <Button variant="contained" size="large" onClick={handleBack}
                                        sx={{mr: 1, width: '8em'}}>
                                    Back
                                </Button>
                                <Button variant="contained" size="large" onClick={handleRegistrationSubmit}
                                        sx={{width: '8em'}}>
                                    Submit
                                </Button>
                            </Box>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Box>
    );
}
