import SetGoalNew from "../components/forms/setgoal/SetGoalNew";
import {Box} from "@mui/system";


function SetGoalPage() {

    return (
        <Box className={"page-view"}>
            <p>Set goal</p>
            <SetGoalNew />
        </Box>
        
    );
}
export default SetGoalPage;