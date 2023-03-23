import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";


function Row(props) {
  console.log(props);
  return (
    <TableRow>
      <TableCell>
        <IconButton
          onClick={() => console.log("Open cell")}
        >
          <KeyboardArrowDown />
        </IconButton>
      </TableCell>
      <TableCell>{props.workout.name}</TableCell>
      <TableCell>{props.workout.type}</TableCell>
      <TableCell>{props.workout.exercises.length}</TableCell>
    </TableRow>
  )
}

function WorkoutList(props) {
  const { workouts, error, exercises, exError } = props;
  // console.log(workouts);
  // console.log(exercises);

  if (error) {
    return <p>{error}</p>;
  }

  if (!workouts) {
    return <p>Loading workouts...</p>;
  }



  return (
    <div>
      <ul>
        {/* {workouts.map((p) => (
          <li key={p.id}>
            <Link to={ "/workouts/" + p.id } >
              <span>{p.name}</span>
              <span>{p.type}</span>
              <span>{p.type}</span>
            </Link>
          </li>
        ))} */}
      </ul>
      <Paper sx={{ width: '99%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Workout name</TableCell>
                <TableCell>Target Area</TableCell>
                <TableCell>Number of exercises</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workouts.map((workout) => (
                <Row workout={workout} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default WorkoutList;
