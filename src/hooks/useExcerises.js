import { useEffect, useState } from "react";
import { fetchExercises} from "../api/exercises";

/**
 * Make an HTTP Request and return response
 * @returns {{exercises:[], error: string | null }}
 */
function useExercises() {
    const [exercises, setExercises] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            const { exercises, error } = await fetchExercises("exercises/allExercises");

            setExercises(exercises);
            setError(error);
        };

        init();
    }, []);

    return { exercises, error };
}
export default useExercises
