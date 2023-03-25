import axios from ".";
import keycloak from "../keycloak";

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * Create a new user on the database
 * @param userInfo
 * @returns {Promise<{userInfo: any[], error}|{userInfo: any, error: null}>}
 */
export const createUser = async (userInfo) => {
  try {
    const response = await axios.post(`${apiUrl}users/newUser`, userInfo, {
      headers: {
        'Authorization': `Bearer ${keycloak.token}`,
        'Content-Type': 'application/json',
      }
    });
    return {user: response, error: null};
  } catch (error) {
    return {user: [], error: error.status};
  }
}

/**
 * Fetch all users from the database
 * @returns {Promise<{error: null, users: any}|{error, users: *[]}>}
 */
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}users/allUsers`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json',
            }
        });
        return {users: response.data, error: null};
    } catch (error) {
        return {users: [], error: error.message};
    }
}

