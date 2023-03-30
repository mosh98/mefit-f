import {useEffect, useState} from "react";
import axios from "../../api";
import keycloak from "../../keycloak";
import {fetchGoalById} from "../../api/goal";

export default function WorkoutGoalsData() {
    const [goal, setGoal] = useState(null);
    const [error, setError] = useState("");
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    console.log("profile in goal: ", profile);

    useEffect(() => {
        const initGaol = async () => {
            const {goal, error} = await fetchGoalById(profile.goal);
            setGoal(goal);
            setError(error);
        }
        initGaol();
    }, []);

    return {goal, error};
}



/*    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            const { profile, error } = await fetchProfileByKeycloakId(keycloakId);
            setProfile(profile);
            setError(error);
        };
        init();
    }, [keycloakId]);

    return { profile, error };*/