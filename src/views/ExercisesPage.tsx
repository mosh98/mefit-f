import ExercisesTableTest from "../components/exercise/ExercisesTableTest";
import useExercises from "../hooks/useExcerises";
import ExercisesCheckmark from "../components/exercise/ExerciseCheckmark";
import keycloak from "../keycloak";

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

            {keycloak.hasRealmRole('ADMIN') ? <ExercisesCheckmark exercises={exercises} pageAction={'update'}/>
                : <ExercisesTableTest exercises={exercises} tableSize={'normal'}/>}

            {/*<ExercisesCheckmark exercises={exercises} pageAction={'checkbox'} />*/}

        </div>
    );
}

export default ExercisesPage;