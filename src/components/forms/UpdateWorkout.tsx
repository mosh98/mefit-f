import {useMeFitContext} from "../../MeFitMyContext";
import {Workout} from "../../const/interface";
import {ChangeEvent, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";

interface UpdateWorkoutProps {
    workout: Workout;
    onUpdate: (workout: Workout) => void;
}

export const UpdateWorkout = ({ workout, onUpdate }: UpdateWorkoutProps) => {
    const {workouts, fetchWorkoutData} = useMeFitContext();
    const [workoutToUpdate, setWorkoutToUpdate] = useState<Workout>({
        name: workout.name,
    });


    if (!workouts) {
        return <div>Loading...</div>;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWorkoutToUpdate({...workoutToUpdate, [e.target.id]: e.target.value});
    };
    const handleSubmit = async (values: Workout) => {


        await onUpdate(workoutToUpdate);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Stack direction={"column"} spacing={2}>    
                    <TextField
                        id={"name"}
                        type={"text"}
                        label={"Name"}
                        variant={"standard"}
                        required
                        value={workoutToUpdate.name}
                        onChange={handleChange}
                    />
                </Stack>
            </form>
        </div>
    )


}