import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ScrollDialog from "../../components/dialogs/ScrollDialog";
import { Box } from '@mui/system';
import { useState } from 'react';
import {Checkbox} from "@mui/material";
import ExerciseForm from "../forms/create-forms/ExerciseForm";

interface Exercise {
    muscleGroup: string;
    sets: number;
    userExperience: string;
    name: string;
    reps: number;
    description: string;
}

interface Props {
    exercises: Exercise[];
    tableSize: "small" | "normal";
}

export default function ExercisesTableTest(props: Props) {
    const { exercises, tableSize } = props;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

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
        {
            id: 'name',
            numeric: false,
            label: 'Name',
        },
        {
            id: 'description',
            numeric: false,
            label: 'Description'
        },
        {
            id: 'muscleGroup',
            numeric: false,
            label: 'Muscle group',
        },
        {
            id: 'userExperience',
            numeric: true,
            label: 'User experience',
        },
        {
            id: 'sets',
            numeric: true,
            label: 'Sets',
        },
        {
            id: 'reps',
            numeric: true,
            label: 'Reps',
        },
    ];



    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '99%', mb: 2 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size={tableSize === 'small' ? 'small' : 'medium'} aria-label="exercise table">
                            <TableHead>
                                <TableRow>
                                    {headCells.map((headcell) => (
                                        <TableCell key={headcell.id}>{headcell.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exercises.map((exercise) => (
                                    <TableRow key={exercise['name'] + "-" + exercise['userExperience']}>
                                        <TableCell>{exercise['name']}</TableCell>
                                        <TableCell>
                                            <ScrollDialog content={<div>{exercise['description']}</div>} buttonText="Info" headerText={`Description for ${exercise['name']}`} />
                                        </TableCell>
                                        <TableCell>{exercise['muscleGroup']}</TableCell>
                                        <TableCell>{exercise['userExperience']}</TableCell>
                                        <TableCell>{exercise['sets']}</TableCell>
                                        <TableCell>{exercise['reps']}</TableCell>
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