import { useState } from 'react';
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
import ExerciseForm, { ExerciseFormData } from '../forms/create-forms/ExerciseForm';
import { patchExercise } from '../../api/exercises';
interface Exercise {
    id: number;
    muscleGroup: string;
    sets: number;
    userExperience: string;
    name: string;
    reps: number;
    description: string;
    exerciseImageLink: string;
    videoLink: string;
}

interface Props {
    exercises: Exercise[];
    pageAction: "checkbox" | "update";
}

export default function ExercisesCheckmark(props: Props) {
    const {exercises, pageAction} = props;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        { id: 'name', numeric: false, label: 'Name' },
        { id: 'description', numeric: false, label: 'Description' },
        { id: 'muscleGroup', numeric: false, label: 'Muscle group' },
        { id: 'userExperience', numeric: true, label: 'User experience' },
        { id: 'sets', numeric: true, label: 'Sets' },
        { id: 'reps', numeric: true, label: 'Reps' },
    ];


    async function onUpdate(id: number, exerciseInfo: ExerciseFormData) {
        console.log("Update exercise ", exerciseInfo, "with id ", id);

        const response = await patchExercise(exerciseInfo, id);
        if (response.error) {
            console.error("Error updating exercise:", response.error);
        } else {
            console.log("Exercise updated successfully:", response.exercise);
        }
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

                                    <TableCell>
                                        {pageAction === "checkbox" ? "Checkbox" : "Update"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exercises.map((exercise) => (
                                    <TableRow key={exercise['name'] + "-" + exercise['userExperience']}>
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
                                            <TableCell>
                                                <ScrollDialog
                                                    content={
                                                        <ExerciseForm
                                                            mode={"update"}
                                                            onSubmit={(exerciseInfo) => onUpdate(exercise.id, exerciseInfo)}
                                                            initialData={exercise}
                                                        />
                                                    }
                                                    buttonText="Update"
                                                    headerText={`Update exercise ${exercise['name']}`}
                                                />
                                            </TableCell>
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