import { Stack, Typography, Container, Button } from "@mui/material";
import { FormEvent, useState } from "react";

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
        <Container maxWidth="xs">
            <form onSubmit={handleFormSubmit}>
                <Stack direction="column" spacing={3}>
                    <Typography variant="h4" component="h1">
                        {headerText}
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        {avatars.map((avatar, index) => (
                        <img
                            key={index}
                            src={`/img/avatars/${avatar}`}
                            alt="avatar"
                            onClick={() => handleSelect(`/img/avatars/${avatar}`)}
                            style={{
                                width: "100px",
                                height: "100px",
                                border:
                                    selectedAvatar === `/img/avatars/${avatar}` ? "2px solid blue" : "none",
                            }}
                        />
                    ))}
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disableElevation
                        disabled={!selectedAvatar}
                    >
                        Update
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default AvatarSelector;