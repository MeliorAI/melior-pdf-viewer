import { useMutation } from '@tanstack/react-query';
import { boxMultipleFileUpload } from '../../../api/box/files';
import { Button, CircularProgress, Typography } from '@mui/material';
import { UploadFileOutlined } from '@mui/icons-material';
import Container from '../Common/Container';
import { Text } from '../Typography';
import { Theme } from '../../../theme';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    folderId?: string;
    onUploadSuccess?: (result) => void;
    onUploadError?: (error: any) => void;
    variant?: 'text' | 'outlined' | 'contained' | undefined;
    removeStartIcon?: boolean;
    color?: string;
    label?: string;
    beforeUpload?: () => void;
}

export default function BoxUploadDocumentButton({
    folderId,
    onUploadSuccess,
    onUploadError,
    variant,
    removeStartIcon,
    color,
    label,
    beforeUpload,
}: Props) {
    const { t } = useTranslation();
    const boxFolderId = folderId || '0';
    const [resetHeuristicKey, setResetHeuristicKey] = useState(false);
    const { mutateAsync, isLoading } = useMutation(['boxUploadDocument'], (files: FileList) =>
        boxMultipleFileUpload(boxFolderId, files, progressHandler)
    );
    const hiddenFileInput = useRef<any>(null);
    const defaultLabel = t('Upload Document');
    const [progress, setProgress] = useState(0);
    const [buttonLabel, setButtonLabel] = useState(label ?? defaultLabel);

    const progressHandler = (progressEvent) => {
        if (!progressEvent?.total) throw new Error('No total progress. Check file size.');
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);

        setProgress(() => progress);

        if (progress > 0) setButtonLabel(t('Uploading...'));
        if (progress === 100) setButtonLabel(t('Finalizing...'));
    };

    useEffect(() => {
        setButtonLabel(t('Upload Document'));
    }, [t]);

    const handleFileChange = async (e: any) => {
        try {
            beforeUpload && (await beforeUpload());
        } catch (error) {
            console.error(error);
        }

        mutateAsync(e.target.files, {
            onSuccess: (result) => {
                onUploadSuccess && onUploadSuccess(result);
            },
            onError: (error) => {
                onUploadError && onUploadError(error);
            },
            onSettled: () => {
                setResetHeuristicKey((prev) => !prev);
                resetButton();
            },
        });
    };

    const handleClick = () => {
        if (hiddenFileInput) hiddenFileInput?.current?.click();
    };

    const renderStartIcon = () => {
        if (progress > 0) {
            return (
                <>
                    <CircularProgress
                        variant="determinate"
                        size={20}
                        color="inherit"
                        value={progress}
                    />
                    <Typography variant="caption" style={{ marginLeft: 5 }}>
                        {progress}%
                    </Typography>
                </>
            );
        }

        if (removeStartIcon) return null;

        return <UploadFileOutlined />;
    };

    const resetButton = () => {
        setProgress(0);
        setButtonLabel(label ?? defaultLabel);
    };

    return (
        <>
            {variant === 'text' && (
                <Typography color={Theme.error} onClick={handleClick}>
                    {label || defaultLabel}

                    <input
                        key={resetHeuristicKey ? 'reset' : 'not-reset'}
                        type="file"
                        style={{ display: 'none' }}
                        onInputCapture={handleFileChange}
                        multiple
                    />
                </Typography>
            )}

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
                            {buttonLabel}
                        </Text>
                    </Container>
                </Button>
            )}

            <input
                ref={hiddenFileInput}
                key={resetHeuristicKey ? 'reset' : 'not-reset'}
                type="file"
                style={{ display: 'none' }}
                onInputCapture={handleFileChange}
                multiple
            />
        </>
    );
}
