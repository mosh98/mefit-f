//add an empty export
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect} from "react";
import exp from "constants";



const WorkoutData = () => {
 const [workoutData, setWorkoutData] = React.useState([]);

 //make a fetchWorkoutData function that fetches data from here:https://api.api-ninjas.com/v1/exercises?muscle=quadriceps
 //and then sets the workoutData state to the data you get back
 //you can use the useEffect hook to call this function when the component mounts

 const fetchWorkoutData = async (muscle: string) => {
  try {
   const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
    headers: {
     'X-Api-Key': '7qJlgGfAQkMbkkGGmwsVxg==bNV4pFoe4qH3WkIK',
    },
   });

   if (!response.ok) {
    throw new Error('Network response was not ok');
   }

   const data = await response.json();
   setWorkoutData(data);
  } catch (error) {
   console.error('Request failed:', error);
  }
 };


  //use useEffect to fetchWorkoutData when the component mounts

     useEffect(() => {
      const getWorkoutData = async () => {
         await fetchWorkoutData("quadriceps");

      }
        getWorkoutData();
      console.log(workoutData);
    }, []);






const columns: GridColDef[] = [
 { field: 'id', headerName: 'id', width: 70 },
 { field: 'name', headerName: 'Name', width: 130 },
 { field: 'equipment', headerName: 'Equipment', width: 130 },


];

const rows = workoutData.map((dataItem: any) => ({
  id: Math.floor(Math.random() * 100),
  name: dataItem.name,
  equipment: dataItem.equipment,
 }));

//const rowsData = WorkoutData();

 return (

     <div style={{ height: 400, width: '30%' , backgroundColor: 'white' }}>


       <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection

      />

     </div>
 )
}
export default WorkoutData;
