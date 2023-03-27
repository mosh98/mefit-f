    import useWorkouts from "../hooks/useWorkouts";
    import WorkoutList from "../components/workouts/WorkoutList";
    import SelectedWorkout from "../components/workouts/SelectWorkout";
    import keycloak from "../keycloak";
    import {Button} from "@mui/material";
    import {useNavigate} from "react-router-dom";
    import ExerciseDisplay from "../components/exercise/ExerciseDisplay";
    import useExercises from "../hooks/useExcerises";

function WorkoutPage() {
    const { workouts, error } = useWorkouts();
    const { exercises, errorN } = useExercises();
    const navigate = useNavigate();

    if (error) return <div>Failed to load workouts</div>;
    if (!workouts) return <div>Loading...</div>;
    if (errorN) return <div>Failed to load workouts</div>;
    if (!exercises) return <div>Loading...</div>;

    console.log("workouts ", workouts, error);

    function handleClick() {
        navigate("/create-workout");
    }

    return (
        <div>
            <h1>Workout Page</h1>




            {/*{exercises.map((exercise) => (
                <ExerciseDisplay exercises={exercise} />
            ))}>*/}

            {keycloak.hasRealmRole('ADMIN') ? <>
                    <Button onClick={handleClick}> Create Workout</Button>
                    {/*<SelectedWorkout workouts={workouts} />*/}
                    <WorkoutList workouts={workouts} />
                </>
                : <WorkoutList workouts={workouts} />}

            {/*<GoalWorkouts workouts={workouts} />*/}
            {/*<SelectedWorkout workouts={workouts} />*/}




        </div>
    );
}
export default WorkoutPage;


