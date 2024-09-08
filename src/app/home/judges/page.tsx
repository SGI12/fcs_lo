'use client'

import React, {useState} from 'react';
import {Box, Button} from "@mui/material";
import JudgesTable from "@/app/components/tables/judgesTable";
import DownloadIcon from '@mui/icons-material/Download';
import AddJudgeForm from "@/app/components/forms/addJudgeForm";
const Judges = () => {
    const [openForm, setOpenForm] = useState<boolean>(false)
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '36px 15px'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px'
            }}>
                <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <Button
                        onClick={() => {setOpenForm(true)}}
                        variant="contained"
                        sx={{

                            borderRadius: '15px',
                            textTransform: 'none',
                            fontSize: '22px',
                        }}>
                        Добавить судью
                    </Button>
                    <DownloadIcon sx={{
                        cursor: 'pointer'
                    }} color="primary"/>
                </Box>

            </Box>
            {openForm && <AddJudgeForm setOpenForm={setOpenForm}/>}
            <JudgesTable/>
        </Box>
    );
};

export default Judges;

