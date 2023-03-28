import RegistrationStepper from "./RegistrationStepper";
import {Box} from "@mui/system";

function RegistrationPage() {

    return (
        <Box className={"page-view"}>
            <h1>Create new user</h1>
            <RegistrationStepper/>

        </Box>
    );
}

export default RegistrationPage;