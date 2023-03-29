import Box from "@mui/material/Box";
import VerticalChart from "../components/chartsComponents/VerticalChart";
import {DoughnutChart} from "../components/chartsComponents/DoughnutChart";
import {GoalsList, NumberCards} from "../components/chartsComponents/NumberCards";
import Grid from "@mui/material/Grid";
import WorkoutGoalsData from "../components/chartsComponents/fetchGoals";


function DashboardPage() {
/*    const {goal, error} = WorkoutGoalsData()

    if (error) {
        return <div>failed to load</div>
    }

    if (!goal) {
        return <div>loading...</div>
    }*/

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
            <GoalsList />
        </Box>
    );
}

export default DashboardPage;