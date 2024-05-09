import { isEmpty } from 'lodash';
import { IDocument, StorageDetails } from '../@types/Document';

/**
 * This function is temporary and will be removed in the future.
 * This will be removed when `box_details` is no longer supported
 * in the BE.
 */
export default function getStorageDetails(document: IDocument): StorageDetails {
    const result = document?.storage_details ?? document?.box_details;

    if (!result || isEmpty(result)) throw new Error('Storage details are missing');

    return result;
}
