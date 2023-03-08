//add an empty export
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect} from "react";



const ExcerciseData = (props: {muscle: string}) => {
 const [workoutData, setWorkoutData] = React.useState([]);

    const localData = localStorage.getItem(`Workout_Data_${props.muscle}`);

 //make a fetchWorkoutData function that fetches data from here:https://api.api-ninjas.com/v1/exercises?muscle=quadriceps
 //and then sets the workoutData state to the data you get back
 //you can use the useEffect hook to call this function when the component mounts

 const fetchWorkoutData = async (muscle: string) => {
     if(localData == null){
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
             localStorage.setItem(`Workout_Data_${muscle}`, JSON.stringify(data));

         } catch (error) {
             console.error('Request failed:', error);
         }
     }else {
         setWorkoutData(JSON.parse(localData));
     }


 };


  //use useEffect to fetchWorkoutData when the component mounts

     useEffect(() => {
      const getWorkoutData = async () => {
         await fetchWorkoutData(props.muscle);

      }
        getWorkoutData();
      console.log(workoutData);
    }, []);






const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'id',
        width: 70,

    },
 { field: 'name', headerName: 'Name', width: 130 },
 { field: 'equipment', headerName: 'Equipment', width: 130 },
    { field: 'muscle', headerName: 'Muscle', width: 130 },
    {field: 'difficulty', headerName: 'Difficulty', width: 130},

];

const rows = workoutData.map((dataItem: any) => ({
  id: Math.floor(Math.random() * 100),
  name: dataItem.name,
  equipment: dataItem.equipment,
    muscle: dataItem.muscle,
    difficulty: dataItem.difficulty,

 }));


 return (

     <div style={{ height: 400, width: "auto" , backgroundColor: 'white' }}>
       <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          autoPageSize={true}
          columnVisibilityModel={{
              // Hide columns status and traderName, the other columns will remain visible
              status: false,
              traderName: false,
          }}
      />
     </div>
 )
}
export default ExcerciseData;
