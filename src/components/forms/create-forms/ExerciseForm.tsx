import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {userExperience} from "../../../const/userExperience";
import {ChangeEvent, FormEvent, useState} from "react";
import {Exercise} from "../../../const/interface";

interface ExerciseFormProps {
    onSubmit: (values: Exercise) => void;
    mode: "create" | "update";
    initialData?: Exercise;
}

export interface ExerciseFormData {
    name: string;
    userExperience: string;
    description: string;
    muscleGroup: string;
    reps: number;
    sets: number;
    exerciseImageLink: string;
    videoLink: string;
}

function ExerciseForm({ onSubmit, mode, initialData }: ExerciseFormProps) {
    const [formData, setFormData] = useState<Exercise>(
        initialData || {
            name: '',
            userExperience: '',
            description: '',
            muscleGroup: '',
            reps: 0,
            sets: 0,
            exerciseImageLink: '',
            videoLink: '',
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
        onSubmit(formData);
    };

    const handleChangeSelect = (e: SelectChangeEvent) => {
        setFormData({ ...formData, userExperience: e.target.value });
    };

    return (
        <>
            <Container maxWidth="xs">
                <form onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={3}>
                        <Typography variant="h4" component="h1">
                            {mode === "create" ? "Create Exercise" : "Update Exercise"}
                        </Typography>
                        <TextField
                            id="name"
                            type="text"
                            label="Name"
                            variant="standard"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            id="description"
                            type="text"
                            label="Description"
                            variant="standard"
                            multiline
                            rows={4}
                            required
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <TextField
                            id="muscleGroup"
                            type="text"
                            label="Muscle Group"
                            variant="standard"
                            required
                            value={formData.muscleGroup}
                            onChange={handleChange}
                        />
                        <TextField
                            id="reps"
                            type="number"
                            label="Reps"
                            variant="standard"
                            required
                            value={formData.reps}
                            onChange={handleChange}
                        />
                        <TextField
                            id="sets"
                            type="number"
                            label="Sets"
                            variant="standard"
                            required
                            value={formData.sets}
                            onChange={handleChange}
                        />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="user-experience-label">User Experience</InputLabel>
                            <Select
                                labelId="user-experience-label"
                                id="user-experience"
                                required
                                value={formData.userExperience}
                                label="User experience"
                                onChange={handleChangeSelect}
                            >
                                {userExperience.map((experience) => (
                                    <MenuItem key={experience} value={experience}>
                                        {experience}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="exerciseImageLink"
                            type="text"
                            label="Exercise Image Link"
                            variant="standard"
                            value={formData.exerciseImageLink}
                            onChange={handleChange}
                        />
                        <TextField
                            id="videoLink"
                            type="text"
                            label="Video Link"
                            variant="standard"
                            value={formData.videoLink}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disableElevation
                        >
                            {mode === "create" ? "Create" : "Update"}
                        </Button>
                    </Stack>
                </form>
            </Container>
        </>
    );
}

export default ExerciseForm;