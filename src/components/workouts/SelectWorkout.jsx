import WorkoutListCheckmark from "./WorkoutCheckmark";
import {useState} from "react";


export default function SelectedWorkout(props) {
    const {workouts} = props;
    const [selectedWorkoutIds, setSelectedWorkoutIds] = useState([]);

    let handleWorkoutSelection = (selectedIds) => {
        setSelectedWorkoutIds(selectedIds);
    };

    return (
        <div>
            <WorkoutListCheckmark mode="select" workouts={workouts} onWorkoutSelection={handleWorkoutSelection}/>
        </div>
    );
}