'use client'
import {  Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

import Image from 'next/image';
import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {authData} from "@/types/user";
import {getUserAuth} from "@/app/http/auth/auth";
import {useRouter} from "next/navigation";
import {roboto} from "@/app/fonts";






const Login = () => {
    const [resError, setResError] = useState<string>('');
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<authData>({
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const onSubmit:SubmitHandler<authData> = (data) => {
        getUserAuth(data)
            .then(() => {
                router.replace('/home')
            })
            .catch((err) => {
                if (err.status === 401) {
                    setResError('Неверный email или пароль')
                }
                else if (err.status === 500) {
                    setResError('Ошибка сервера. Попробуйте позже')
                }
            })
    };
    return (
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80vh', justifyContent: 'center'}}  component="main" maxWidth="xs">

            <Box  sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Image src={'/logo.svg'} alt='logo' width={250} height={100}/>

                <Typography sx={{mb: 3}}  component="h1" variant="h5">
                    Вход
                </Typography>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoComplete="email"
                                {...register('email', {
                                    required: 'Введите e-mail',
                                    pattern: {
                                        value:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Неверный формат e-mail'
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{mb: 2}}
                                variant="outlined"
                                required
                                fullWidth
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password', {
                                    required: 'Введите пароль',
                                    minLength: {
                                        value: 8,
                                        message: 'Пароль не может быть меньше 8 символов',
                                    },})}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Войти
                    </Button>
                    {resError && <Typography color="error">{resError}</Typography>}
                </form>
            </Box>

        </Container>
    );
};

export default Login;