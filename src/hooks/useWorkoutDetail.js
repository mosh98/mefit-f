import { useEffect, useState } from "react";
import { fetchWorkoutById } from "../api/workouts";

/**
 * Make an HTTP Request and return response
 * @returns {{workout: any, error: string | null }}
 */
function useWorkoutDetail(workoutId) {
    const [workout, setWorkout] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            const { workout, error } = await fetchWorkoutById(workoutId);
            setWorkout(workout);
            setError(error);
        };
        init();
    }, [ workoutId ]);

    return { workout, error };
}
export default useWorkoutDetail;
