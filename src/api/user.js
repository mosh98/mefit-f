import axios from ".";
import keycloak from "../keycloak";

/**
 * SAMPLE FUNCTION: Create a new user on the database
 * @param {any} user User to be added to API's database
 * @returns { Promise<{user: any, error: string | null}> } user
 */

const apiUrl = process.env.REACT_APP_API_URL;


export const createProfile = async (user) => {
  try {
    const { data } = await axios.get("URL-TO-API", {
      data: user,
    });
    return Promise.resolve({
      user: data,
      error: null,
    });
  } catch (e) {
    return Promise.reject({
      error: e.message,
      user: null,
    });
  }
};


/**
 * Create a new user on the database
 * @param userInfo
 * @returns {Promise<{userInfo: *[], error}|{userInfo: any, error: null}>}
 */
export const createUser = async (userInfo) => {
  try {
    const response = await axios.post(`${apiUrl}users/newUser`, userInfo, {
      headers: {
        'Authorization': `Bearer ${keycloak.token}`,
        'Content-Type': 'application/json',
      }
    });
    return {user: response.data, error: null};
  } catch (error) {
    return {user: [], error: error.message};
  }
}