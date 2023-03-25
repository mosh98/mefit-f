import axios from ".";
import keycloak from "../keycloak";


const apiUrl = process.env.REACT_APP_API_URL;

/**
 * Fetch exercises from a REST API
 * @returns { Promise<{ exercises: [], error: null | string }>} response
 */
export const fetchExercises = async () => {
    try {
        const response = await axios.get(`${apiUrl}exercises/allExercises`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {exercises: response.data, error: null};
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


/**
 * Create a new exercise on the database
 * @param exerciseInfo
 * @returns {Promise<{exercise: any[], error}|{exercise: any, error: null}>}
 */
export const postExercise = async (exerciseInfo) => {
    try {
        const response = await axios.post(`${apiUrl}exercises/newExercise`, exerciseInfo, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {exercise: response, error: null};
    } catch (error) {
        return {exercise: [], error: error.status};
    }
}

/**
 * Update an exercise on the database
 * @param exerciseInfo
 * @param exerciseId
 * @returns {Promise<{exercise: *[], error}|{exercise: axios.AxiosResponse<any>, error: null}>}
 */
export const patchExercise = async (exerciseInfo, exerciseId) => {
    try {
        const response = await axios.patch(`${apiUrl}exercises/updateExercise/${exerciseId}`, exerciseInfo, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {exercise: response, error: null};
    } catch (error) {
        return {exercise: [], error: error.status};
    }
}