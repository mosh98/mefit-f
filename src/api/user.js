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
    return {user: response.status, error: null};
  } catch (error) {
    return {user: [], error: error.status};
  }
}

/**axios.post('/api/my-endpoint', myData)
   .then(function (response) {
    console.log(response.status);
    // do something with the response data
  })
   .catch(function (error) {
    console.log(error);
    // handle the error
  });*/


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


/**
 * SAMPLE FUNCTION: Create a new user on the database
 * @param {any} user User to be added to API's database
 * @returns { Promise<{user: any, error: string | null}> } user
 */

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
