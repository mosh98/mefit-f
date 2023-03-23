import {BrowserRouter, Route, Routes} from "react-router-dom";
import StartPage from "./views/StartPage";
import WorkoutPage from "./views/WorkoutPage";
import ProfilePage from "./views/ProfilePage";
import KeycloakRoute from "./routes/KeycloakRoute";
import {ROLES} from "./const/roles";
import './App.css';
import DashboardPage from "./views/DashboardPage";
import SidebarDrawer from "./components/navbar/SidebarDrawer";
import ExercisesPage from "./views/ExercisesPage";
import AdminPage from "./views/AdminPage";
import SetGoalPage from "./views/SetGoalPage";


function App() {
    return (
        <BrowserRouter>
            <SidebarDrawer/>
            <main className="container">
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
                            <SetGoalPage />
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
                                   <AdminPage />
                               </KeycloakRoute>
                           }/>
                    <Route path="*" element={<h1>404 - Not Found!</h1>}/>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;

