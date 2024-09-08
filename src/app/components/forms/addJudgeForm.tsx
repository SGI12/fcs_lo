'use client'

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addJudge } from '@/store/slices/judgesSlice';
import {AppDispatch} from "@/store";


interface FormProps {
    setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddJudgeForm: React.FC<FormProps> = ({setOpenForm}) => {
    const dispatch: AppDispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [region, setRegion] = useState('');
    const [category, setCategory] = useState(0);
    const [validityPeriod, setValidityPeriod] = useState(0);
    const [assignmentDate, setAssignmentDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const handleSubmit = () => {
        dispatch(addJudge({
            fullName,
            birthDate,
            region,
            category,
            validityPeriod,
            assignmentDate,
            expirationDate,
        }));
        setOpenForm(false)
    };

    return (
        <Dialog open={true} >
            <DialogTitle>Добавить судью</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Фамилия Имя Отчество"
                    fullWidth
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Дата рождения"
                    placeholder="none"
                    type="date"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    fullWidth
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}

                />
                <TextField
                    margin="dense"
                    label="Регион"
                    fullWidth
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Судейская категория"
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(Number(e.target.value))}
                />
                <TextField
                    margin="dense"
                    label="Дата присвоения"
                    type="date"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    fullWidth
                    value={assignmentDate}
                    onChange={(e) => setAssignmentDate(e.target.value)}

                />
                <TextField
                    margin="dense"
                    label="Дата окончания"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="date"
                    fullWidth
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}

                />
                <TextField
                    margin="dense"
                    label="Срок действия (лет)"
                    fullWidth
                    value={validityPeriod}
                    onChange={(e) => setValidityPeriod(Number(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenForm(false)} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddJudgeForm;
