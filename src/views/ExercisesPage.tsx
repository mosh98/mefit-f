import ExercisesTableNew from "../components/exercise/ExercisesTableNew";
import ExercisesCheckmark from "../components/exercise/ExerciseCheckmark";
import keycloak from "../keycloak";
import ScrollDialog from "../components/dialogs/ScrollDialog";
import CreateExercise from "../components/exercise/CreateExercise";
import {Box} from "@mui/system";
import {useMeFitContext} from "../MeFitMyContext";
import {useEffect} from "react";

function ExercisesPage() {
    const {exercises, exerciseError, fetchExerciseData} = useMeFitContext();

    useEffect(() => {
        fetchExerciseData();
    } , []);

    if (exerciseError) {
        return <p>{exerciseError}</p>;
    }
    if (!exercises) {
        return <p>Loading exercises...</p>;
    }

    console.log("Exercises", exercises);

    return (
        <Box className={"page-view"}>
            <h1>Exercise Overview</h1>


            {keycloak.hasRealmRole('ADMIN') ? <>
                <ScrollDialog content={<CreateExercise />} buttonText="Create exercise"/>
                <ExercisesCheckmark exercises={exercises} pageAction={'update'}/>
                </>
                : <ExercisesTableNew exercises={exercises} tableSize={'normal'}/>}

        </Box>
    );
}

export default ExercisesPage;