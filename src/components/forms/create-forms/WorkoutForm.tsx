import {
    Button,
    Container,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {Exercise} from "../../../const/interface";

interface WorkoutFormProps {
    onSubmit: (values: Workout) => void;
    onInputChange: (values: Workout) => void;
    mode: "create" | "update";
    initialData?: Workout;
}

interface Workout {
    name: string;
    type: string;
    exercises: Exercise[];
    experienceLevel: string;
}

function WorkoutForm({onSubmit, onInputChange, mode, initialData}: WorkoutFormProps) {
    const [formData, setFormData] = useState<Workout>(
        initialData || {
            name: '',
            type: '',
            exercises: [],
            experienceLevel: '',
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedFormData = {...formData, [e.target.id]: e.target.value};
        setFormData(updatedFormData);
        onInputChange(updatedFormData);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <>
            <Container maxWidth="xs">
                <form onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={3}>
                        <Typography variant="h4" component="h1">
                            {mode === "update" ? "Update Workout" : "Create Workout"}
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
                            id="type"
                            type="text"
                            label="Type"
                            variant="standard"
                            required
                            value={formData.type}
                            onChange={handleChange}
                        />
                        {mode === "update" ? (
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disableElevation
                            >
                                Update
                            </Button>
                        ) : null}

                    </Stack>
                </form>
            </Container>
        </>
    );
}

export default WorkoutForm;