import {useNavigate} from "react-router-dom";
import WorkoutData from "./WorkoutDataView";
import * as React from "react";

const Workout = () => {
    // const navigate = useNavigate();

    return (
        <>
        <h2>Workout</h2>
            <h6>Legs Workout</h6>
            <WorkoutData/>
        </>
    );
}

export default Workout;