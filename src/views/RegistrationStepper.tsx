import { Fragment, useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import AvatarSelector from '../components/forms/AvatarSelector';
import ProfileForm from '../components/forms/ProfileForm';
import {updateProfile} from "../api/profile";

const steps = ['Select avatar', 'Fill out profile form', 'Review and submit'];

const userProfile = JSON.parse(localStorage.getItem('profile') || '{}');
const profileId = userProfile.id;

console.log("profileId ", profileId);

export default function RegistrationStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        profileImg: null,
        weight: 0,
        height: 0,
        disabilities: '',
        medicalConditions: '',
    });

    const handleAvatarSelect = (profileImg: any) => {
        setFormData({ ...formData, profileImg });
    };

    const handleAvatarSubmit = (profileImg: any) => {
        setFormData({ ...formData, profileImg });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(formData); // send formData to backend

    };

    const handleProfileFormSubmit = (newFormData: any) => {
        setFormData({ ...formData, ...newFormData });
        setActiveStep(2);
        console.log(newFormData); // send formData to backend

    };

    const handleRegistrationSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(profileId); // send formData to backend
        await updateProfile(formData,profileId);
        console.log(formData); // send formData to backend

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
            medicalConditions: '',
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
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
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
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
                        />                    )}
                    {activeStep === 1 && (
                        <ProfileForm onSubmit={handleProfileFormSubmit} headerText="Profile form" />
                    )}
                    {activeStep === 2 && (
                        <Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>Review and submit</Typography>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ mb: 1 }}>Please review your information:</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Avatar:</Typography>
                                        <img src={`${formData.profileImg}`} alt="avatar" style={{ width: "100px", height: "100px"}}/>
                                    </Box>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Weight:</Typography>
                                        <Typography>{formData.weight}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Height:</Typography>
                                        <Typography>{formData.height}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Disabilities:</Typography>
                                        <Typography>{formData.disabilities}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Medical conditions:</Typography>
                                        <Typography>{formData.medicalConditions}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                                <Button variant="contained" size="large" onClick={handleBack} sx={{ mr: 1, width: '8em' }}>
                                    Back
                                </Button>
                                <Button variant="contained" size="large" onClick={handleRegistrationSubmit} sx={{ width: '8em' }}>
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
