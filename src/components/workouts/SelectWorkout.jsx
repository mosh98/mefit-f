import WorkoutListCheckmark from "./WorkoutCheckmark";
import {Button} from "@mui/material";
import {useState} from "react";


export default function SelectedWorkout(props) {
    const {workouts} = props;
    const [selectedWorkoutIds, setSelectedWorkoutIds] = useState([]);

    let handleWorkoutSelection = (selectedIds) => {
        setSelectedWorkoutIds(selectedIds);
    };

    const handleSubmit = () => {
        console.log("Submitted workout ids: ", selectedWorkoutIds);
        // Add logic to handle the submission of the selected workout ids
    };

    return (
        <div>
            <WorkoutListCheckmark mode="select" workouts={workouts} onWorkoutSelection={handleWorkoutSelection}/>
            <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </div>
    );
}