import { useQuery } from '@tanstack/react-query';
import { getDocumentDetail } from '../api/files.api';

export function useDocument(id) {
    const { data, ...rest } = useQuery({
        queryFn: () => getDocumentDetail(id).then((res) => res),
        refetchOnWindowFocus: false,
    });

    return {
        document: data,
        ...rest,
    };
}
