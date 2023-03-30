import Box from "@mui/material/Box";
import {VerticalChart} from "../components/chartsComponents/VerticalChart";
import {DoughnutChart} from "../components/chartsComponents/DoughnutChart";
import {GoalsList, NumberCards} from "../components/chartsComponents/NumberCards";
import Grid from "@mui/material/Grid";
import {useMeFitContext} from "../MeFitMyContext";
import {useEffect, useState} from "react";

function DashboardPage() {
    const {profile, goal, goalError, fetchGoalData} = useMeFitContext();

    const [reRender, setReRender] = useState<boolean>(false);


    useEffect(() => {
        fetchGoalData(profile?.goal);
        console.log("DASHBOARD PAGE", profile);
    }, [reRender]);

    if (goalError) {
        return <p>{goalError}</p>;
    }
    if (!goal) {
        return <p>Loading goals...</p>;
    }

    //make a function for toggeling reRender
    const toggleReRender = () => {
        setReRender(!reRender);
    }
    return (
        <Box className={"page-view"}>
            <h1>Dashboard</h1>

            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <NumberCards goals={[goal]} />
                    </Grid>
                    <Grid item xs={4}>
                        <DoughnutChart goals={[goal]}/>
                    </Grid>
                    <Grid item xs={8}>
                            <VerticalChart goals={[goal]}/>
                    </Grid>
                </Grid>
            </Box>
            <GoalsList goals={[goal]} toggleReRender={toggleReRender} />
        </Box>
    );
}

export default DashboardPage;