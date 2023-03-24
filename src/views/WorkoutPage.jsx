import useWorkouts from "../hooks/useWorkouts";


function WorkoutPage() {

    const { workouts, error } = useWorkouts();

    if (error) return <div>Failed to load workouts</div>;
    if (!workouts) return <div>Loading...</div>;

    console.log("workouts ", workouts, error);

    return (
        <div>
            <h1>Workout Page</h1>
            {workouts.map((workout) => (
                <div key={workout.id}>
                    <h2>{workout.name}</h2>
                    <p>{workout.goal}</p>
                    <ul>
                        {workout.exercises.map((exercise) => (
                            <li key={exercise.id}>
                                <h3>{exercise.name}</h3>
                                <p>Muscle group: {exercise.muscleGroup}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>
    );
}
export default WorkoutPage;


