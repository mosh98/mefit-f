import {Card, CardContent, Typography} from "@mui/material";
import keycloak from "../keycloak";
import GoalWorkouts from "../components/workouts/GoalWorkouts";

function DashboardPage() {

  return (
    <div>
      <h1>Dashboard</h1>

        <Card sx={{ maxWidth: 500 }}>
            <CardContent sx={{ width: '100%', padding: '20px' }}>
                <Typography sx={{ fontSize: 18, lineHeight: '24px' }} color="text.secondary" gutterBottom>
                    Token
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 14 }}>
                    {keycloak.token}
                </Typography>
            </CardContent>
        </Card>

        {/*<GoalWorkouts workouts={workouts} />*/}
    </div>
  );
}
export default DashboardPage;