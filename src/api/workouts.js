import axios from ".";
import keycloak from "../keycloak";


const apiUrl = process.env.REACT_APP_API_URL;

/**
 * SAMPLE FUNCTION: Fetch workouts from a REST API
 * @returns { Promise<{ workouts: [], error: null | string }>} response
 */

export const fetchWorkouts = async () => {
    try {
        const response = await axios.get(`${apiUrl}workouts/allWorkouts`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {workouts: response.data, error: null};
    } catch (error) {
        return {workouts: [], error: error.message};
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
