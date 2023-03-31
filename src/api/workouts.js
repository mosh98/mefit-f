
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
 * Post a workout to the API
 * @param workout
 * @returns {Promise<{workout: null, error}|{workout: any, error: null}>}
 */
export const postWorkout = async (workout) => {
    try {
        const response = await axios.post(`${apiUrl}workouts/createWorkout`, workout, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            },
        });
        return {workout: response.data, error: null};
    } catch (error) {
        return {workout: null, error: error.message};
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
 * Delete a workout by its id.
 * @param {number} workoutId
 * @returns {Promise<{workout: null, error: null}>}
 */

export const deleteWorkoutById = async (workoutId) => {
    try {
        const response = await axios.delete(`${apiUrl}workouts/deleteWorkoutById/${workoutId}`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {workout: response.data, error: null};
    } catch (error) {
        return {workout: null, error: error.message};
    }
}

/**
 * Update a workout by its id.
 * @param {number} workoutId
 * @param workout
 * @returns {Promise<{workout: { id, name, type, completed, programs, exercises, goal } | null, error: null}>}
 */

export const updateWorkoutById = async (id , data) => {
    try {
        const response = await axios.patch(
            `https://database-mefit.herokuapp.com/workouts/updateWorkout/${id}`,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return {workout: response.data, error: null};
    } catch (error) {
        return {workout: [], error: error.message};

    }
}