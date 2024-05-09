import { StorageDetails } from '../../../@types/Document';
import getStorageDetails from '../../../utils/getStorageDetails';
import backendAPIClient from '../../apiClient';
import { getDocumentDetail } from '../../files.api';

export const adminGetDownloadLink = async (documentId: string) => {
    const document = await getDocumentDetail(documentId);
    const storageDetails = getStorageDetails(document);
    return backendAPIClient
        .get(`/admin/files/${storageDetails.file_id}/download-link`, {
            headers: {
                'x-box-user': storageDetails?.user_id,
                'x-secret': process.env.REACT_APP_BOX_SECRET,
            },
        })
        .then((res) => res.data);
};

export const adminGetDownloadLinkWithBoxDetails = async (storageDetails: StorageDetails) => {
    return backendAPIClient
        .get(`/admin/files/${storageDetails?.file_id}/download-link`, {
            headers: {
                'x-box-user': storageDetails?.user_id,
                'x-secret': process.env.REACT_APP_BOX_SECRET,
            },
        })
        .then((res) => res.data);
};

export const adminGetShadowDownloadLinkWithBoxDetails = async (storageDetails: StorageDetails) => {
    return backendAPIClient
        .get(`/admin/files/${storageDetails.file_id}/shadow/download-link`, {
            headers: {
                'x-box-user': storageDetails.user_id,
                'x-secret': process.env.REACT_APP_BOX_SECRET,
            },
        })
        .then((res) => res.data);
};
