import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Typography} from "@mui/material";
import {goalsFvie} from "./mockGoals";

export const NumberCards = () => {
    let totalWorkouts = 0;
    let achievedWorkouts = 0;
    let remainingWorkouts = 0;

    goalsFvie.forEach(goalWorkout => {
        goalWorkout.workouts.forEach(workout => {
            totalWorkouts += 1;

            if (workout.completed) {
                achievedWorkouts += 1;
            } else {
                remainingWorkouts += 1;
            }
        });
    });

    return (
        <div>
            <Card sx={{maxWidth: 500}}>
                <CardContent sx={{width: '100%', padding: '20px'}}>
                    <Typography sx={{fontSize: 18, lineHeight: '24px'}} color="text.secondary" gutterBottom>
                        Remaining Workouts
                    </Typography>
                    <Typography variant="body2" sx={{whiteSpace: 'pre-line'}}>
                        {remainingWorkouts}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{maxWidth: 500}}>
                <CardContent sx={{width: '100%', padding: '20px'}}>
                    <Typography sx={{fontSize: 18, lineHeight: '24px'}} color="text.secondary" gutterBottom>
                        Completed Workouts
                    </Typography>
                    <Typography variant="body2" sx={{whiteSpace: 'pre-line'}}>
                        {achievedWorkouts}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{maxWidth: 500}}>
                <CardContent sx={{width: '100%', padding: '20px'}}>
                    <Typography sx={{fontSize: 18, lineHeight: '24px'}} color="text.secondary" gutterBottom>
                        Total Workouts
                    </Typography>
                    <Typography variant="body2" sx={{whiteSpace: 'pre-line'}}>
                        {totalWorkouts}
                    </Typography>
                </CardContent>
            </Card>*
        </div>
    );
};