import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Box,
    Typography,
    Checkbox
} from "@mui/material";
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import ExercisesTableNew from "../exercise/ExercisesTableNew";

function Row(props) {
    const [open, setOpen] = useState(false);

    const isChecked = () => {
        if (props.mode === "select") {
            return props.checkedIds.includes(props.workout.id);
        } else if (props.mode === "complete") {
            return props.workout.completed;
        }
    };

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
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={isChecked()}
                        onChange={(event) => {
                            props.handleCheckboxChange(
                                props.workout,
                                event.target.checked
                            );
                        }}
                    />
                </TableCell>
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

function WorkoutListCheckmark(props) {
    const { workouts, error, mode, onWorkoutSelection, onWorkoutCompletion } = props;
    const [checkedIds, setCheckedIds] = useState([]);
    const [pickedWorkouts, setPickedWorkouts] = useState([]);

    const handleCheckboxChange = (workout, checked) => {
        if (mode === "select") {
            if (checked) {
                const newCheckedIds = [...checkedIds, workout.id];
                const newPickedWorkouts = [...pickedWorkouts, workout];
                onWorkoutSelection(newPickedWorkouts);
                setCheckedIds(newCheckedIds);
                setPickedWorkouts(newPickedWorkouts);
            } else {
                const newCheckedIds = checkedIds.filter((id) => id !== workout.id);
                const newPickedWorkouts = pickedWorkouts.filter(
                    (w) => w.id !== workout.id
                );
                onWorkoutSelection(newPickedWorkouts);
                setCheckedIds(newCheckedIds);
                setPickedWorkouts(newPickedWorkouts);
            }
        } else if (mode === "complete") {
            onWorkoutCompletion(workout.id, checked);
        }
    };

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
                                <TableCell>Checkbox</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workouts.map((workout) => (
                                <Row
                                    key={workout.id}
                                    workout={workout}
                                    mode={mode}
                                    checkedIds={checkedIds}
                                    setCheckedIds={setCheckedIds}
                                    handleCheckboxChange={handleCheckboxChange}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}


export default WorkoutListCheckmark;