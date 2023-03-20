import WorkoutList from "../components/workouts/WorkoutList";
import useWorkouts from "../hooks/useWorkouts";

function WorkoutPage() {

    const { workouts, error } = useWorkouts();

    return (
        <div>
            <h1>Workout Page</h1>
            <WorkoutList workouts={ workouts } error={ error } />
        </div>
    );
}
export default WorkoutPage;