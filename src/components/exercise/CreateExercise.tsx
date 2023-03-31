import ExerciseForm from "../forms/create-forms/ExerciseForm";
import {postExercise} from "../../api/exercises";
import {useState} from "react";
import {Exercise} from "../../const/interface";

function CreateExercise() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // TODO: fix post exercise
    const onCreate = async (values: Exercise) => {
        // Implement your create exercise logic here
        const {exercise, error} = await postExercise(values);
        if (error) {
            console.error("Failed to create exercise:", error);
        } else {
            setIsModalOpen(true)
        }
    };

    return (
        <div>
            {isModalOpen ? <p>Exercise created successfully</p> : <ExerciseForm onSubmit={onCreate} mode="create"/>}
        </div>
    )
}

export default CreateExercise;