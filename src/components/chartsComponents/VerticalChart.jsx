import {goalsFvie} from "./mockGoals";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import {Bar} from "react-chartjs-2";

function VerticalChart() {

    const labels = goalsFvie.reduce((acc, goal) => {
        goal.workouts.forEach((workout) => {
            workout.exercises.forEach((exercise) => {
                if (!acc.includes(exercise.muscleGroup)) {
                    acc.push(exercise.muscleGroup);
                }
            });
        });
        return acc;
    }, []);

    const muscleGroupStats = goalsFvie.flatMap((goal) =>
        goal.workouts.flatMap((workout) =>
            workout.exercises.map((exercise) => exercise.muscleGroup)
        )
    ).reduce((acc, muscleGroup) => {
        acc.total[muscleGroup] = (acc.total[muscleGroup] || 0) + 1;
        return acc;
    }, {total: {}});

    const muscleGroupStatsCompleted = goalsFvie.flatMap((goal) =>
        goal.workouts.filter((workout) => workout.completed).flatMap((workout) =>
            workout.exercises.map((exercise) => exercise.muscleGroup)
        )
    ).reduce((acc, muscleGroup) => {
        acc.total[muscleGroup] = (acc.total[muscleGroup] || 0) + 1;
        return acc;
    }, {total: {}});


    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Total',
            data: labels.map((label) => muscleGroupStats.total[label]),
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255, 159, 64, 1)'],
            borderWidth: 1,
        }, {
            label: 'Completed',
            data: labels.map((label) => muscleGroupStatsCompleted.total[label]),
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        },],
    };

    return (
        <div>

            <div className="chart">
                <Bar
                    data={data}
                ></Bar>
            </div>

        </div>
    );
}

export default VerticalChart;