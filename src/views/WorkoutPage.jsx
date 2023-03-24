    import useWorkouts from "../hooks/useWorkouts";
    import WorkoutList from "../components/workouts/WorkoutList";


function WorkoutPage() {

    const { workouts, error } = useWorkouts();

    if (error) return <div>Failed to load workouts</div>;
    if (!workouts) return <div>Loading...</div>;

    console.log("workouts ", workouts, error);

    return (
        <div>
            <h1>Workout Page</h1>
<WorkoutList    workouts={workouts} />

        </div>
    );
}
export default WorkoutPage;


