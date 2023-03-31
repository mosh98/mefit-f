import axios from ".";
import keycloak from "../keycloak";


const apiUrl = process.env.REACT_APP_API_URL;

/** https://database-mefit.herokuapp.com/goal/goalById/
 *  Fetch a goal by its id.
 *  @param {number} goalId
 *  @returns {Promise<{goal: { id, name, type, completed, programs, exercises, goal } | null, error: null}>}
 */

export const fetchGoalById = async (goalId) => {
    try {
        const response = await axios.get(`${apiUrl}goal/goalById/${goalId}`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {goal: response.data, error: null};
    } catch (error) {
        return {goal: [], error: error.message};
    }
}


export const updateGoal = async (goalId, goalCompleted) => {
    try {
        const response = await axios.patch(`https://database-mefit.herokuapp.com/goal/updateGoal/${goalId}`, goalCompleted, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            },
        });
        return {goal: response.data, error: null};
    } catch (error) {
        return {goal: null, error: error.message};
    }
}