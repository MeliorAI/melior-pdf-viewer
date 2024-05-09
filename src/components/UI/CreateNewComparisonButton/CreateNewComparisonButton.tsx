import { useMutation } from '@tanstack/react-query';
import { boxMultipleFileUpload } from '../../../api/box/files';
import { Button, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import Container from '../Common/Container';
import { Text } from '../Typography';
import { Theme } from '../../../theme';
import { useRef } from 'react';

interface Props {
    folderId?: string;
    onUploadSuccess?: () => void;
    onUploadError?: (error: any) => void;
    variant?: 'text' | 'outlined' | 'contained' | undefined;
    removeStartIcon?: boolean;
    color?: string;
    label?: string;
    beforeUpload?: () => void;
    hasClicked?: () => void;
}

export default function CreateNewComparisonButton({
    folderId,
    onUploadSuccess,
    onUploadError,
    variant,
    removeStartIcon,
    color,
    label,
    beforeUpload,
    hasClicked,
}: Props) {
    const boxFolderId = folderId || '0';
    const { isLoading } = useMutation(['boxUploadDocument'], (files: FileList) =>
        boxMultipleFileUpload(boxFolderId, files)
    );
    const hiddenFileInput = useRef<any>(null);
    const defaultLabel = 'Create Comparison';

    const handleClick = () => {
        return hasClicked;
    };

    const renderStartIcon = () => {
        if (isLoading) {
            return <CircularProgress size={20} color="inherit" />;
        }

        if (removeStartIcon) return null;

        return <Add />;
    };

    return (
        <>
            {variant !== 'text' && (
                <Button
                    component="label"
                    variant={variant || 'contained'}
                    color="primary"
                    startIcon={renderStartIcon()}
                    disabled={isLoading}
                    onClick={handleClick}
                >
                    <Container leftOuterSpacing={!isLoading ? 0.5 : 0}>
                        <Text
                            uppercase
                            color={color ?? Theme.whiteColor}
                            customletterSpacing={0.05}
                        >
                            {defaultLabel}
                        </Text>
                    </Container>
                </Button>
            )}
        </>
    );
}
