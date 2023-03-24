    import useWorkouts from "../hooks/useWorkouts";
    import WorkoutList from "../components/workouts/WorkoutList";
    import SelectedWorkout from "../components/workouts/SelectWorkout";
    import GoalWorkouts from "../components/workouts/GoalWorkouts";


function WorkoutPage() {

    const { workouts, error } = useWorkouts();

    if (error) return <div>Failed to load workouts</div>;
    if (!workouts) return <div>Loading...</div>;

    console.log("workouts ", workouts, error);

    return (
        <div>
            <h1>Workout Page</h1>

            {/*<GoalWorkouts workouts={workouts} />*/}
            {/*<SelectedWorkout workouts={workouts} />*/}

            <WorkoutList workouts={workouts} />

        </div>
    );
}
export default WorkoutPage;


