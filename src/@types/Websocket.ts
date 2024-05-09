export interface DocumentUpdate {
    status: 'queued' | 'processing' | 'ready' | 'error';
    progress: number;
    message: string;
    type?: string;
}
