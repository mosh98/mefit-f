import {useNavigate} from "react-router-dom";
import WorkoutData from "./WorkoutDataView";
import * as React from "react";

const Workout = () => {
    // const navigate = useNavigate();

    return (
        <>
            <h2>Workout</h2>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: 50 }}>
                    <h6>Chest Workout</h6>
                    <WorkoutData muscle="chest" />
                </div>
                <div>
                    <h6>Quadriceps Workout</h6>
                    <WorkoutData muscle="quadriceps" />
                </div>
            </div>
        </>
    );
}

export default Workout;