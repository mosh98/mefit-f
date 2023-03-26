import { Typography } from '@mui/material';
import { Exercise, Workout } from '../../const/interface';

interface WorkoutSummaryProps {
    workout: Workout;
}

const WorkoutSummary = ({ workout }: WorkoutSummaryProps) => {
    return (
        <div>
            <Typography variant="h5">Workout Summary</Typography>
            <Typography>Name: {workout.name}</Typography>
            <Typography>Type: {workout.type}</Typography>
            <Typography>Experience Level: {workout.experienceLevel}</Typography>
            <Typography>Exercises:</Typography>
            <ul>
                {workout.exercises && workout.exercises.map((exercise: Exercise, index: number) => (
                    <li key={index}>{exercise.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutSummary;
