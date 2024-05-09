import React, { createContext, useState } from 'react';
import { IDocument } from '../../../@types/Document';
import { InsightType } from '../../../enums/InsightType';
import {
    IEditSelectedClause,
    ISelectedEntity,
    ISelectedRegion,
} from '../../../components/GetInsights/helpers/types';
import PageLoadingPlaceholder from '../../../components/PageLoadingPlaceholder/PageLoadingPlaceholder';

export interface IChatSource {
    page: number;
}

export interface IChat {
    isFromMe: boolean;
    message: string;
    sources?: IChatSource[];
}

export type GetInsightsContextType = {
    documentData: IDocument;
    isDocumentLoaded: boolean;
    selectedInsight: string | ISelectedEntity | undefined;
    selectedInsightType: InsightType;
    editSelectedClause: IEditSelectedClause | undefined;
    selectedRegion: ISelectedRegion | undefined;
    selectedSourcePageIndex: number;
    textMatchIndex: number;
    chats: IChat[];
    currentPage: number;
    numPages: number;
    fileUrl: string;
    currentMatchIndex: number;
    matchCase: boolean;
    matchWord: boolean;
    setSelectedInsight: (insight: string | ISelectedEntity | undefined) => void;
    setSelectedInsightType: (type: InsightType) => void;
    setEditSelectedClause: (clause: IEditSelectedClause | undefined) => void;
    setSelectedRegion: (region: ISelectedRegion | undefined) => void;
    setSelectedSourcePageIndex: (pageIndex: number) => void;
    setTextMatchIndex: (index: number) => void;
    setChats: (chats: IChat[]) => void;
    setCurrentPage: (page: number) => void;
    setNumPages: (pages: number) => void;
    setIsDocumentLoaded: (val: boolean) => void;
    setCurrentMatchIndex: (index: number) => void;
    setMatchCase: (matchCase: boolean) => void;
    setMatchWord: (matchWord: boolean) => void;
};

export const GetInsightsContext = createContext<GetInsightsContextType | null>(null);

interface GetInsightsProviderProps {
    children: React.ReactNode;
    documentData?: IDocument;
    fileUrl: string;
}

const GetInsightsProvider = ({
    children,
    documentData,
    fileUrl,
}: GetInsightsProviderProps) => {
    const [selectedInsight, setSelectedInsight] = useState<string | ISelectedEntity | undefined>();
    const [selectedInsightType, setSelectedInsightType] = useState<InsightType>(InsightType.CLAUSE);
    const [editSelectedClause, setEditSelectedClause] = useState<IEditSelectedClause | undefined>();
    const [selectedRegion, setSelectedRegion] = useState<ISelectedRegion | undefined>(undefined);
    const [selectedSourcePageIndex, setSelectedSourcePageIndex] = useState<number>(0);
    const [chats, setChats] = useState<IChat[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numPages, setNumPages] = useState<number>(0);
    const [isDocumentLoaded, setIsDocumentLoaded] = useState<boolean>(false);
    const [textMatchIndex, setTextMatchIndex] = useState<number>(0);
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
    const [matchCase, setMatchCase] = useState(false);
    const [matchWord, setMatchWord] = useState(false);

    if (!documentData) {
        return <PageLoadingPlaceholder />;
    }

    return (
        <GetInsightsContext.Provider
            value={{
                documentData,
                fileUrl,
                isDocumentLoaded,
                selectedInsight,
                selectedInsightType,
                editSelectedClause,
                selectedRegion,
                selectedSourcePageIndex,
                textMatchIndex,
                chats,
                currentPage,
                numPages,
                currentMatchIndex,
                matchCase,
                matchWord,
                setSelectedInsight,
                setIsDocumentLoaded,
                setSelectedInsightType,
                setEditSelectedClause,
                setSelectedRegion,
                setSelectedSourcePageIndex,
                setTextMatchIndex,
                setChats,
                setCurrentPage,
                setNumPages,
                setCurrentMatchIndex,
                setMatchCase,
                setMatchWord,
            }}>
            {children}
        </GetInsightsContext.Provider>
    );
};

export default GetInsightsProvider;
