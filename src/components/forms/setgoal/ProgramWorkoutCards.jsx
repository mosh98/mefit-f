import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions} from '@mui/material';
import {useState} from 'react';
import WorkoutListCheckmark from "../../workouts/WorkoutCheckmark";
import FullWidthDialog from "../../dialogs/FullWidthDiaglog";


function ProgramWorkoutCards({sortedWorkouts, onWorkoutSelection}) {
    const [selectedValue, setSelectedValue] = React.useState('1');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [picks, setPicks] = useState([
            {
                id: 1,
                // name: "Pick a program",
                name: "Recommended Workout",
                description: "Pick a pre-made program to set as your goal for the week",
                //button_name: "Pick a program"
                button_name: "Pick recommended"
            },
            {
                id: 2,
                name: "Pick workouts",
                description: "Pick and choose your own workouts to set as your goal",
                button_name: "Pick workouts"
            },

        ]
    )

    const numWorkouts = sortedWorkouts.length;
    const randomIndex = Math.floor(Math.random() * numWorkouts); // generates a random index between 0 and numWorkouts - 1
    const randomWorkouts = sortedWorkouts.slice(randomIndex, randomIndex + 4);


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {picks.map((pick) => (
                <Card sx={{width: 400, height: 200, margin: '0.5rem'}} key={pick.id}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" style={{
                                textAlign: 'center'
                            }}>
                                {pick.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {pick.description}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    {pick.id === 1 ? (
                        <CardActions
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '1rem'
                            }}>
                            <FullWidthDialog
                                content={<WorkoutListCheckmark
                                    mode={'select'}
                                    workouts={randomWorkouts}
                                    onWorkoutSelection={onWorkoutSelection}
                                />}
                                buttonText={pick.button_name}
                                headerText={`Update exercise ${pick.button_name}`}
                            />
                        </CardActions>) : (
                        <CardActions
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '1rem'
                            }}>
                            <FullWidthDialog
                                content={<WorkoutListCheckmark
                                    mode={'select'}
                                    workouts={sortedWorkouts}
                                    onWorkoutSelection={onWorkoutSelection}
                                />}
                                buttonText={pick.button_name}
                                headerText={`Update exercise ${pick.button_name}`}
                            />
                        </CardActions>
                    )
                    }

                </Card>
            ))}
        </div>

    );
}

export default ProgramWorkoutCards;