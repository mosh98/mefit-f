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
import {UserGoal, Workout} from "../../const/interface";


interface VerticalChartProps {
    goals: UserGoal[];
}

export const VerticalChart = ({ goals }: VerticalChartProps) => {

    const labels = goals.reduce<string[]>((acc, goal) => {
        goal.workouts?.forEach((workout) => {
            workout.exercises?.forEach((exercise) => {
                if (exercise?.muscleGroup && !acc.includes(exercise.muscleGroup )) {
                    acc.push(exercise.muscleGroup);
                }
            });
        });
        return acc;
    }, []);

    const muscleGroupStats = goals.flatMap((goal) =>
        goal.workouts?.flatMap((workout) =>
            workout.exercises?.map((exercise) => exercise.muscleGroup)
        )
    ).reduce<{ total: Record<string, number> }>(
        (acc, muscleGroup) => {
            if (muscleGroup) {
                acc.total[muscleGroup] = (acc.total[muscleGroup] || 0) + 1;
            }

            return acc;
        },
        { total: {} }
    );

    const muscleGroupStatsCompleted = goals.flatMap((goal) =>
        goal.workouts?.filter((workout) => workout.completed).flatMap((workout) =>
            workout.exercises?.map((exercise) => exercise.muscleGroup)
        ) ?? []
    ).reduce<{ total: Record<string, number> }>(
        (acc, muscleGroup) => {
            if (muscleGroup !== undefined) {
                acc.total[muscleGroup] = (acc.total[muscleGroup] ?? 0) + 1;
            }
            return acc;
        },
        { total: {} }
    );



    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

    // {'Chest':3}
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
            backgroundColor: ['rgba(88,245,90,0.2)'],
            borderColor: ['rgb(35,77,13)'],
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
