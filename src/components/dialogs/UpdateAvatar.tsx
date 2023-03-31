import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { useState } from "react";

interface ProfileFormData {
    weight?: number;
    height?: number;
    disabilities?: string;
    medicalCondition?: string;
    profileImage?: string;
}
interface UpdateAvatarProps {
    user?: ProfileFormData;
    onSubmit: (values: any) => void;
    headerText: string;
    open: boolean;
    onClose: () => void;
}

const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png']; // Add your avatar filenames here

function UpdateAvatar({ user, onSubmit, headerText, open, onClose }: UpdateAvatarProps) {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProfileFormData>({
        profileImage: user?.profileImage || '',
        weight: user?.weight || 0,
        height: user?.height || 0,
        disabilities: user?.disabilities || '',
        medicalCondition: user?.medicalCondition || '',
    });

    const handleSelect = (profileImg: any) => {
        setSelectedAvatar(profileImg);
        setFormData({ ...formData, profileImage: profileImg });
    };

    const handleAvatarSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{headerText}</DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="center">
                    <Grid container spacing={2}>
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
                                        cursor: "pointer",
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                    <button onClick={handleAvatarSubmit}>Submit</button>
                </Box>
        </DialogContent>
    </Dialog>
  );
}