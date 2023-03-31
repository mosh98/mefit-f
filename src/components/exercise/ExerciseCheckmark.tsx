import {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import ScrollDialog from '../../components/dialogs/ScrollDialog';
import ExerciseForm from '../forms/create-forms/ExerciseForm';
import {deleteExercise, patchExercise} from '../../api/exercises';
import DeleteDialog from "../dialogs/DeleteDialog";
import {Exercise} from "../../const/interface";


interface Props {
    exercises: Exercise[];
    pageAction: "checkbox" | "update";
}

export default function ExercisesCheckmark(props: Props) {
    const {exercises, pageAction} = props;
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

    // Model
    interface Data {
        muscleGroup: string;
        sets: number;
        userExperience: string;
        name: string;
        reps: number;
        description: string;
    }

    // Table header
    interface HeadCell {
        id: keyof Data;
        label: string;
        numeric: boolean;
    }

    const headCells: readonly HeadCell[] = [
        {id: 'name', numeric: false, label: 'Name'},
        {id: 'description', numeric: false, label: 'Description'},
        {id: 'muscleGroup', numeric: false, label: 'Muscle group'},
        {id: 'userExperience', numeric: true, label: 'User experience'},
        {id: 'sets', numeric: true, label: 'Sets'},
        {id: 'reps', numeric: true, label: 'Reps'},
    ];


    async function onUpdate(id: number, exerciseInfo: Exercise) {

        const response = await patchExercise(exerciseInfo, id);
        if (response.error) {
            console.error("Error updating exercise:", response.error);
        } else {
            console.log("Exercise updated successfully:", response.exercise);

        }
    }

    const onDelete = async (id: number | undefined ) => {
        const {exercise, error} = await deleteExercise(id);
        if (error) {
            setDeleteError(error);
            console.error("Error deleting exercise:", error);
            return {error, response: null};
        } else {
            setDeleteSuccess("Exercise deleted successfully");
            return {error: null, response: exercise};
        }

        // TODO Handle refresh of the page after delete when handleClose in DeleteDialog
    }

    return (
        <>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '99%', mb: 2}}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="exercise table">
                            <TableHead>
                                <TableRow>
                                    {headCells.map((headcell) => (
                                        <TableCell key={headcell.id}>{headcell.label}</TableCell>
                                    ))}
                                    {pageAction === "checkbox" ?
                                        (
                                            <TableCell>
                                                Checkbox
                                            </TableCell>
                                        ) : (
                                            <>
                                                <TableCell>
                                                    Update
                                                </TableCell>
                                                <TableCell>
                                                    Delete
                                                </TableCell>
                                            </>
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exercises.map((exercise) => (
                                    <TableRow key={exercise['id'] + "-" + exercise['userExperience']}>
                                        <TableCell>{exercise['name']}</TableCell>
                                        <TableCell>
                                            <ScrollDialog content={<div>{exercise['description']}</div>}
                                                          buttonText="Info"
                                                          headerText={`Description for ${exercise['name']}`}/>
                                        </TableCell>
                                        <TableCell>{exercise['muscleGroup']}</TableCell>
                                        <TableCell>{exercise['userExperience']}</TableCell>
                                        <TableCell>{exercise['sets']}</TableCell>
                                        <TableCell>{exercise['reps']}</TableCell>
                                        {pageAction === 'checkbox' ? (
                                            <TableCell padding="checkbox" align={'center'}>
                                                <Checkbox/>
                                            </TableCell>) : (
                                            <>
                                                <TableCell>
                                                    <ScrollDialog
                                                        content={
                                                            <ExerciseForm
                                                                mode={"update"}
                                                                onSubmit={(exerciseInfo) => exercise.id && onUpdate(exercise.id, exerciseInfo)}
                                                                initialData={exercise}
                                                            />
                                                        }
                                                        buttonText="Update"
                                                        headerText={`Update exercise ${exercise['name']}`}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <DeleteDialog
                                                        entityName={exercise['name']}
                                                        onDelete={() => onDelete(exercise.id)}
                                                        errorMessage={deleteError}
                                                        successMessage={deleteSuccess}
                                                    />
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    )
}