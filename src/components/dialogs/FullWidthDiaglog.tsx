import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {ReactNode, useEffect, useRef, useState} from "react";

interface ScrollDialogProps {
    content: ReactNode;
    buttonText: string;
    headerText?: string;
    onSelect?: () => void;
}

function FullWidthDialog({ content, buttonText, headerText, onSelect }: ScrollDialogProps) {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelected = () => {
        if (onSelect) {
            onSelect();
        }
        setOpen(false);
    }

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <Button onClick={handleClickOpen('paper')}>{buttonText}</Button>

            <Dialog
                fullWidth={true}
                maxWidth='lg'
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{headerText}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    {content}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSelected}>Select</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FullWidthDialog;