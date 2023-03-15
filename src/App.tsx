import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./views/StartPage";
import WorkoutPage from "./views/WorkoutPage";
import ProfilePage from "./views/ProfilePage";
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";
import './App.css';


function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/workout"
                   element={
                       <KeycloakRoute role={ ROLES.Admin } redirectTo={"/"}>
                           <WorkoutPage />
                       </KeycloakRoute>
                } />
              <Route
                  path="/profile"
                  element={
                      <KeycloakRoute role={ ROLES.User } redirectTo={"/"}>
                          <ProfilePage />
                      </KeycloakRoute>
                  }
              />
          </Routes>
        </main>
      </BrowserRouter>
  );
}

export default App;

