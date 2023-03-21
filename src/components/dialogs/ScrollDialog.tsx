import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {ReactNode, useEffect, useRef} from "react";

interface ScrollDialogProps {
    content: ReactNode;
    buttonText: string;
    headerText: string;
}

function ScrollDialog({ content, buttonText, headerText }: ScrollDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ScrollDialog;