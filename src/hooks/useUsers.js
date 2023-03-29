import {useEffect, useState} from "react";
import {fetchUsers} from "../api/user";

function useUsers() {
    const [users, setUsers] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            const { users, error } = await fetchUsers();

            setUsers(users);
            setError(error);
        };

        init();
    }, []);

    return { users, error };
}
export default useUsers