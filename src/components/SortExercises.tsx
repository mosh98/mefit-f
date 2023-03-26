import * as React from "react";
import {useState} from "react";
import Card from "@mui/material/Card";
import {CardActionArea, CardActions} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";

interface SortExercisesProps {
    onUserExperienceChange: (experience: string) => void;
}

export function SortExercises({ onUserExperienceChange }: SortExercisesProps) {
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event: { target: { value: any; }; }) => {
        const selectedLevelId = event.target.value;
        const selectedLevel = levels.find((level) => level.id.toString() === selectedLevelId);
        onUserExperienceChange(selectedLevel?.name || '');
        setSelectedValue(selectedLevelId);
    };

    const [levels] = useState([
        {
            id: 1,
            name: "Beginner",
            description: "You have the most basic amount of expertise relating to exercise in gym.",
        },
        {
            id: 2,
            name: "Intermediate",
            description: "You have fully outclassed the basics but you are in the middle ground of skill relating to exercise in gym.",
        },
        {
            id: 3,
            name: "Expert",
            description: "You have high level of knowledge relating to exercise in gym and learnt basically everything of them that you can.",
        },
    ]);

    return (
        <>
            <h1>Choose Your Level</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {levels.map((level) => (
                    <Card sx={{ width: 345, height: 200, margin: '0.5rem' }} key={level.id}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
                                    {level.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {level.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Radio
                                checked={selectedValue === level.id.toString()}
                                onChange={handleChange}
                                value={level.id.toString()}
                                name="radio-buttons"
                                inputProps={{ 'aria-label': level.name }}
                            />
                        </CardActions>
                    </Card>
                ))}
            </div>
        </>
    );
}