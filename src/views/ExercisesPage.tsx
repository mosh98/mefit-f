import ExercisesTable from "../components/exercise/ExercisesTable";
import ExercisesTableTest from "../components/exercise/ExercisesTableTest";
import useExercises from "../hooks/useExcerises";

function ExercisesPage() {
    const { exercises, error } = useExercises();

    if (error) {
        return <p>{error}</p>;
    }
    if (!exercises) {
        return <p>Loading exercises...</p>;
    }

    return (
        <div>
            <h1>Exercise Overview</h1>
            {/*<ExercisesTable />*/}
            <ExercisesTableTest exercises={exercises}  />
        </div>
    );
}
export default ExercisesPage;