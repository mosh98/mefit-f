import CreateWorkoutStepper from "../components/workouts/CreateWorkoutStepper";
import {Box} from "@mui/system";

function CreateWorkoutPage() {

    return (
        <Box className={"page-view"}>
            <h1>Create new user</h1>
            <CreateWorkoutStepper />

        </Box>
    );
}

export default CreateWorkoutPage;