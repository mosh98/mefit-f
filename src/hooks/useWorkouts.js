import { useEffect, useState } from "react";
import { fetchExercises } from "../api/exercises";
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

      const exerciseIdList = workouts.flatMap(workout => workout.exercises.flat());
      const exerciseDetails = await Promise.all(exerciseIdList.map(id => fetchExercises(`exercises/exerciseById/${id}`)));
      console.log(exerciseDetails)
      const workoutsWithData = workouts.map(workout => ({
        ...workout,
        exercises: workout.exercises.map(id => exerciseDetails.exercises.find(exercise => exercise.id === id))
      }));
      console.log(workoutsWithData);

      // const exerciseIdList = workouts.flatMap(workout => workout.exercises.flat());
      // const exerciseDetails = await Promise.all(exerciseIdList.map(id => fetchWorkouts(`exercises/exerciseById/${id}`)));
      // console.log(exerciseDetails);
      // const workoutsWithData = workouts.map(workout => ({
      //   ...workout,
      //   exercises: workout.exercises.map(id => exerciseDetails.find(exercise => exercise.id === id))
      // }));
      // console.log(workoutsWithData);
    };

    init();
  }, []);

  return { workouts, error };
}
export default useWorkouts;
