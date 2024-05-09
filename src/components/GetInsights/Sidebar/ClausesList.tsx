import Flex from 'styled-flex-component';
import { Text } from '../../UI/Typography';
import Container from '../../UI/Common/Container';
import { isEmpty } from 'lodash';
import { Theme } from '../../../theme';
import { SelectAllOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import {
    GetInsightsContext,
    GetInsightsContextType,
} from '../../../pages/GetInsights/context/getInsightsContext';
import ClausesListItem from './ClausesListItem';
import TextMatchesNavigation from './TextMatchesNavigation';
import { MeliorTranslate } from '../../MeliorTranslate';
import documentData from '../../../pages/GetInsights/documentData';

const ClausesList = () => {
    const {
        selectedInsight,
        editSelectedClause,
        selectedRegion,
        textMatchIndex,
        setSelectedRegion,
        setEditSelectedClause,
        setSelectedInsight,
        setTextMatchIndex,
    } = useContext(GetInsightsContext) as GetInsightsContextType;
    const clauses = documentData.clauses ? Object.keys(documentData.clauses) : [];
    const [hoveredInsight, setHoveredInsight] = useState<string>();
    const [isConfirming, setIsConfirming] = useState<boolean>(false);
    const isEditing = (key) => Boolean(editSelectedClause && editSelectedClause.clause !== key);
    const [displayedClauses, setDisplayedClauses] = useState<Array<any>>([]);
    const [isResetting, setIsResetting] = useState<boolean>(false);

    useEffect(() => {
        const clausesWithId = attachClauseId(clauses, 0);
        // Set all clauses as displayed clauses
        setDisplayedClauses(clausesWithId);
    }, []);
    const getBboxesValue = (): number[][] => {
        const arr: number[][] = [];
        if (!selectedRegion?.bboxes.length) {
            return [];
        }

        selectedRegion.bboxes.map((bbox) => {
            arr.push([bbox.left, bbox.top, bbox.width, bbox.height]);
        });

        return arr as number[][];
    };
    const attachClauseId = (clauses, startIndex) => {
        const clausesWithId: Array<any> = [];
        clauses.forEach((item, i) => {
            clausesWithId.push({
                id: (startIndex + i + 1).toString(),
                key: item,
            });
            return;
        });
        return clausesWithId;
    };

    async function confirm() {
        // if (!selectedRegion || !editSelectedClause) return;

        setIsConfirming(true);
        console.log(getBboxesValue());
        
        // const feedback: IFeedback[] = [
        //     {
        //         correct: false,
        //         gt: selectedRegion.text,
        //         idx: textMatchIndex,
        //         field: `clauses.${editSelectedClause.clause}`,
        //         key: 'answer',
        //     },
        //     {
        //         correct: false,
        //         gt: getBboxesValue(),
        //         idx: textMatchIndex,
        //         field: `clauses.${editSelectedClause.clause}`,
        //         key: 'bboxes',
        //     },
        //     {
        //         correct: false,
        //         gt: selectedRegion.page,
        //         idx: textMatchIndex,
        //         field: `clauses.${editSelectedClause.clause}`,
        //         key: 'page',
        //     },
        // ];

        // try {
        //     await provideFeedback(documentData.id, feedback);
        //     setEditSelectedClause(undefined);
        //     setIsConfirming(false);
        //     setSelectedRegion(undefined);
        //     getDocument();
        // } catch (e) {
        //     console.error(e);
        //     setIsConfirming(false);
        // }
    }

    async function reset() {
        setIsResetting(true);

        // const feedback: IFeedback[] = [
        //     {
        //         correct: false,
        //         gt: documentData.clauses[editSelectedClause!.clause][textMatchIndex]._predicted
        //             ?.answer as string,
        //         idx: textMatchIndex,
        //         field: `clauses.${editSelectedClause?.clause}`,
        //         key: 'answer',
        //     },
        //     {
        //         correct: false,
        //         gt: documentData.clauses[editSelectedClause!.clause][textMatchIndex]._predicted
        //             ?.bboxes as number[][],
        //         idx: textMatchIndex,
        //         field: `clauses.${editSelectedClause!.clause}`,
        //         key: 'bboxes',
        //     },
        // ];
        // try {
        //     await provideFeedback(documentData.id, feedback);
        //     setEditSelectedClause(undefined);
        //     setSelectedRegion(undefined);
        //     setIsResetting(false);
        //     getDocument();
        // } catch (e) {
        //     console.error(e);
        //     setIsResetting(false);
        // }
    }

    const isClauseParsed = (key: string) => {
        return (
            (key.includes('Date') && !isEmpty(documentData.clauses[key][0]?.value)) ||
            !key.includes('Date')
        );
    };

    const editSelection = (e, clause) => {
        e.stopPropagation();
        setEditSelectedClause({
            clause: clause.key,
            answer: documentData.clauses[clause.key][textMatchIndex].answer,
        });
        setSelectedRegion(undefined);
    };

    return (
        <div
            style={{
                overflowY: 'scroll',
                height: '100%',
                marginTop: '15px',
            }}>
            {displayedClauses.map((clause, index) => (
                <Container key={clause.id}>
                    {selectedInsight !== clause.key && (
                        <div>
                            <ClausesListItem
                                index={index}
                                clause={clause}
                                hoveredInsight={hoveredInsight as string}
                                setHoveredInsight={setHoveredInsight}
                                isEditing={isEditing}
                                setSelectedInsight={setSelectedInsight}
                                setTextMatchIndex={setTextMatchIndex}
                                isHideable={true}
                                isParsed={isClauseParsed(clause.key)}
                                editSelection={editSelection}
                            />
                        </div>
                    )}
                    {selectedInsight === clause.key && (
                        <Container
                            borderLeft={`4px solid ${Theme.primary}`}
                            borderBottom="1px solid rgba(13, 24, 50, 0.12)"
                            leftInnerSpacing={2}
                            topInnerSpacing={2}
                            bottomInnerSpacing={1.5}
                            rightInnerSpacing={1.625}
                            onClick={() => {
                                setTextMatchIndex(0);
                                setSelectedInsight('');
                            }}
                            backgroundColor="white">
                            <Flex alignCenter justifyBetween>
                                <Text customFontWeight={600} color={Theme.primaryDark}>
                                    {clause.key}
                                </Text>
                            </Flex>

                            <Container
                                topOuterSpacing={1.375}
                                backgroundColor={Theme.background}
                                leftInnerSpacing={0.75}
                                topInnerSpacing={1}
                                bottomInnerSpacing={1}
                                rightInnerSpacing={0.75}
                                minHeight={6.09375}
                                wordBreak>
                                {isEmpty(documentData.clauses[clause.key]) && (
                                    <i style={{ opacity: 0.4 }}>empty</i>
                                )}
                                {!isEmpty(documentData.clauses[clause.key]) && (
                                    <Flex column justifyBetween style={{ minHeight: '6.09375rem' }}>
                                        {documentData.clauses[clause.key].length && (
                                            <Text customFontSize={0.8125} customFontWeight={400}>
                                                {selectedRegion
                                                    ? selectedRegion.text
                                                    : documentData.clauses[clause.key][
                                                          documentData.clauses[clause.key].length >
                                                          1
                                                              ? textMatchIndex
                                                              : 0
                                                      ].answer}
                                            </Text>
                                        )}

                                        {documentData.clauses[clause.key].length > 1 && (
                                            <TextMatchesNavigation
                                                items={documentData.clauses[clause.key]}
                                            />
                                        )}
                                    </Flex>
                                )}
                            </Container>

                            {!Boolean(editSelectedClause) && (
                                <Container topOuterSpacing={1} textAlign="right">
                                    <Flex full justifyEnd>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={(e) => editSelection(e, clause)}>
                                            <Flex alignCenter>
                                                <SelectAllOutlined />
                                                <Container leftOuterSpacing={0.6875}>
                                                    <MeliorTranslate valueKey="Edit Selection" />
                                                </Container>
                                            </Flex>
                                        </Button>
                                    </Flex>
                                </Container>
                            )}
                            {Boolean(editSelectedClause) && (
                                <Container topOuterSpacing={1} textAlign="right">
                                    <Flex full justifyEnd>
                                        <Button
                                            color="primary"
                                            sx={{ marginRight: 1 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                reset();
                                            }}
                                            disabled={isResetting}>
                                            <MeliorTranslate valueKey="Reset" />
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            disabled={isConfirming || !selectedRegion}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                confirm();
                                            }}>
                                            <MeliorTranslate valueKey="Confirm" />
                                        </Button>
                                    </Flex>
                                </Container>
                            )}
                        </Container>
                    )}
                </Container>
            ))}
        </div>
    );
};

export default ClausesList;
