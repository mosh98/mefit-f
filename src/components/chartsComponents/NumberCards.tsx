import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Stack, Typography} from "@mui/material";
import WorkoutListCheckmark from "../workouts/WorkoutCheckmark";
import {UserGoal, Workout} from "../../const/interface";
import {useMeFitContext} from "../../MeFitMyContext";

interface NumberCardsProps {
    goals: UserGoal[];
}

export const NumberCards = ({goals}: NumberCardsProps) => {
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
                <Card sx={{}} key={index}>
                    <CardContent sx={{width: '100%', padding: '20px'}}>
                        <Typography sx={{fontSize: 22, lineHeight: '24px'}} color="text.secondary" gutterBottom>
                            {label}
                        </Typography>
                        <Typography variant="body2" sx={{whiteSpace: 'pre-line', fontSize: 48}}>
                            {data.datasets[0].data[index]}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
};


interface GoalsListProps {
    goals: UserGoal[];
}

export const GoalsList = ({goals}: GoalsListProps) => {
    const {profile, updateGoalApi, fetchGoalData} = useMeFitContext();
    // const [goal, setGoal] = useState<UserGoal[]>([]);

    let handleWorkoutCompletion = async (/*goalId: number,*/ workout: Workout) => {
        console.log("Completed workout id: ", workout, "completed: ", !workout.completed);
        // Update the workout in the context

        console.log("Goal id ", profile?.goal)

/*        try {
            const {goal: updatedGoal, error} = await updateGoalApi(profile?.goal, workout);
            if (error) {
                console.log("Error updating goal", error);
            } else {
                // Update the goal in the context
                console.log("Updated goal", updatedGoal);
            }
        }
        catch (e) {
            console.log("Error updating goal", e);
        }
    ;*/
    }
    return (
        <div>
            {goals.map((goal, index) => (
                <div key={`${goal.id}-${index}`}>
                    <WorkoutListCheckmark mode="complete" workouts={goal.workouts}
                                          onWorkoutCompletion={handleWorkoutCompletion}/>
                </div>
            ))}
        </div>
    );
}