import { CircularProgress } from '@mui/material';

export default function PageLoadingPlaceholder() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <CircularProgress
                style={{
                    color: '#3f51b5',
                    width: '100px',
                    height: '100px',
                    margin: 'auto',
                }}
            />
        </div>
    );
}
