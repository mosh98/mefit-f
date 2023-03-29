import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";

interface DeleteDialogProps {
    entityName: string;
    onDelete: () => Promise<{ error: string | null; response: any }>;
    errorMessage: string | null;
    successMessage: string | null;
}

function DeleteDialog({entityName, onDelete, errorMessage, successMessage}: DeleteDialogProps) {
    const [open, setOpen] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleDelete() {
        if (onDelete) {
            onDelete().then(() => {
                setIsDone(true);
            });
        }
    }

    return (
        <>
            <Button onClick={handleClickOpen}>Delete</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="Delete-entity"
            >
                <DialogTitle id="scroll-dialog-title">Delete {entityName}</DialogTitle>
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
                            <Button onClick={handleDelete}>Delete</Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteDialog;