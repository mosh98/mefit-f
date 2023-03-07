import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Workout from "./Components/workout/Workout"

//Test
function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">

              <Routes>
                  <Route path="/" element={<Workout/>}></Route>
              </Routes>

          </header>
        </div>
      </BrowserRouter>

);
}

export default App;
