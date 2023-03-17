import { useEffect, useState } from "react";
import { fetchWorkouts } from "../api/workouts";

/**
 * Make an HTTP Request and return response
 * @returns {{workouts:[], error: string | null }}
 */
function useWorkouts() {
  const [workouts, setWorkouts] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      const { workouts, error } = await fetchWorkouts();

      setWorkouts(workouts);
      setError(error);
    };

    init();
  }, []);

  return { workouts, error };
}
export default useWorkouts;
