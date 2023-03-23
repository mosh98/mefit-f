import keycloak from "../keycloak";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

/**
 * Example Start Page using Keycloak Context.
 */
function StartPage() {

    const navigate = useNavigate();

    useEffect(() => {
        if (keycloak.authenticated) {
            navigate("/dashboard");
        }
    }, [navigate])


    function handleLogout() {
        keycloak.logout();
    }

    return (
        <div>
            <h1>Start Page</h1>

            <section className="actions">
                {!keycloak.authenticated && (
                    <Button onClick={() => keycloak.login()}>Login</Button>
                )}
                {keycloak.authenticated && (
                    <Button onClick={handleLogout}>Logout</Button>
                )}
            </section>

            {keycloak.token && (
                <div>
                    <h4>Token</h4>
                    <pre>{keycloak.token}</pre>
                </div>
            )}
        </div>
    );
}
export default StartPage;