export interface ISelectedRegion {
    bboxes: {
        height: number;
        left: number;
        pageIndex: number;
        top: number;
        width: number;
    }[];
    text: string;
    page: number;
}

export interface ISelectedEntity {
    index: number;
    entityType: string;
}

export interface IHighlight {
    pageIndex: number;
    height: number;
    left: number;
    top: number;
    width: number;
    text: string;
    isSelected: boolean;
    isEdited?: boolean;
}

export interface IEditSelectedClause {
    clause: string;
    answer: string;
}
