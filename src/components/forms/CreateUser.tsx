import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import keycloak from "../../keycloak";
import {createUser} from "../../api/user";

interface CreateUserFormProps {
    onSubmit: (result: { userInfo: any[], error: string | null }) => void;
}

interface CreateUserFormData {
    e_mail: string;
    first_name: string;
    last_name: string;
    keyCloakId?: string;
}

function CreateUser({onSubmit}: CreateUserFormProps) {
    const [formData, setFormData] = useState<CreateUserFormData>({
        e_mail: keycloak.tokenParsed?.email,
        first_name: keycloak.tokenParsed?.given_name,
        last_name: keycloak.tokenParsed?.family_name,
        keyCloakId: keycloak.tokenParsed?.sub,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await createUser(formData);
        onSubmit(result);

    };

    return (
        <Container maxWidth="xs">
            <Stack direction="column" spacing={3}>
                <Typography variant="h4" component="h1">
                    Registration
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="first_name"
                        type="text"
                        label="First Name"
                        variant="standard"
                        required
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <TextField
                        id="last_name"
                        type="text"
                        label="Last Name"
                        variant="standard"
                        required
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <TextField
                        id="e_mail"
                        type="email"
                        label="Email"
                        variant="standard"
                        required
                        value={formData.e_mail}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disableElevation
                    >
                        Update
                    </Button>
                </form>
            </Stack>
        </Container>
    );
}

export default CreateUser;