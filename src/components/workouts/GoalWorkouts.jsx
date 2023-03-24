import WorkoutListCheckmark from "./WorkoutCheckmark";
import {useState} from "react";


export default function GoalWorkouts(props) {
    const { workouts } = props;
    const [workoutGoals, setWorkoutGoals] = useState(props.workouts);

    /**
     * const [workouts, setWorkouts] = useState([
     *   { id: 1, name: 'Workout 1', type: 'A', exercises: [], completed: false },
     *   { id: 2, name: 'Workout 2', type: 'B', exercises: [], completed: false },
     *   // ...
     * ]);*/

    let handleWorkoutCompletion = (workoutId, completed) => {
        // Update the completed status of the workout with the given workoutId in the database
        console.log("Completed workout id: ", workoutId, "completed: ", completed);

        // After updating the database, update the local state
        setWorkoutGoals(workoutGoals.map(workout => {
            if (workout.id === workoutId) {
                return { ...workout, completed: completed };
            }
            return workout;
        }));

    };

    return (
        <div>
            <WorkoutListCheckmark mode="complete" workouts={workouts} onWorkoutCompletion={handleWorkoutCompletion} />
        </div>
    );
}