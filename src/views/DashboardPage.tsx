import Box from "@mui/material/Box";
import VerticalChart from "../components/chartsComponents/VerticalChart";
import {DoughnutChart} from "../components/chartsComponents/DoughnutChart";
import {NumberCards} from "../components/chartsComponents/NumberCards";
import Grid from "@mui/material/Grid";
import GoalWorkouts from "../components/workouts/GoalWorkouts";


function DashboardPage() {

    return (
        <Box className={"page-view"}>
            <h1>Dashboard</h1>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>

                            <NumberCards/>

                    </Grid>
                    <Grid item xs={4}>

                            <DoughnutChart/>

                    </Grid>
                    <Grid item xs={8}>

                            <VerticalChart/>

                    </Grid>
                </Grid>
            </Box>
            {/*<GoalWorkouts workouts={workouts} />*/}
        </Box>
    );
}

export default DashboardPage;