import WorkoutList from "../components/workouts/WorkoutList";
import useExercises from "../hooks/useExcerises";
import useWorkouts from "../hooks/useWorkouts";

function WorkoutPage() {

    const { workouts, error } = useWorkouts();
    const { exercises, exError } = useExercises();

    return (
        <div>
            <h1>Workout Page</h1>
            <WorkoutList workouts={ workouts } error={ error } exercises={ exercises } exError={ exError }/>
        </div>
    );
}
export default WorkoutPage;