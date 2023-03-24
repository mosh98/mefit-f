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
      const { workouts, error } = await fetchWorkouts("workouts/allWorkouts");

      setWorkouts(workouts);
      setError(error);

      // Tried to map exercise ids to actual exercises with names and descriptions, haven't managed to do that... (ノಥ,_｣ಥ)ノ彡┻━┻

      // const exerciseIdList = workouts.flatMap(workout => workout.exercises).flat();
      // console.log(exerciseIdList)
      // const exerciseDetails = await Promise.all(exerciseIdList.map(id => fetchExercises(`exercises/exerciseById/${id}`)));
      // console.log(exerciseDetails)

    
      // const workoutsWithData = workouts.map(workout => ({
      //   ...workout,
      //   // exercises: workout.exercises.map(id => exerciseDetails.exercises.find(exercise => exercise.id === id))
      // }));
    };

    init();
  }, []);

  return { workouts, error };
}
export default useWorkouts;
