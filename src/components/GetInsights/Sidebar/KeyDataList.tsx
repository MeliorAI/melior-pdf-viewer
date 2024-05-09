import { StyledAccordion, StyledAccordionSummary } from './Sidebar.styled';
import { Text } from '../../UI/Typography';
import Container from '../../UI/Common/Container';
import Empty from '../../UI/Common/Empty';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tidyKeyData } from '../../../utils/tidyKeyData';
import { Theme } from '../../../theme';
import { useContext, useEffect, useState } from 'react';
import {
    GetInsightsContext,
    GetInsightsContextType,
} from '../../../pages/GetInsights/context/getInsightsContext';
import { ISelectedEntity } from '../helpers/types';
import Flex from 'styled-flex-component';
import TextMatchesNavigation from './TextMatchesNavigation';
import { useTranslation } from 'react-i18next';

const KeyDataList = () => {
    const { documentData, selectedInsight, setSelectedInsight, setTextMatchIndex } = useContext(
        GetInsightsContext
    ) as GetInsightsContextType;

    const entityTypes = documentData.entities ? Object.keys(documentData.entities) : [];
    const [expandedIndex, setExpandedIndex] = useState<number>(-1);
    const { t } = useTranslation();

    const isSelectedEntity = (entityType, index) =>
        (selectedInsight as ISelectedEntity) &&
        (selectedInsight as ISelectedEntity).entityType === entityType &&
        (selectedInsight as ISelectedEntity).index === index;

    const isExpanded = (entityType) =>
        (selectedInsight as ISelectedEntity) &&
        (selectedInsight as ISelectedEntity).entityType === entityType;

    function selectEntity(isExpanded: boolean, entityType: string) {
        if (!isExpanded) {
            setSelectedInsight(undefined);
            return;
        }

        setTextMatchIndex(0);
        setSelectedInsight({
            entityType: entityType,
            index: 0,
        });
    }

    useEffect(() => {
        if (!entityTypes.length) return;
        if (!selectedInsight) {
            setExpandedIndex(-1);
            return;
        }
        const index = entityTypes.findIndex(
            (entityType) => (selectedInsight as ISelectedEntity).entityType === entityType
        );
        setExpandedIndex(index);
    }, [selectedInsight, entityTypes]);

    return (
        <Container id="key-data-list" overflow="scroll" height="calc(100vh - 117px)">
            {!entityTypes.length && (
                <Container outerSpacing={2}>
                    <Empty message={t('There are no entities for this document')} />
                </Container>
            )}
            {entityTypes.length &&
                entityTypes.map((entityType, index) => (
                    <StyledAccordion
                        key={entityType}
                        expanded={expandedIndex === index}
                        onChange={(e, expanded) => selectEntity(expanded, entityType)}
                    >
                        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Text
                                color={Theme.primaryDark}
                                customFontWeight={isExpanded(entityType) ? 600 : 500}
                            >
                                {tidyKeyData(entityType)} (
                                {documentData.entities[entityType].length})
                            </Text>
                        </StyledAccordionSummary>
                        <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
                            {documentData.entities[entityType].map((entity, index) => (
                                <Container
                                    data-testid="entity-row"
                                    onClick={() => {
                                        setSelectedInsight({
                                            entityType,
                                            index,
                                        });
                                        setTextMatchIndex(0);
                                    }}
                                    key={index}
                                    borderLeft={
                                        isSelectedEntity(entityType, index)
                                            ? `4px solid ${Theme.primary}`
                                            : ''
                                    }
                                    cursor="pointer"
                                    borderBottom={
                                        documentData.entities[entityType].length - 1 === index
                                            ? '0'
                                            : '1px solid rgba(13, 24, 50, 0.12)'
                                    }
                                    leftInnerSpacing={2}
                                    rightInnerSpacing={2}
                                    topInnerSpacing={2}
                                    bottomInnerSpacing={2}
                                >
                                    {isSelectedEntity(entityType, index) && (
                                        <Container
                                            backgroundColor={Theme.background}
                                            leftInnerSpacing={0.75}
                                            topInnerSpacing={1}
                                            bottomInnerSpacing={1}
                                            rightInnerSpacing={0.75}
                                        >
                                            <Flex
                                                column
                                                justifyBetween
                                                style={
                                                    entity.detections.length > 1 && {
                                                        minHeight: '4rem',
                                                    }
                                                }
                                            >
                                                <Text
                                                    customFontSize={0.8125}
                                                    color={Theme.primaryDark}
                                                >
                                                    {entity.text}
                                                </Text>

                                                {entity.detections.length > 1 && (
                                                    <TextMatchesNavigation
                                                        items={entity.detections}
                                                    />
                                                )}
                                            </Flex>
                                        </Container>
                                    )}

                                    {!isSelectedEntity(entityType, index) && (
                                        <Text customFontSize={0.8125} color={Theme.primaryDark}>
                                            {entity.text}
                                        </Text>
                                    )}
                                </Container>
                            ))}
                        </AccordionDetails>
                    </StyledAccordion>
                ))}
        </Container>
    );
};

export default KeyDataList;
