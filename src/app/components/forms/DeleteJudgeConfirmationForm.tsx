import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface DeleteConfirmationFormProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    judgeName: string;
}

const DeleteConfirmationForm: React.FC<DeleteConfirmationFormProps> = ({ open, onClose, onDelete, judgeName }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Подтвердите удаление судьи: {judgeName}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={onDelete} color="error">
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationForm;
