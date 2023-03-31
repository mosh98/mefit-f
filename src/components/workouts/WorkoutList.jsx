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
import UpdateDialog from "../dialogs/UpdateDialog";
import {UpdateWorkout} from "../forms/UpdateWorkout";
import {updateWorkoutById } from "../../api/workouts";
import axios from "axios";
import {useMeFitContext} from "../../MeFitMyContext";

function Row(props) {
    const {fetchWorkoutData} = useMeFitContext();
    const [open, setOpen] = useState(false);
    const [updateError, setUpdateSError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');

    const updateWorkout = async (id , data) => {
        try {
            const response = await axios.patch(
                `https://database-mefit.herokuapp.com/workouts/updateWorkout/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );


            // Handle the successful response
            console.log(response.data);

        } catch (error) {
            // Handle the error
            console.error(error);
        }
    };

    const onUpdate = async (id, updatedWorkout) => {
        console.log("onUpdate IS this it", id);
        console.log("onUpdate IS this it", props.workout);
        const a = props.workout.name;
        console.log("onUpdate IS this it", props.workout.name);
        console.log("onUpdate IS this it", a);

     //   await updateWorkoutById(id, updatedWorkout)

        try {
            await updateWorkoutById(id, props.workout);
            setUpdateSError('');
            setUpdateSuccess('Workout updated successfully');
        } catch (e) {
            setUpdateSError('Failed to update workout');
            setUpdateSuccess('');
        }

         fetchWorkoutData();
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
                                content={<UpdateWorkout workout={props.workout} onUpdate={(updatedWorkout) => onUpdate(props.workout.id, updatedWorkout)} />}
                                entityName={props.workout['name']}
                                onUpdate={() => onUpdate(props.workout.id)}
                                errorMessage={updateError}
                                successMessage={updateSuccess}
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
