import { IDocument } from '../../../@types/Document';
import { IHighlight } from './types';

export function getClauseHighlights(
    documentData: IDocument,
    selectedInsight,
    selectedRegion,
    textMatchIndex
) {
    if (!documentData) return [];

    const highlights: IHighlight[] = [];

    const clauses = documentData.clauses;
    for (const clause in clauses) {
        if (!(clauses && clauses[clause] && clauses[clause][textMatchIndex])) {
            continue;
        }

        const pageIndex: number = clauses[clause][textMatchIndex].page;
        const pageBboxes: number[][] = clauses[clause][textMatchIndex].bboxes ?? [];

        if (!(pageBboxes && pageBboxes.length)) {
            continue;
        }
        pageBboxes.map((bboxArr) => {
            if (bboxArr.length) {
                const left = bboxArr[0];
                const top = bboxArr[1];
                const width = bboxArr[2];
                const height = bboxArr[3];
                highlights.push({
                    pageIndex,
                    height,
                    left,
                    top,
                    width,
                    text: clause,
                    isSelected: selectedInsight === clause,
                });
            }
        });
    }

    if (selectedRegion) {
        selectedRegion.bboxes.map((bbox) => {
            highlights.push({
                pageIndex: bbox.pageIndex,
                height: bbox.height,
                left: bbox.left,
                top: bbox.top,
                width: bbox.width,
                text: selectedRegion.text,
                isSelected: true,
                isEdited: true,
            });
        });
    }

    //scroll to the clause
    const list = window.document.getElementById('clauses-list');
    if (list) {
        const index = Object.keys(documentData.clauses).findIndex(
            (clause) => clause === selectedInsight
        );
        if (index !== -1) {
            list.scrollTo({
                behavior: 'smooth',
                top: index * 85,
            });
        }
    }

    return highlights;
}
