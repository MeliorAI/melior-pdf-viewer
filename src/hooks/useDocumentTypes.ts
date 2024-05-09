import { useQuery } from '@tanstack/react-query';
import { fetchKnownDocTypes } from '../api/config.api';

export function useDocumentTypes() {
    const { data, ...rest } = useQuery({
        queryFn: () => fetchKnownDocTypes().then((res) => res),
        queryKey: ['documentTypes'],
        refetchOnWindowFocus: false,
    });

    return {
        docTypes: data,
        ...rest,
    };
}
