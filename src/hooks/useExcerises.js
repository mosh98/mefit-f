import { useEffect, useState } from "react";
import { fetchExercises} from "../api/data";

/**
 * Make an HTTP Request and return response
 * @returns {{exercises:[], error: string | null }}
 */
function useExercises() {
    const [exercises, setExercises] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            const { exercises, error } = await fetchExercises("excercises/allExcercises");

            setExercises(exercises);
            setError(error);
        };

        init();
    }, []);

    return { exercises, error };
}
export default useExercises
