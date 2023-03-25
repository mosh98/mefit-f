import ExerciseForm, {ExerciseFormData} from "../forms/create-forms/ExerciseForm";
import {postExercise} from "../../api/exercises";

function CreateExercise() {

    // TODO: fix post exercise
    const onCreate = async (values: ExerciseFormData) => {
        console.log("Creating exercise:", values);
        // Implement your create exercise logic here
        const {exercise, error} = await postExercise(values);
        if (error) {
            console.error("Failed to create exercise:", error);
        } else {
            console.log("Exercise created successfully:", exercise);
        }
    };

    return (
        <div>
            <ExerciseForm onSubmit={onCreate} mode="create"/>
        </div>
    )
}

export default CreateExercise;