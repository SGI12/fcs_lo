'use client'
import React, {useEffect} from 'react';
import {AppBar, Avatar, Toolbar, Typography} from "@mui/material";
import {roboto} from "@/app/fonts";
import {fetchUser} from "@/app/http/user/user";
import {useRouter} from "next/navigation";



const Header = () => {
    const [username, setUsername] = React.useState<string>("");
    const router = useRouter()
    useEffect(() => {
        fetchUser()
            .then((res ) => {
                setUsername(`${res.data.name} ${res.data.LName[0]}.`)
            })
            .catch ((error) => {
                console.log(error)
                router.push('/login')
            })

    }, [])
    return (
        <AppBar  position="fixed">
            <Toolbar sx={{
                padding: '15px 20px',
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderBottom: 'none',
                boxShadow: '0 3px 6px hsla(0, 100%, 0, 0.1)',
            }}>
                <Avatar sx={{
                    backgroundColor: '#7650C7',
                }}/>
                <Typography sx={{
                    color: '#000000',
                    fontSize: '16px',
                    fontWeight: '500',
                    marginLeft: '10px',
                }} variant="h6" component="div">
                    {username}
                </Typography>
            </Toolbar>

        </AppBar>
    );
};

export default Header;

