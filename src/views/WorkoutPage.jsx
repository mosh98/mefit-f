import WorkoutList from "../components/workouts/WorkoutList";
import useExercises from "../hooks/useExcerises";
import useWorkouts from "../hooks/useWorkouts";
import WorkoutTest from "./WorkoutTest";
import {fetchExercises} from "../api/exercises";

function WorkoutPage() {

    const { workouts, error } = useWorkouts();
   const { exercises, exError } = useExercises();
//    const { exercises, exError } =  fetchExercises();

    console.log("workouts ", workouts, error);
    console.log("exercises ", exercises, exError);

    return (
        <div>
            <h1>Workout Page</h1>
         {/*   <WorkoutList workouts={ workouts } error={ error } exercises={ exercises } exError={ exError }/>*/}
            <WorkoutTest />

        </div>
    );
}
export default WorkoutPage;