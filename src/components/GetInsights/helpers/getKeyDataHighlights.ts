import { IDocument } from '../../../@types/Document';
import { ISelectedEntity } from './types';

export function getKeyDataHighlights(documentData: IDocument, selectedInsight, textMatchIndex) {
    if (!documentData) return [];
    const highlightsVar = {};
    const entities = documentData.entities;
    for (const entityType in entities) {
        highlightsVar[entityType] = [];
        entities[entityType].map((entity, index) => {
            if (!entity.detections[textMatchIndex]) return;
            const bboxes = entity.detections[textMatchIndex].bbox;
            const pageIndex = entity.detections[textMatchIndex].page;
            if (!bboxes?.length) {
                return;
            }
            const bboxesArr = bboxes[0] as number[];
            if (bboxesArr.length) {
                const left = bboxesArr[0];
                const top = bboxesArr[1];
                const width = bboxesArr[2];
                const height = bboxesArr[3];
                highlightsVar[entityType].push({
                    pageIndex,
                    height,
                    left,
                    top,
                    width,
                    isSelected:
                        (selectedInsight as ISelectedEntity)?.entityType === entityType &&
                        (selectedInsight as ISelectedEntity)?.index === index,
                });
            }
            return entity;
        });
    }

    //scroll to the key data
    const list = window.document.getElementById('key-data-list');
    if (selectedInsight && list) {
        const index = Object.keys(documentData.entities).findIndex(
            (clause) => clause === (selectedInsight as ISelectedEntity).entityType
        );
        const append =
            (selectedInsight as ISelectedEntity).index === 0
                ? (selectedInsight as ISelectedEntity).index
                : (selectedInsight as ISelectedEntity).index + 1;
        if (index !== -1) {
            list.scrollTo({
                behavior: 'smooth',
                top: index * 85 + append * 85,
            });
        }
    }
    return highlightsVar;
}
