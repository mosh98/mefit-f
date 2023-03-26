import {Fragment, useState} from 'react';
import {Box, Button, Stepper, Step, StepLabel, Typography, Stack} from '@mui/material';
import WorkoutForm from "../forms/create-forms/WorkoutForm";
import TransferList from "../TransferList";
import * as React from "react";
import {SortExercises} from "../SortExercises";
import useExercises from "../../hooks/useExcerises";
import {Exercise, Workout} from "../../const/interface";
import WorkoutSummary from "./WorkoutSummary";
import {postWorkout} from "../../api/workouts";
import {useNavigate} from "react-router-dom";

const steps = ['Select Experience level', 'Create workout', 'Review and submit'];

export default function CreateWorkoutStepper() {
    const { exercises, error } = useExercises() as {
        exercises: Exercise[] | null;
        error: Error | null;
    };
    const navigate = useNavigate();
    const [selectedUserExperience, setSelectedUserExperience] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<Workout>({
        name: '',
        type: '',
        exercises: [],
        experienceLevel: '',
    });

    if (error) return <div>Failed to load workouts</div>;
    if (!exercises) return <div>Loading...</div>;

    const handleWorkoutFormSubmit = () => {
        //TODO: Remove this
    };

    const handleWorkoutInputChange = (newFormData: Workout) => {
        setFormData({ ...formData, ...newFormData, experienceLevel: selectedUserExperience });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(formData);
        const workoutData = {
            name: formData.name,
            type: formData.type,
            experienceLevel: formData.experienceLevel,
            exercises: formData.exercises
        };

        console.log(workoutData);

        const {workout, error} = await postWorkout(workoutData);
        if (error) {
            console.error("Failed to create workout:", error);
        } else {
            console.log("Workout created successfully:", workout);
        }

        setTimeout(() => {
         resetForm();
        navigate('/workout');
        }, 500);
    };

    const handleStepBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const resetForm = () => {
        setActiveStep(0);
        setSelectedUserExperience('');
        setFormData({
            name: '',
            type: '',
            exercises: [],
            experienceLevel: '',
        });
    };

    const handleSelectedExperienceChange = (experience: string) => {
        setSelectedUserExperience(experience);
    };

    const exercisesBySelectedExperience = exercises.filter((exercise) => {
        return !selectedUserExperience || exercise.userExperience === selectedUserExperience;
    });

    const updateSelectedExercises = (selectedExercises: Exercise[]) => {
        setFormData({ ...formData, exercises: selectedExercises });
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
                </Fragment>
            ) : (
                <Fragment>
                    {activeStep === 0 && (
                        <SortExercises
                            onUserExperienceChange={handleSelectedExperienceChange}/>
                    )}
                    {activeStep === 1 && (
                        <Stack spacing={2}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <WorkoutForm
                                    onSubmit={handleWorkoutFormSubmit}
                                    onInputChange={handleWorkoutInputChange}
                                    mode="create"/>

                                <TransferList
                                    exercises={exercisesBySelectedExperience}
                                    onUpdateRightList={updateSelectedExercises}
                                    onUpdateButtonClick={() => setActiveStep(2)} // Pass the new prop
                                />
                            </Stack>
                        </Stack>
                    )}
                    {activeStep === 2 && (
                        <Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>Review and submit</Typography>
                            <Box sx={{mt: 2}}>
                                <p>Hej</p>

                                <WorkoutSummary workout={formData} />

                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', pt: 2}}>
                                <Button variant="contained" size="large" onClick={handleStepBack}
                                        sx={{mr: 1, width: '8em'}}>
                                    Back
                                </Button>
                                <Button variant="contained" size="large" onClick={handleSubmit}
                                        sx={{width: '8em'}}>
                                    Submit
                                </Button>
                            </Box>
                        </Fragment>
                    )}
                    {activeStep !== steps.length -1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                            {activeStep !== 0 && (
                                <Button variant="contained" size="large" onClick={handleStepBack} sx={{ mr: 1, width: '8em' }}>
                                    Back
                                </Button>
                            )}
                            {activeStep !== steps.length - 1 && (
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => setActiveStep(activeStep + 1)}
                                    sx={{ width: '8em' }}
                                    disabled={activeStep === 0 && !selectedUserExperience} // Disable the "Next" button if no experience level is selected
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    )}
                </Fragment>
            )}
        </Box>
    );
}