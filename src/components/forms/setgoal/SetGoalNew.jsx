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
import {SortByTargetArea} from '../../SortByTargetArea';
import {SortByExperienceLevel} from "../../SortByExperienceLevel";
import useWorkouts from "../../../hooks/useWorkouts";
import WorkoutSummary from "../../workouts/WorkoutSummary";
import axios from "../../../api";
import keycloak from "../../../keycloak";


const steps = ['What is your Taget Area?', 'What is your Level?', 'Select a program or workouts.'];

function SetGoal() {
    const {workouts, isLoading, isError} = useWorkouts();  // steg 1
    const [content, setContent] = useState(<SortByTargetArea />);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    //const [goal, setGoal] = useState(null);  // ska bli nr 2 (targeteria)
    const [targetArea, setTargetArea] = useState(null);
    const [level, setLevel] = useState(null); // steg 2, ska bli 3
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

    function handleSelectedTargetAreaChange(targetArea) {
        setTargetArea(targetArea)
        console.log("handleSelectedTargetAreaChange", targetArea);
    }

    function handleSelectedExperienceChange(experience) {
        setLevel(experience)
        console.log("handleSelectedExperienceChange", experience);
    }

    const workoutsBySelectedTargetArea = workouts.filter((workout) => {
        return !targetArea || workout.type === targetArea;
        
    });

    console.log("TargetArea "+level)


    const workoutsBySelectedExperience = workoutsBySelectedTargetArea.filter((workout) => {
        return !level || workout.experienceLevel === level;
        
    });
    
    
    console.log("level "+level)

    const handleWorkoutSelection = (selectedWorkouts) => {
        setSelectedWorkouts(selectedWorkouts);
        console.log("Selected Workouts:", selectedWorkouts);
    };

    const stepsContent = [
        <SortByTargetArea 
            onUserTargetAreaChange={handleSelectedTargetAreaChange} />,
        <SortByExperienceLevel 
            onUserExperienceChange={handleSelectedExperienceChange} />,
        <ProgramWorkoutCards
            sortedWorkouts={ workoutsBySelectedExperience}
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
                setTargetArea(null); // reset the state of the GoalsCards component
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

    const handleSubmit = async () => {
        const id = keycloak.tokenParsed.sub
        const workoutId = selectedWorkouts.map(item => item.id);
        const dataForm = {
            keyCloakId: id,
            workouts: workoutId
        }

      try {
            const response = await axios.patch(`https://database-mefit.herokuapp.com/goal/addWorkoutToGoal/${id}`, dataForm, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data)
            return {goal: response.data, error: null};
        } catch (error) {
            return {goal: null, error: error.message};
        }
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
                            <WorkoutSummary key={workout.id} workout={workout} />
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