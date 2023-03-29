import Box from "@mui/material/Box";
import VerticalChart from "../components/chartsComponents/VerticalChart";
import {DoughnutChart} from "../components/chartsComponents/DoughnutChart";
import {NumberCards} from "../components/chartsComponents/NumberCards";
import Grid from "@mui/material/Grid";


function DashboardPage() {

    return (
        <>
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
        </>
    );
}

export default DashboardPage;