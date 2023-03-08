import { Button, Stack, TextField, Typography, Container } from '@mui/material';

function RegisterForm() {
    // TODO: Needs to add first- and lastname and other details!

    return ( 
        <>
            <Container maxWidth="xs">
            <Stack direction='column' spacing={2}>
                    <Typography variant='h4' component='h1' >Sign up</Typography>

                    <TextField id="register-email" type='email' label="Email" variant="standard" />
                    <TextField id="register-password" type='password' label="Password" variant="standard" />
                    <Button variant='contained' size='large' disableElevation onClick={() => console.log("Register-button clicked!")}>Register</Button>
                </Stack>
            </Container>
        </>
     );
}

export default RegisterForm;