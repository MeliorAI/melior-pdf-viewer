import getStorageDetails from '../../utils/getStorageDetails';
import backendAPIClient from '../apiClient';
import { getDocumentDetail } from '../files.api';

export const boxMultipleFileUpload = (folderId: string, files: FileList, progressHandler?) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    return backendAPIClient
        .post(`/folders/${folderId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressHandler,
        })
        .then((res) => res.data);
};

export const getDownloadLink = async (fileId: string) => {
    const document = await getDocumentDetail(fileId);

    return backendAPIClient
        .get(`/files/${getStorageDetails(document)?.file_id}/download-link`)
        .then((res) => res.data);
};

export const getShadowDownloadLink = async (fileId: string) => {
    const document = await getDocumentDetail(fileId);
    return backendAPIClient
        .get(`/files/${getStorageDetails(document)?.file_id}/shadow/download-link`)
        .then((res) => res.data);
};

export const deleteDocument = async (boxFileId: string) => {
    return backendAPIClient.delete(`/files/${boxFileId}`).then((res) => res.data);
};

export const getBoxDocuments = async (params) => {
    return backendAPIClient
        .get(`/documents`, { params, paramsSerializer: { indexes: null } })
        .then((res) => res.data);
};

export const reProcessDocument = async (boxFileId: string) => {
    return backendAPIClient
        .post(`/files/${boxFileId}/reprocess`)
        .then((res) => res.data)
        .catch((err) => Promise.reject({ ...err }));
};
