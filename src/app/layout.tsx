import './globals.css'
import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "@/theme";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";


export const metadata = {
    title: 'Ленинградское отделение ФКС Россиии',
    description: 'Ленинградское отделение ФКС Россиии',
}


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                  rel="stylesheet"/>
        </head>
        <body>
        <CssBaseline/>
        <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
