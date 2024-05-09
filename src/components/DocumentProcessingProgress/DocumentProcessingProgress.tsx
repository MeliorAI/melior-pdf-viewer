import { LinearProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { DocumentStatus } from '../../enums/DocumentStatus';
import useWebsocket from '../../hooks/useWebsocket';
import { isEmpty } from 'lodash';
import { DocumentUpdate } from '../../@types/Websocket';

interface Props {
    sha1: string | null;
    tenantId?: string;
    onDocumentReady?: (message) => void;
    onMessage?: (topic: string, message: DocumentUpdate) => void;
}

export default function DocumentProcessingProgress(props: Props) {
    const [progress, setProgress] = useState(0);
    const [progressMsg, setProgressMsg] = useState('');

    if (isEmpty(props.sha1)) throw new Error('sha1 is required');

    const clientId = `doc_${props.sha1}_listener`;
    const topic = `${props.tenantId}/document/${props.sha1}/updates`;

    const { wsClient } = useWebsocket(
        { clientId, topics: [topic] },
        {
            onMessage: (topic, message) => messageHandler(topic, message),
        }
    );

    const messageHandler = (topic: string, message: any) => {
        if (message?.progress) setProgress(message.progress);
        if (message?.message) setProgressMsg(message.message);

        if (message?.status === DocumentStatus.READY) {
            props?.onDocumentReady && props.onDocumentReady(message);
            wsClient?.end();
        }

        props?.onMessage && props.onMessage(topic, message);
    };

    return (
        <>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" fontSize={12} color="text.secondary">
                {progress}% - {progressMsg ?? '...'}
            </Typography>
        </>
    );
}
