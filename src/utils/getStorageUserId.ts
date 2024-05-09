import { isEmpty, isString } from 'lodash';
import { UserMetadata } from '../@types/User';

/**
 * This function is temporary and will be removed in the future.
 * This will be removed when `boxUserId` is no longer supported
 * in the Frontegg metadata.
 */
export default function getStorageUserId(metadata?: UserMetadata | string) {
    if (isEmpty(metadata)) return '';

    const objectMetadata = isString(metadata) ? JSON.parse(metadata) : metadata;

    const result = objectMetadata?.storageUserId ?? objectMetadata?.boxUserId;

    if (isEmpty(result)) return '';

    return result;
}
