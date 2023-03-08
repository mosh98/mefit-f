import {useNavigate} from "react-router-dom";
import ExcerciseData from "./ExcerciseDataView";
import * as React from "react";
import {useState} from "react";
import './ExcerciseStyles.css';



const Excercise = () => {
    // const navigate = useNavigate();
    //chest
    const [showChestAccordion, setShowChestAccordion] = useState(false);
    //TODO:back
    const [showBackAccordion, setShowBackAccordion] = useState(false);
    //TODO:biceps
    const [showBicepsAccordion, setShowBicepsAccordion] = useState(false);
    //TODO:triceps
    const [showTricepsAccordion, setShowTricepsAccordion] = useState(false);
    //TODO: shoulders



    const toggleChestAccordion = (e: any) => {
        e.stopPropagation(); // prevent toggling the main accordion
        setShowChestAccordion((prevState) => !prevState);
    };

    return (
        <div>
            <h1>Excercise</h1>
            <h4>Choose your own parts to train</h4>
            <div>
                <button
                    className="accordion-button" onClick={toggleChestAccordion}>Chest</button>
                {showChestAccordion && (<ExcerciseData muscle="chest" />)}
            </div>

        </div>
    );
}

export default Excercise;