import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Stack, Typography} from "@mui/material";
import WorkoutListCheckmark from "../workouts/WorkoutCheckmark";
import {UserGoal, Workout} from "../../const/interface";
import {useMeFitContext} from "../../MeFitMyContext";
import {useState} from "react";
import axios from "axios";
import keycloak from "../../keycloak";
import {updateProfile} from "../../api/profile";

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
    toggleReRender: () => void;

}

export const GoalsList = ({goals,toggleReRender }: GoalsListProps) => {
    const {profile, updateGoalApi, fetchGoalData} = useMeFitContext();
    // const [goal, setGoal] = useState<UserGoal[]>([]);



    const updateWorkout = async (id:  number | Workout , data: any) => {
        try {
            const response = await axios.patch(
                `https://database-mefit.herokuapp.com/workouts/updateWorkout/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );


            // Handle the successful response
            console.log(response.data);

        } catch (error) {
            // Handle the error
            console.error(error);
        }
    };


    let handleWorkoutCompletion = async (/*goalId: number,*/ workout: Workout) => {



        // Update the workout in the context


        //updatwe workout using workdout id using an axios patch
        //patch link: https://database-mefit.herokuapp.com/workouts/updateWorkout/:id
        //patch body: {completed: true}
        await updateWorkout(workout, {completed: !workout.completed});

        toggleReRender();


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
