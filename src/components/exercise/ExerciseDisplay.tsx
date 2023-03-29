import React from 'react';
import {Card, CardContent, CardHeader, CardMedia, Typography, Link} from '@mui/material';
import { Exercise } from '../../const/interface';

interface ExerciseDisplayProps {
    exercise: Exercise;
}

function ExerciseDisplay({exercise}: ExerciseDisplayProps) {

    return (
        <>
            <Card key={exercise.id}>
                <CardHeader title={exercise.name} subheader={exercise.muscleGroup}/>
                <CardMedia image={exercise.exerciseImageLink} title={exercise.name}/>
                <CardMedia
                    component="img"
                    image={exercise.exerciseImageLink ? exercise.exerciseImageLink : '/img/default-image.jpg'}
                    title={exercise.name}
                    alt={exercise.name}
                    sx={{height: 200, maxWidth: 400}}
                />
                <CardContent>
                    <Typography variant="body1" component="p">
                        Description: {exercise.description}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Reps: {exercise.reps}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Sets: {exercise.sets}
                    </Typography>
                    <Typography variant="body1" component="p">
                        User Experience: {exercise.userExperience}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Video: <Link href={exercise.videoLink} target="_blank" rel="noopener">Watch video</Link>
                    </Typography>
                </CardContent>
            </Card>

        </>
    );
}

export default ExerciseDisplay;