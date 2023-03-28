import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {goalsFvie} from "./mockGoals";
import {Box} from "@mui/system";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
    let achievedWorkouts = 0;
    let remainingWorkouts = 0;

    goalsFvie.forEach(goalWorkout => {
        goalWorkout.workouts.forEach(workout => {

            if (workout.completed) {
                achievedWorkouts += 1;
            } else {
                remainingWorkouts += 1;
            }
        });
    });


    const data = {
        labels: ["Red", "Blue"],
        datasets: [{
            label: "# of workouts",
            data: [achievedWorkouts, remainingWorkouts],
            backgroundColor: ['black', 'red'],
            borderColor: ['black', 'red']
        }]
    }

    return (
        <Box>
            <Doughnut
                width={500}
                height={500}
                data={data}
            >
            </Doughnut>
        </Box>
    );
};
