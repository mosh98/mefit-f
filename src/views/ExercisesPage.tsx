import ExercisesTableNew from "../components/exercise/ExercisesTableNew";
import useExercises from "../hooks/useExcerises";
import ExercisesCheckmark from "../components/exercise/ExerciseCheckmark";
import keycloak from "../keycloak";
import ScrollDialog from "../components/dialogs/ScrollDialog";
import CreateExercise from "../components/exercise/CreateExercise";

function ExercisesPage() {
    const {exercises, error} = useExercises();

    if (error) {
        return <p>{error}</p>;
    }
    if (!exercises) {
        return <p>Loading exercises...</p>;
    }

    return (
        <div>
            <h1>Exercise Overview</h1>

            {keycloak.hasRealmRole('ADMIN') ? <>
                <ScrollDialog content={<CreateExercise />} buttonText="Create exercise"/>
                <ExercisesCheckmark exercises={exercises} pageAction={'update'}/>
                </>
                : <ExercisesTableNew exercises={exercises} tableSize={'normal'}/>}

            {/*<ExercisesCheckmark exercises={exercises} pageAction={'checkbox'} />*/}

        </div>
    );
}

export default ExercisesPage;