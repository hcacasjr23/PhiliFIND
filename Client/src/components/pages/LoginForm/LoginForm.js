import React, { useState } from 'react';

// Import components
import { TextField, InputAdornment, Box, Container, Grid, Button } from '@mui/material';

//MUI Styled Components
import { StyledTextField } from '../StyledComponents.js';

// Import Icons
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

// Import css 
import './LoginForm.css'


function LoginForm({ Login }) {

    const [details, setDetails] = useState({
        userName: "",
        password: ""
    })

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        Login(details);
    }



    return (
        <div className='login-form-wrapper'>

            <form onSubmit={handleSubmit}>

                <div className='login-details-container'>

                    <Grid container direction='row' rowSpacing={0} className='login-header'>
                        <Grid item={true} xs={6} className='column'>
                            <div className='highlight'>PhiliFIND</div>
                        </Grid>
                        <Grid item={true} xs={6} className='column'>
                            <Grid container direction='row'>
                                <Grid item={true} xs={12}>
                                    Administrator
                                </Grid>
                                <Grid item={true} xs={12}>
                                    Dashboard
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        {/* User Name Section */}
                        <Grid item={true} xs={12}>
                            <StyledTextField
                                className='textfield'
                                id='userName'
                                label="Username"
                                autoComplete='username'
                                value={details.userName}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setDetails({ ...details, userName: e.target.value })}
                            />
                        </Grid>
                        {/* End of User Name Section */}

                        {/* Password Section */}
                        <Grid item={true} xs={12}>
                            <StyledTextField
                                className='textfield'
                                id='password'
                                label="Password"
                                type="password"
                                value={details.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                autoComplete='current-password'
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setDetails({ ...details, password: e.target.value })}
                            />
                        </Grid>
                        {/* End of Password Section */}
                    </Grid>

                    <Button 
                        id="login-button" 
                        variant="contained" 
                        onClick={handleSubmit}>
                        Login
                    </Button>

                </div>

            </form>

        </div>
    )
}

export default LoginForm;