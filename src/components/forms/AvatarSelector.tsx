import { Stack, Typography, Container, Button } from "@mui/material";
import { FormEvent, useState } from "react";
import Grid from "@mui/material/Grid";

interface AvatarSelectorProps {
    onSelect: (avatar: string) => void;
    headerText: string;
    handleSubmit: (avatar: string) => void;
}
const avatars = [
    "man1.png",
    "man2.png",
    "man3.png",
    "man4.png",
    "woman1.png",
    "woman2.png",
    "woman3.png",
    "woman4.png",
];

function AvatarSelector({ onSelect, headerText, handleSubmit  }: AvatarSelectorProps) {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    const handleSelect = (avatar: string) => {
        setSelectedAvatar(avatar);
        onSelect(avatar);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedAvatar) {
            handleSubmit(selectedAvatar);
        }
    };

    return (
        <Container>
            <form onSubmit={handleFormSubmit}>
                <Stack direction="column" spacing={3}>
                    <Typography variant="h4" component="h1">
                        {headerText}
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {avatars.map((avatar, index) => (
                            <Grid key={index} item xs={3} justifyContent="center" alignItems="center">
                                <img
                                    src={`/img/avatars/${avatar}`}
                                    alt="avatar"
                                    onClick={() => handleSelect(`/img/avatars/${avatar}`)}
                                    style={{
                                        width: "125px",
                                        height: "125px",
                                        border:
                                            selectedAvatar === `/img/avatars/${avatar}` ? "2px solid blue" : "none",
                                    }}
                                />
                            </Grid>
                        ))}
                        <Container maxWidth="xs" sx={{ marginTop: 5 }}>
                            <Button
                                fullWidth={true}
                                type="submit"
                                variant="contained"
                                size="large"
                                disableElevation
                                disabled={!selectedAvatar}
                            >
                                Update
                            </Button>
                        </Container>
                    </Grid>
                </Stack>
            </form>
        </Container>
    );
}

export default AvatarSelector;