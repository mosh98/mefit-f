import {useEffect, useState} from "react";
import {fetchProfileById, fetchProfileByKeycloakId} from "../api/profile";

export function useProfileDetailById(id) {
    const [profile, setProfile] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            const { profile, error } = await fetchProfileById(id);
            setProfile(profile);
            setError(error);
        };
        init();
    }, [ id ]);

    return { profile, error };
}

export function useProfileDetailByKeycloakId(keycloakId) {
    const [profile, setProfile] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            const { profile, error } = await fetchProfileByKeycloakId(keycloakId);
            setProfile(profile);
            setError(error);
        };
        init();
    }, [ keycloakId ]);

    return { profile, error };
}