import { IDocument } from '../@types/Document';
import apiClient from './apiClient';
import { deleteDocument } from './box/files';

export const uploadFiles = async (files) => {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
        formData.append('files', file as Blob | string);
    });

    return apiClient
        .post(`/files/upload`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject({ ...err }));
};

export const removeDocument = async (doc_id: string) => {
    return apiClient
        .delete(`/documents`, { params: { doc_id } })
        .then((res) => res.data)
        .catch((err) => Promise.reject({ ...err }));
};

export const fullyRemoveDocument = async (boxFileId: string) => {
    return deleteDocument(boxFileId);
};

export const getDocuments = async (params) => {
    return apiClient
        .get(`/documents`, { params })
        .then((res) => res.data)
        .catch((err) => Promise.reject({ ...err }));
};

export const getDocumentInsights = async (doc_id: string) => {
    return apiClient
        .get(`/documents/insights`, {
            params: {
                doc_id,
                sort_by: '_upload_timestamp',
                sort_order: 1,
                page: 1,
                size: 50,
            },
        })
        .then((res) => res.data.items?.[0] as IDocument)
        .catch((err) => Promise.reject({ ...err }));
};

export const getDocumentDetail = getDocumentInsights;

export const getDownloadFile = async (id) => {
    return apiClient
        .get(`/files/download/${id}`, {
            responseType: 'blob',
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject({ ...err }));
};

export const searchFiles = async (params, query) => {
    const { page, size } = params;
    return apiClient
        .post(`/search?page=${page}&size=${size}`, query)
        .then((res) => res.data)
        .catch((err) => Promise.reject({ ...err }));
};
