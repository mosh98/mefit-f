import axios from ".";
import keycloak from "../keycloak";


const apiUrl = process.env.REACT_APP_API_URL;

/**
 * SAMPLE FUNCTION: Fetch exercises from a REST API
 * @param {string} endPoint
 * @returns { Promise<{ exercises: [], error: null | string }>} response
 */

export const fetchExercises = async (endPoint) => {
    try {
        const response = await axios.get(`${apiUrl}${endPoint}`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {exercise: response.data, error: null};
    } catch (error) {
        return {exercises: [], error: error.message};
    }
}


/**
 * Fetch a workout by its id.
 * @param {number} workoutId
 * @returns {Promise<{workout: { id, name, type, completed, programs, exercises, goal } | null, error: null}>}
 */
export const fetchWorkoutById = async (workoutId) => {

    try {
        const {data, status} = await axios.get(apiUrl + "workouts/workoutById/" + workoutId);
        console.log(status)
        return Promise.resolve({
            workout: data,
            error: null,
        });
    } catch (e) {
        return {
            workout: null,
            error: e.message,
        };
    }
}
