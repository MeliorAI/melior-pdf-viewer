import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { MeliorTranslate } from '../../../MeliorTranslate';

interface Props {
    itemToDelete: string;
    onCancel: () => void;
    onConfirm: () => void;
    open: boolean;
}

export default function DeleteModal({ itemToDelete, onCancel, onConfirm, open }: Props) {
    return (
        <Dialog open={open}>
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete {itemToDelete}?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>
                    <MeliorTranslate valueKey="Cancel" />
                </Button>
                <Button onClick={onConfirm} autoFocus color="error">
                    <MeliorTranslate valueKey="Delete" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
