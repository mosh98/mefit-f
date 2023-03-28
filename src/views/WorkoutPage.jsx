    import useWorkouts from "../hooks/useWorkouts";
    import WorkoutList from "../components/workouts/WorkoutList";
    import keycloak from "../keycloak";
    import {Button} from "@mui/material";
    import {useNavigate} from "react-router-dom";
    import useExercises from "../hooks/useExcerises";
    import {Box} from "@mui/system";

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
        <Box className={"page-view"}>
            <h1>Workout Page</h1>

            {keycloak.hasRealmRole('ADMIN') ? <>
                    <Button onClick={handleClick}> Create Workout</Button>
                    <WorkoutList workouts={workouts} />
                </>
                : <WorkoutList workouts={workouts} />}
        </Box>
    );
}
export default WorkoutPage;


