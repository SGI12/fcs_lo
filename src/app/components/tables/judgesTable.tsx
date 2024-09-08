import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJudges, deleteJudge } from '@/store/slices/judgesSlice';
import { AppDispatch, RootState } from '@/store';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    IconButton,
    Snackbar, Alert
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Judge } from '@/types/judges';
import DeleteJudgeConfirmationForm from "@/app/components/forms/DeleteJudgeConfirmationForm";


const JudgesTable = () => {
    const dispatch: AppDispatch = useDispatch();
    const judges = useSelector((state: RootState) => state.judges);
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Judge>('fullName');
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<boolean>(false);
    const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    useEffect(() => {
        dispatch(fetchAllJudges());
    }, [dispatch]);

    const handleRequestSort = (property: keyof Judge) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDeleteClick = (judge: Judge) => {
        setSelectedJudge(judge);
        setOpenDeleteConfirmation(true);
    };

    const handleDeleteConfirm =  () => {
        if (selectedJudge) {
            dispatch(deleteJudge(selectedJudge.id))
                .then((res) => {
                    console.log(res)
                    setOpenDeleteConfirmation(false);
                    setOpenSnackBar(true)
                })

        }
    };

    const handleDeleteCancel = () => {
        setOpenDeleteConfirmation(false);
        setSelectedJudge(null);
    };

    const sortedJudges = React.useMemo(() => {
        return [...judges].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[orderBy] > b[orderBy]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [judges, order, orderBy]);

    return (
        <>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="head-cell" sortDirection={orderBy === 'fullName' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'fullName'}
                                    direction={orderBy === 'fullName' ? order : 'asc'}
                                    onClick={() => handleRequestSort('fullName')}
                                >
                                    Фамилия Имя Отчество
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="head-cell" sortDirection={orderBy === 'birthDate' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'birthDate'}
                                    direction={orderBy === 'birthDate' ? order : 'asc'}
                                    onClick={() => handleRequestSort('birthDate')}
                                >
                                    Дата рождения
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="head-cell" sortDirection={orderBy === 'region' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'region'}
                                    direction={orderBy === 'region' ? order : 'asc'}
                                    onClick={() => handleRequestSort('region')}
                                >
                                    Регион
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="head-cell" sortDirection={orderBy === 'category' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'category'}
                                    direction={orderBy === 'category' ? order : 'asc'}
                                    onClick={() => handleRequestSort('category')}
                                >
                                    Категория
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="head-cell" sortDirection={orderBy === 'validityPeriod' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'validityPeriod'}
                                    direction={orderBy === 'validityPeriod' ? order : 'asc'}
                                    onClick={() => handleRequestSort('validityPeriod')}
                                >
                                    Срок действия
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="head-cell" sortDirection={orderBy === 'assignmentDate' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'assignmentDate'}
                                    direction={orderBy === 'assignmentDate' ? order : 'asc'}
                                    onClick={() => handleRequestSort('assignmentDate')}
                                >
                                    Дата присвоения
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="head-cell" sortDirection={orderBy === 'expirationDate' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'expirationDate'}
                                    direction={orderBy === 'expirationDate' ? order : 'asc'}
                                    onClick={() => handleRequestSort('expirationDate')}
                                >
                                    Дата окончания
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="head-cell"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="table-body">
                        {sortedJudges.map((judge) => (
                            <TableRow
                                key={judge.id}
                                sx={{
                                    backgroundColor: judge.id % 2 === 0 ? 'white' : '#F7F8FC',
                                    '& td': {
                                        borderBottom: 'none'
                                    }
                                }}
                            >
                                <TableCell>{judge.fullName}</TableCell>
                                <TableCell>{new Date(judge.birthDate).toLocaleDateString()}</TableCell>
                                <TableCell>{judge.region}</TableCell>
                                <TableCell>{judge.category}</TableCell>
                                <TableCell>{judge.validityPeriod} год</TableCell>
                                <TableCell>{new Date(judge.assignmentDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(judge.expirationDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteClick(judge)}>
                                        <DeleteIcon color="error"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedJudge && (
                <DeleteJudgeConfirmationForm
                    open={openDeleteConfirmation}
                    onClose={handleDeleteCancel}
                    onDelete={handleDeleteConfirm}
                    judgeName={selectedJudge.fullName}
                />
            )}
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={openSnackBar}
                onClose={() => {setOpenSnackBar(false)}}
                autoHideDuration={3000}
                message="Судья успешно удален">
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}>
                Судья успешно удален
                </Alert>

            </Snackbar>
        </>
    );
};

export default JudgesTable;
