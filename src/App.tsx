import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Excercise from "./Components/excercise/Excercise"

//Test
function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">

              <Routes>
                  <Route path="/" element={<Excercise/>}></Route>
              </Routes>

          </header>
        </div>
      </BrowserRouter>

);
}

export default App;
