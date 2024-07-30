'use client'
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import React, { useState } from 'react';
const roboto = Roboto({ subsets: ['cyrillic'], weight: '400' })

const page = () => {
    const [name, setName] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80vh', justifyContent: 'center'}}  component="main" maxWidth="xs">
      
      <Box  sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        
            <Image src={'/logo.svg'} alt='logo' width={250} height={100}/>
        
        <Typography sx={{mb: 3}} className={roboto.className}  component="h1" variant="h5">
          Регистрация
        </Typography>

        <form  noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Имя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Фамилия"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{mb: 2}}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            
          </Grid>
          <Button
            className={roboto.className}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Зарегистрироваться
          </Button>
          
        </form>
      </Box>
      
    </Container>
    );
};

export default page;