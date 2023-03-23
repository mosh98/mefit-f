import axios from "./index";
import keycloak from "../keycloak";

const apiUrl = process.env.REACT_APP_API_URL;


/**
 * SAMPLE FUNCTION: Fetch profile by id from a REST API
 * @param profileId
 * @returns {Promise<{profile: null, error}|{profile: any, error: null}>}
 */
export const fetchProfileById = async (profileId) => {

    try {
        const response = await axios.get(`profiles/profileById/${profileId}`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {profile: response.data, error: null};
    } catch (error) {
        return {profile: [], error: error.message};
    }
}

export const fetchProfileByKeycloakId = async (keycloakId) => {
    try {
        const response = await axios.get(`${apiUrl}profiles/profileByUserKeycloakId/${keycloakId}`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {profile: response.data, error: null};
    } catch (error) {
        return {profile: [], error: error.message};
    }
}