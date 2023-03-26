import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import ExercisesTableNew from "../exercise/ExercisesTableNew";


function Row(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Workout data rows */}
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)} >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{props.workout.name}</TableCell>
        <TableCell>{props.workout.type}</TableCell>
        <TableCell>{props.workout.exercises.length}</TableCell>
      </TableRow>
      {/* Collapsible rows */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto">
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6">Exercises</Typography>
              <ExercisesTableNew exercises={props.workout.exercises} tableSize={'small'} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

function WorkoutList(props) {
  const { workouts, error } = props;

  if (error) {
    return <p>{error}</p>;
  }

  if (!workouts) {
    return <p>Loading workouts...</p>;
  }

  return (
    <div>
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
                <Row key={workout.id} workout={workout} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default WorkoutList;
