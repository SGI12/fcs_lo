'use client'
import React from 'react';
import {Box, Button, Drawer, List, ListItem, ListItemText, Toolbar} from '@mui/material';
import ButtonDefault from "@/app/components/buttons/ButtonDefault";
import {logout} from "@/app/http/auth/auth";
import {useRouter} from "next/navigation";
import Image from "next/image";

const drawerWidth = 300;

export default function Navbar() {
    const router = useRouter()
    const getLogout = () => {
        logout()
            .then((res) => {
                console.log(res)
                window.location.href = '/login'
            })
            .catch(err => {
                console.log(err)
            });
    }
    return (
        <div style={{display: 'flex'}}>
            {/* Drawer (NavBar) */}
            <Drawer
                variant="permanent" // Фиксирует NavBar
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,

                    '& .MuiDrawer-paper': {
                        padding: '15px 45px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                    },
                }}
            >
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                }}>
                    <Image width={210} height={50} src="/logo.svg" alt="logo"/>
                    <ButtonDefault href='/home' text='Профиль'/>
                    <ButtonDefault text='Спортсмены' href='/'/>
                    <ButtonDefault text='Судьи' href='/home/judges'/>
                </Box>
                <div onClick={getLogout}>
                    <ButtonDefault href='/login' text='Выход'/>
                </div>
            </Drawer>
        </div>
    );
}
