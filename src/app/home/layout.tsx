'use client'
import React from 'react';
import Navbar from "@/app/components/navbar";

import Header from "@/app/components/header";
import { Box } from "@mui/material";
import {Provider} from "react-redux";
import {store} from "@/store";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>

            <Navbar />
            <Header />
            <Box
                component="main"
                sx={{
                    marginTop: '64px',
                    marginLeft: '300px',
                    padding: '20px',
                    backgroundColor: 'rgba(47, 159, 216, 0.1)',
                    minHeight: '100vh',
                }}
            >
                {children}
            </Box>
        </Provider>
    );
};

export default Layout;
