import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Stack, Typography} from "@mui/material";
import {goalsFvie} from "./mockGoals";
import WorkoutListCheckmark from "../workouts/WorkoutCheckmark";
import {UserGoal, Workout} from "../../const/interface";

interface NumberCardsProps {
    goals: UserGoal[];
}

export const NumberCards = ({ goals }: NumberCardsProps) => {
    let totalWorkouts = 0;
    let achievedWorkouts = 0;
    let remainingWorkouts = 0;

    goals.forEach((goalWorkout: UserGoal) => {
        goalWorkout.workouts?.forEach((workout: Workout) => {
            totalWorkouts += 1;

            if (workout.completed) {
                achievedWorkouts += 1;
            } else {
                remainingWorkouts += 1;
            }
        });
    });

    const data = {
        labels: ["Total Workouts", "Remaining Workouts", "Completed Workouts"],
        datasets: [{
            label: "# of Workouts",
            data: [totalWorkouts, remainingWorkouts, achievedWorkouts],
        }]
    }

    return (
        <Stack direction="row" spacing={2}>
            {data.labels.map((label, index) => (
                <Card sx={{  }} key={index}>
                    <CardContent sx={{ width: '100%', padding: '20px' }}>
                        <Typography sx={{ fontSize: 22, lineHeight: '24px' }} color="text.secondary" gutterBottom>
                            {label}
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line', fontSize: 48 }} >
                            {data.datasets[0].data[index]}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
};

export function GoalsList() {
    const handleWorkoutCompletion = () => {
        // handle workout completion here
    };

    return (
        <div>
            {goalsFvie.map((goal, index) => (
                <div key={`${goal.id}-${index}`}>
                    <WorkoutListCheckmark mode="complete" workouts={goal.workouts} onWorkoutCompletion={handleWorkoutCompletion} />
                </div>
            ))}
        </div>
    );
}