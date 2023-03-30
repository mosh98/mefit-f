import {BrowserRouter, Route, Routes} from "react-router-dom";
import StartPage from "./views/StartPage";
import WorkoutPage from "./views/WorkoutPage";
import ProfilePage from "./views/profile/ProfilePage";
import KeycloakRoute from "./routes/KeycloakRoute";
import {ROLES} from "./const/roles";
import './App.css';
import {DashboardPage} from "./views/DashboardPage";
import SidebarDrawer from "./components/navbar/SidebarDrawer";
import ExercisesPage from "./views/ExercisesPage";
import AdminPage from "./views/AdminPage";
import RegistrationPage from "./views/RegistrationPage";
import keycloak from "./keycloak";
import SetGoalPage from "./views/SetGoalPage";
import CreateWorkoutPage from "./views/CreateWorkoutPage";
import {Box} from "@mui/system";
import Grid from "@mui/material/Grid";
import MeFitProvider from "./MeFitMyContext";


function App() {
    return (
        <BrowserRouter>
            <Box sx={{flexGrow: 1, background: '#e2e2e2'}}>
                <MeFitProvider>
                <Grid container spacing={2}>
                    {keycloak.authenticated &&

                        <Grid item xs={3}>
                            <SidebarDrawer/>
                        </Grid>}
                    <Grid item xs={9}>
                        <main className="main-container">
                            <Routes>
                                <Route path="/" element={<StartPage/>}/>
                                <Route
                                    path="/profile"
                                    element={
                                        <KeycloakRoute role={ROLES.User} redirectTo={"/"}>
                                            <ProfilePage/>
                                        </KeycloakRoute>
                                    }
                                />
                                <Route path={"/dashboard"} element={
                                    <KeycloakRoute role={ROLES.User} redirectTo={"/"}>
                                        <DashboardPage/>
                                    </KeycloakRoute>
                                }
                                />
                                <Route path={"/setgoals"} element={
                                    <KeycloakRoute role={ROLES.User} redirectTo={"/"}>
                                        <SetGoalPage/>
                                    </KeycloakRoute>
                                }
                                />
                                <Route path="/workout"
                                       element={
                                           <KeycloakRoute role={ROLES.User} redirectTo={"/"}>
                                               <WorkoutPage/>
                                           </KeycloakRoute>
                                       }/>
                                <Route path="/exercise"
                                       element={
                                           <KeycloakRoute role={ROLES.User} redirectTo={"/"}>
                                               <ExercisesPage/>
                                           </KeycloakRoute>
                                       }/>
                                <Route path="/admin"
                                       element={
                                           <KeycloakRoute role={ROLES.Admin} redirectTo={"/"}>
                                               <AdminPage/>
                                           </KeycloakRoute>
                                       }/>
                                <Route path="/registration"
                                       element={
                                           <KeycloakRoute role={ROLES.User} redirectTo={"/"}>
                                               <RegistrationPage/>
                                           </KeycloakRoute>
                                       }/>
                                <Route path="/create-workout"
                                       element={
                                           <KeycloakRoute role={ROLES.Admin} redirectTo={"/"}>
                                               <CreateWorkoutPage/>
                                           </KeycloakRoute>
                                       }/>
                                <Route path="*" element={<h1>404 - Not Found!</h1>}/>
                            </Routes>
                        </main>
                    </Grid>

                </Grid>
            </MeFitProvider>
            </Box>
        </BrowserRouter>

    );
}

export default App;