import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";

interface UpdateDialogProps {
    entityName: string;
    onUpdate: () => Promise<{ error: string | null; response: any }>;
    errorMessage: string | null;
    successMessage: string | null;
}

function UpdateDialog({entityName, onUpdate, errorMessage, successMessage}: UpdateDialogProps) {
    const [open, setOpen] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleUpdate() {
        if (onUpdate) {
            onUpdate().then(() => {
                setIsDone(true);
            });
        }
    }

    return (
        <>
            <Button onClick={handleClickOpen}>Update</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="Delete-entity"
            >
                <DialogTitle id="scroll-dialog-title">Update {entityName}</DialogTitle>
                {isDone ? (
                    <DialogContent>
                        {errorMessage && <p>Error: {errorMessage}</p>}
                        {successMessage && <p>Success: {successMessage}</p>}
                    </DialogContent>
                ) : (
                    <DialogContent>
                        Are you sure you want to delete this {entityName}?
                    </DialogContent>
                )}
                <DialogActions>
                    {isDone ? (
                        <Button onClick={handleClose}>Close</Button>
                    ) : (
                        <>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleUpdate}>Delete</Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UpdateDialog;