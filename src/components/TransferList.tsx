import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Exercise } from '../const/interface';
import ScrollDialog from "./dialogs/ScrollDialog";
import ExerciseDisplay from "./exercise/ExerciseDisplay";
import {useEffect} from "react";
import {Alert, Snackbar, Typography} from "@mui/material";

interface TransferListProps {
    exercises: Exercise[];
    onUpdateRightList: (selectedExercises: Exercise[]) => void;
    onUpdateButtonClick: () => void;

}

export default function TransferList({ exercises, onUpdateRightList }: TransferListProps) {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<readonly number[]>([]);

    useEffect(() => {
        onUpdateRightList(selected.map((index) => exercises[index]));
    }, [selected]);
    const handleToggle = (value: number) => () => {
        const currentIndex = selected.indexOf(value);
        const newSelected = [...selected];

        if (currentIndex === -1) {
            if (newSelected.length < 5) {
                newSelected.push(value);
                setSelected(newSelected);
            } else {
                setSnackbarOpen(true);
            }
        } else {
            newSelected.splice(currentIndex, 1);
            setSelected(newSelected);
        }
    };

    const customList = () => (
        <Paper sx={{ width: 350, overflow: 'auto' }}>
            <Typography sx={{ padding: '8px' }} variant="h6">
                Selected Exercises: {selected.length}/5
            </Typography>
            <List dense component="div" role="list" sx={{ height: 230, overflow: 'auto' }}>
                {exercises.map((exercise, index) => {
                    const labelId = `transfer-list-item-${index}-label`;

                    return (
                        <ListItem key={index} role="listitem"  onClick={handleToggle(index)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={selected.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={exercise.name} />
                            <ListItemText id={labelId} primary={exercise.userExperience} />
                            <ScrollDialog content={<ExerciseDisplay exercise={exercise} />} buttonText={"INFO"} />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList()}</Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
                    You have reached the maximum limit of 5 items.
                </Alert>
            </Snackbar>
        </Grid>
    );
}
