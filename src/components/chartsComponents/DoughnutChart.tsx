import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {Box} from "@mui/system";
import {UserGoal, Workout} from "../../const/interface";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    goals: UserGoal[];
}

export const DoughnutChart = ({ goals }: DoughnutChartProps) => {
    let achievedWorkouts = 0;
    let remainingWorkouts = 0;

    goals.forEach((goalWorkout: UserGoal) => {
        goalWorkout.workouts?.forEach((workout: Workout) => {

            if (workout.completed) {
                achievedWorkouts += 1;
            } else {
                remainingWorkouts += 1;
            }
        });
    });


    const data = {
        labels: ["Completed", "Not Completed"],
        datasets: [{
            label: "# of workouts",
            data: [achievedWorkouts, remainingWorkouts],
            backgroundColor: ['green', 'grey'],
            borderColor: ['grey', 'grey']
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
