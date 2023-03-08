import { Button, Stack, TextField, Typography, Container, Divider } from '@mui/material';

function LoginForm() {
    return ( 
        <>
            <Container maxWidth="xs">
                <Stack direction='column' spacing={2} marginBottom={10}>
                    <Typography variant='h4' component='h1'>Login</Typography>
                    <TextField id="login-email" type='email' label="Email" variant="standard"/>
                    <TextField id="login-password" type='password' label="Password" variant="standard"/>
                    <Button variant='contained' size='large' disableElevation onClick={() => console.log("Login-button clicked!")}>Login</Button>
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="body1" component='h2'>Don't have an account?</Typography>
                    <Button variant='contained' size='large' color='secondary' disableElevation onClick={() => console.log("Sign-up-button clicked!")}>Sign up</Button>
                </Stack>
            </Container>
        </>
     );
}

export default LoginForm;