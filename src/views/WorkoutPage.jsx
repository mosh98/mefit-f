    import WorkoutList from "../components/workouts/WorkoutList";
    import keycloak from "../keycloak";
    import {Button, Box} from "@mui/material";
    import {useNavigate} from "react-router-dom";
    import {useMeFitContext} from "../MeFitMyContext";
    import {useEffect} from "react";

function WorkoutPage() {
    const { workouts, workoutError, fetchWorkoutData } = useMeFitContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchWorkoutData();
    }, [])

    if (workoutError) return <div>Failed to load workouts</div>;
    if (!workouts) return <div>Loading...</div>;

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


