import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GoalsCards from './GoalsCards';
import ProgramWorkoutCards from './ProgramWorkoutCards';
import { useState } from 'react';
import {SortByExperienceLevel} from "../../SortByExperienceLevel";
import useWorkouts from "../../../hooks/useWorkouts";
import WorkoutSummary from "../../workouts/WorkoutSummary";


const steps = ['What is your goal?', 'What is your Level?', 'Select a program or workouts.'];

function SetGoal() {
    const {workouts, isLoading, isError} = useWorkouts();
    const [content, setContent] = useState(<GoalsCards />);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [goal, setGoal] = useState(null);
    const [level, setLevel] = useState(null);
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error...</div>;
    }
    if (!workouts) {
        return <div>Not found...</div>;
    }

    const profile = JSON.parse(localStorage.getItem('profile'));

    function handleSelectedExperienceChange(experience) {
        setLevel(experience)
        console.log("handleSelectedExperienceChange", experience);
    }

    const workoutsBySelectedExperience = workouts.filter((workout) => {
        return !level || workout.experienceLevel === level;
    });
    const handleWorkoutSelection = (selectedWorkouts) => {
        setSelectedWorkouts(selectedWorkouts);
        console.log("Selected Workouts:", selectedWorkouts);
    };

    const stepsContent = [
        <GoalsCards setGoal={setGoal} goal={goal} />,
        <SortByExperienceLevel onUserExperienceChange={handleSelectedExperienceChange} />,
        <ProgramWorkoutCards
            sortedWorkouts={workoutsBySelectedExperience}
            onWorkoutSelection={handleWorkoutSelection}
        />
    ];

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }


        if (activeStep === 0) {
            setContent(<SortByExperienceLevel
                onUserExperienceChange={handleSelectedExperienceChange} />);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

        switch (activeStep) {
            case 1:
                setGoal(null); // reset the state of the GoalsCards component
                break;
            case 2:
                setLevel(null); // reset the state of the LevelsCards component
                break;
            default:
                break;
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function handleSubmit() {

        console.log(
            "Goal: ", profile.goal,
            "Profile id: ", profile.id,
            "Level: ", level,
            "Workouts: ", selectedWorkouts
        )

    }


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{mt: 2}}>
                        <p>Hej</p>


                        <Typography>
                            profile id: {profile.id}
                            goal id: {profile.goal}
                        </Typography>

                        {selectedWorkouts.map((workout) => (
                            <WorkoutSummary workout={workout} />
                        ))
                        }
                        <Button onClick={handleSubmit}>Submit</Button>




                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>

                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>

                    {stepsContent[activeStep]}
                    {/* // render the component corresponding to the active step */}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >

                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}

        </Box>
    );
}
export default SetGoal;