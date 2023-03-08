import {useNavigate} from "react-router-dom";
import ExcerciseData from "./ExcerciseDataView";
import * as React from "react";

const Excercise = () => {
    // const navigate = useNavigate();

    return (
        <>
            <h2>Excercise (Different Body Parts )</h2>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: 50 }}>
                    <h6>Chest Workout</h6>
                    <ExcerciseData muscle="chest" />
                </div>
                <div>
                    <h6>Quadriceps Workout</h6>
                    <ExcerciseData muscle="quadriceps" />
                </div>
            </div>
        </>
    );
}

export default Excercise;