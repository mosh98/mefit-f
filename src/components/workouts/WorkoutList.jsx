import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Box,
    Typography
} from "@mui/material";
import Paper from '@mui/material/Paper';
import {useState} from "react";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import ExercisesTableNew from "../exercise/ExercisesTableNew";
import keycloak from "../../keycloak";
import DeleteDialog from "../dialogs/DeleteDialog";
import {deleteWorkoutById} from "../../api/workouts";
import UpdateDialog from "../dialogs/UpdateDialog";

function Row(props) {
    const [open, setOpen] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState('');

    const onDelete = async (id) => {
        const {workout, error} = await deleteWorkoutById(id);
        if (error) {
            setDeleteError(error);
            console.error("Error deleting workout:", error);
            return {error, response: null};
        } else {
            setDeleteSuccess("Workout deleted successfully");
            console.log("Workout deleted successfully:", workout);
            return {error: null, response: workout};
        }

        // TODO Handle refresh of the page after delete when handleClose in DeleteDialog
    }

    return (
        <>
            {/* Workout data rows */}
            <TableRow>
                <TableCell>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                <TableCell>{props.workout.name}</TableCell>
                <TableCell>{props.workout.type}</TableCell>
                <TableCell>{props.workout.experienceLevel}</TableCell>
                {keycloak.hasRealmRole('ADMIN') &&
                    <>
                        <TableCell>
                            <UpdateDialog
                                entityName={props.workout['name']}
                                onUpdate={() => onDelete(props.workout.id)}
                                errorMessage={deleteError}
                                successMessage={deleteSuccess}
                            />
                        </TableCell>
                        <TableCell>
                            <DeleteDialog
                                entityName={props.workout['name']}
                                onDelete={() => onDelete(props.workout.id)}
                                errorMessage={deleteError}
                                successMessage={deleteSuccess}
                            />
                        </TableCell>
                    </>
                }
            </TableRow>
            {/* Collapsible rows */}
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto">
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6">Exercises</Typography>
                            <ExercisesTableNew exercises={props.workout.exercises} tableSize={'small'}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

function WorkoutList(props) {
    const {workouts, error} = props;


    if (error) {
        return <p>{error}</p>;
    }

    if (!workouts) {
        return <p>Loading workouts...</p>;
    }


    return (
        <div>
            <Paper sx={{width: '99%', mb: 2}}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Workout name</TableCell>
                                <TableCell>Target Area</TableCell>
                                <TableCell>Experience</TableCell>
                                {keycloak.hasRealmRole('ADMIN') &&
                                    <>
                                        <TableCell>Update</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workouts.map((workout, index) => (
                                <Row key={index} workout={workout}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default WorkoutList;
