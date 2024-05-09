import { useQuery } from '@tanstack/react-query';
import { IDocument } from '../@types/Document';
import { getBoxDocuments } from '../api/box/files';

export function useDocuments(params, queryKey) {
    const { data, ...rest } = useQuery({
        queryFn: () => getBoxDocuments(params),
        queryKey: [queryKey],
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });

    return {
        documents: data?.items || data?.matching_docs || ([] as IDocument[]),
        ...rest,
    };
}
