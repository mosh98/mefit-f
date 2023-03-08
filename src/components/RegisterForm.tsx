import { Button, Stack, TextField, Typography, Container, FormGroup, Input } from '@mui/material';

function RegisterForm() {
    // TODO: Needs to add first- and lastname and other details!

    return ( 
        <>
            <Container maxWidth="xs">
                <Stack direction='column' spacing={3}>
                    <Typography variant='h4' component='h1' >Sign up</Typography>
                    <TextField id="register-first-name" type='text' label="First Name" variant="standard" required/>
                    <TextField id="register-last-name" type='text' label="Last Name" variant="standard" required/>
                    <TextField id="register-email" type='email' label="Email" variant="standard" required/>
                    <TextField id="register-password" type='password' label="Password" variant="standard" required/>
                    <TextField id="register-address" type='text' label="Address" variant="standard" required/>
                    <TextField id="register-postal-code" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type='text' label="Postal Code" variant="standard" required/>
                    <TextField id="register-city" type='text' label="City" variant="standard" required/>
                    <TextField id="register-country" type='text' label="Country" variant="standard" required/>
                    <Button variant='contained' size='large' disableElevation onClick={() => console.log("Register-button clicked!")}>Register</Button>
                </Stack>
            </Container>
        </>
     );
}

export default RegisterForm;