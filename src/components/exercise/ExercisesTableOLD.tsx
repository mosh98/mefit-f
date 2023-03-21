import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import {useState} from "react";


interface Data {
    muscleGroup: string;
    sets: number;
    userExperience: string;
    name: string;
    reps: number;
}

const rows = [
    {
        "id": 1,
        "name": "Barbell bench press",
        "description": "Lift the bar from the rack and hold it straight over you with your arms locked. Lower it slowly until it skims the middle of your chest, then push it back to the starting position. Intermediate level.",
        "muscleGroup": "chest",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 8,
        "sets": 3,
        "completed": false,
        "userExperience": "intermediate",
        "workout": 1
    },
    {
        "id": 2,
        "name": "Dumbbell flyes",
        "description": "Lie on a flat bench with a dumbbell on each hand. Slowly lower the dumbbells to the side, feeling the chest muscles stretch. Inhale and bring your arms back up. Intermediate level.",
        "muscleGroup": "chest",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 12,
        "sets": 3,
        "completed": false,
        "userExperience": "intermediate",
        "workout": 1
    },
    {
        "id": 3,
        "name": "Lat pulldown",
        "description": "Sit down on a pull-down machine with a wide bar attached to the top pulley. Bring the bar down until it touches your upper chest. Intermediate level.",
        "muscleGroup": "back",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 8,
        "sets": 3,
        "completed": false,
        "userExperience": "intermediate",
        "workout": 2
    },
    {
        "id": 4,
        "name": "Dumbbell rows",
        "description": "Choose a flat bench and place a dumbbell on each side of it. With a flat back, pull the weight up to your side until your elbow forms a 90-degree angle. Beginner level.",
        "muscleGroup": "back",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 12,
        "sets": 3,
        "completed": false,
        "userExperience": "beginner",
        "workout": 2
    },
    {
        "id": 5,
        "name": "Squats",
        "description": "Stand with your feet shoulder-width apart, keeping your back straight. Lower your body until your thighs are parallel to the ground. Push back up to the starting position. Beginner level.",
        "muscleGroup": "legs",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 6,
        "sets": 3,
        "completed": false,
        "userExperience": "beginner",
        "workout": 3
    },
    {
        "id": 6,
        "name": "Lunges",
        "description": "Take a step forward, dropping your back knee towards the ground. Push back up to the starting position, then repeat with the other leg. Intermediate level.",
        "muscleGroup": "legs",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 8,
        "sets": 3,
        "completed": false,
        "userExperience": "intermediate",
        "workout": 3
    },
    {
        "id": 7,
        "name": "Overhead press",
        "description": "Stand with your feet shoulder-width apart, holding a weight in each hand. Push the weights up overhead, then lower them back down. Intermediate level.",
        "muscleGroup": "shoulders",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 8,
        "sets": 3,
        "completed": false,
        "userExperience": "intermediate",
        "workout": 5
    },
    {
        "id": 8,
        "name": "Front raises",
        "description": "Stand with your feet shoulder-width apart, holding a weight in each hand. Raise the weights up in front of you, then lower them back down. Beginner level.",
        "muscleGroup": "shoulders",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 6,
        "sets": 3,
        "completed": false,
        "userExperience": "beginner",
        "workout": 5
    },
    {
        "id": 9,
        "name": "Lateral raises",
        "description": "Stand with your feet shoulder-width apart, holding a weight in each hand. Raise the weights out to the sides until they reach shoulder height, then lower them back down. Intermediate level.",
        "muscleGroup": "shoulders",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 12,
        "sets": 3,
        "completed": false,
        "userExperience": "intermediate",
        "workout": 5
    },
    {
        "id": 10,
        "name": "Handstand push-ups",
        "description": "Get into a handstand position with your hands on the ground and your feet against a wall. Lower your head down towards the ground, then push back up. Advanced level.",
        "muscleGroup": "shoulders",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 5,
        "sets": 5,
        "completed": false,
        "userExperience": "expert",
        "workout": 5
    },
    {
        "id": 11,
        "name": "Barbell bench press",
        "description": "Lift the bar from the rack and hold it straight over you with your arms locked. Lower it slowly until it skims the middle of your chest, then push it back to the starting position. Expert level.",
        "muscleGroup": "chest",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 10,
        "sets": 4,
        "completed": false,
        "userExperience": "expert",
        "workout": 1
    },
    {
        "id": 12,
        "name": "Dumbbell flyes",
        "description": "Lie on a flat bench with a dumbbell on each hand. Slowly lower the dumbbells to the side, feeling the chest muscles stretch. Inhale and bring your arms back up. Expert level.",
        "muscleGroup": "chest",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 12,
        "sets": 4,
        "completed": false,
        "userExperience": "expert",
        "workout": 1
    },
    {
        "id": 13,
        "name": "Deadlifts",
        "description": "Stand with your mid-foot under the bar. Grab the bar, keeping your shoulders over the bar and your hips high. Lift the bar by extending your hips and knees. Expert level.",
        "muscleGroup": "back",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 8,
        "sets": 4,
        "completed": false,
        "userExperience": "expert",
        "workout": 2
    },
    {
        "id": 14,
        "name": "Chin-ups",
        "description": "Grab onto a pull-up bar with your palms facing towards you. Pull yourself up until your chin is over the bar, then lower yourself back down. Expert level.",
        "muscleGroup": "back",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 10,
        "sets": 4,
        "completed": false,
        "userExperience": "expert",
        "workout": 2
    },
    {
        "id": 15,
        "name": "Barbell squats",
        "description": "Stand with your feet shoulder-width apart, keeping your back straight. Lower your body until your thighs are parallel to the ground. Push back up to the starting position. Expert level.",
        "muscleGroup": "legs",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 6,
        "sets": 4,
        "completed": false,
        "userExperience": "expert",
        "workout": 3
    },
    {
        "id": 16,
        "name": "Bulgarian split squats",
        "description": "Stand with one foot forward and the other foot back on a bench. Lower your body until your front thigh is parallel to the ground, then push back up to the starting position. Switch legs and repeat. Expert level.",
        "muscleGroup": "legs",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 8,
        "sets": 4,
        "completed": false,
        "userExperience": "expert",
        "workout": 3
    },
    {
        "id": 17,
        "name": "Military press",
        "description": "Stand with your feet shoulder-width apart, holding a barbell in front of you. Push the barbell up overhead, then lower it back down to the starting position. Expert level.",
        "muscleGroup": "shoulders",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 8,
        "sets": 4,
        "completed": false,
        "userExperience": "expert",
        "workout": 5
    },
    {
        "id": 18,
        "name": "Lateral raises",
        "description": "Stand with your feet shoulder-width apart, holding a weight in each hand. Raise the weights out to the sides until they reach shoulder height, then lower them back down. Expert level.",
        "muscleGroup": "shoulders",
        "exerciseImageLink": null,
        "videoLink": null,
        "reps": 12,
        "sets": 4,
        "completed": false,
        "userExperience": "expert",
        "workout": 5
    }
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

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

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {

    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar() {

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Exercise Catalog
                </Typography>
        </Toolbar>
    );
}

export default function ExercisesTable() {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('muscleGroup');
    const [selected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '70%', mb: 2 }}>
                <EnhancedTableToolbar  />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />

                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                        >
                                            <TableCell padding="checkbox">
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell >{row.muscleGroup}</TableCell>
                                            <TableCell >{row.userExperience}</TableCell>
                                            <TableCell align="right">{row.sets}</TableCell>
                                            <TableCell align="right">{row.reps}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
