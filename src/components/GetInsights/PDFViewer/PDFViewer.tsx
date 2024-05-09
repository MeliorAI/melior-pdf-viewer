import { Plugin, SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { RenderHighlightTargetProps, Trigger, highlightPlugin } from '@react-pdf-viewer/highlight';
import { RenderSearchProps, searchPlugin } from '@react-pdf-viewer/search';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import Container from '../../UI/Common/Container';
import { InsightType } from '../../../enums/InsightType';
import { Button } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { Theme } from '../../../theme';
import {
    GetInsightsContext,
    GetInsightsContextType,
} from '../../../pages/GetInsights/context/getInsightsContext';
import { getClauseHighlights } from '../helpers/getClauseHighlights';
import { getKeyDataHighlights } from '../helpers/getKeyDataHighlights';
import { IHighlight, ISelectedEntity } from '../helpers/types';
import Flex from 'styled-flex-component';
import { IconButton, Input } from '@mui/material';
import { Close, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { VscCaseSensitive, VscWholeWord } from 'react-icons/vsc';
import { MeliorTranslate } from '../../MeliorTranslate';

const JUMP_PADDING = 10;

const PDFViewer = () => {
    const {
        documentData,
        selectedSourcePageIndex,
        selectedInsight,
        selectedRegion,
        editSelectedClause,
        selectedInsightType,
        textMatchIndex,
        matchCase,
        matchWord,
        setSelectedRegion,
        setCurrentPage,
        setNumPages,
        setIsDocumentLoaded,
        setMatchCase,
        setMatchWord,
        setSelectedInsight,
    } = useContext(GetInsightsContext) as GetInsightsContextType;

    function chooseHighlights() {
        if (selectedInsightType === InsightType.CLAUSE)
            return getClauseHighlights(
                documentData,
                selectedInsight,
                selectedRegion,
                textMatchIndex
            );
        if (selectedInsightType === InsightType.KEYDATA)
            return getKeyDataHighlights(documentData, selectedInsight, textMatchIndex);
        return []; //no highlights when selecting chat
    }

    const highlights = chooseHighlights() as IHighlight[];

    const highlightsMemo = useMemo(() => {
        if (selectedInsightType === InsightType.KEYDATA) {
            const keyDataArr: any[] = [];
            Object.keys(highlights).map((key) => {
                highlights[key].map((entity: any) => {
                    keyDataArr.push(entity);
                });
            });
            return keyDataArr;
        }

        return highlights;
    }, [selectedInsightType, highlights]);

    const renderHighlightFunc = (arr, props) => {
        return arr
            .filter((area: any) => area.pageIndex === props.pageIndex && area.isSelected)
            .map((area, idx) => (
                <Container
                    key={idx}
                    style={Object.assign(
                        {},
                        {
                            background: area.isEdited ? Theme.editedHighlight : Theme.highlight,
                        },
                        props.getCssProperties(area, props.rotation)
                    )}></Container>
            ));
    };

    const renderHighlightTarget = (props: RenderHighlightTargetProps) => {
        if (!editSelectedClause) return <></>;

        function select() {
            if (editSelectedClause) {
                setSelectedRegion({
                    bboxes: props.highlightAreas,
                    text: props.selectedText,
                    page: props.selectionRegion.pageIndex,
                });
                props.cancel();
            }
        }

        return (
            <Container
                style={{
                    background: '#fff',
                    border: '1px solid rgba(0, 0, 0, .3)',
                    borderRadius: '2px',
                    padding: '8px',
                    position: 'absolute',
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    zIndex: 100,
                }}>
                <Flex>
                    <Container rightOuterSpacing={0.5}>
                        <Button onClick={select}>
                            <MeliorTranslate valueKey="Select" />
                        </Button>
                    </Container>
                    <Button onClick={props.cancel}>
                        <MeliorTranslate valueKey="Cancel" />
                    </Button>
                </Flex>
            </Container>
        );
    };
    const renderHighlights = (props: any) => <>{renderHighlightFunc(highlightsMemo, props)}</>;

    const highlightPluginInstance = highlightPlugin({
        trigger: Trigger.TextSelection,
        renderHighlights,
        renderHighlightTarget,
    });

    const zoomPluginInstance = zoomPlugin({
        enableShortcuts: true,
    });
    const [isSearching, setIsSearching] = useState(false);
    const [hasClearedKeyword, setHasClearedKeyword] = useState(false);

    const searchPluginInstance = searchPlugin({
        enableShortcuts: true,
        keyword: localStorage.keyword,
        renderHighlights: (renderProps: any) => {
            return (
                <>
                    {renderProps.highlightAreas.map((area, index) => (
                        <div
                            key={`${area.pageIndex}-${index}`}
                            style={{
                                ...renderProps.getCssProperties(area),
                                position: 'absolute',
                                backgroundColor: Theme.highlight,
                                display:
                                    isSearching &&
                                    !selectedInsight &&
                                    Boolean(JSON.stringify(localStorage.keyword).length > 2) &&
                                    !hasClearedKeyword
                                        ? 'block'
                                        : 'none',
                            }}></div>
                    ))}
                </>
            );
        },
    });

    const { Zoom } = zoomPluginInstance;
    const { jumpToHighlightArea } = highlightPluginInstance;
    const { Search } = searchPluginInstance;

    window.addEventListener('keydown', function (event) {
        if (
            (event.ctrlKey || event.metaKey) &&
            String.fromCharCode(event.which).toLowerCase() == 'f'
        ) {
            setIsSearching(true);
            window.document.getElementById('searchKey')?.focus();
            event.preventDefault();
        }
        if (event.key === 'Escape') {
            setIsSearching(false);
            event.preventDefault();
        }
    });

    useEffect(() => {
        if (!selectedInsight) return;

        if (selectedInsightType === InsightType.CLAUSE) {
            if (!documentData.clauses[selectedInsight as string][textMatchIndex].bboxes) {
                return;
                //means no bboxes was returned from BE probably not processed yet
            }

            const index = highlights.findIndex((highlight) => highlight.text === selectedInsight);

            jumpToHighlightArea({
                ...highlights[index],
                top: highlights[index].top - JUMP_PADDING,
            });
            return;
        }

        if (selectedInsightType === InsightType.KEYDATA) {
            if (
                !documentData.entities[(selectedInsight as ISelectedEntity).entityType][
                    (selectedInsight as ISelectedEntity).index
                ].detections[textMatchIndex].bbox
            ) {
                return;
            }

            const selectedIndex = highlights[
                (selectedInsight as ISelectedEntity).entityType
            ].findIndex((highlight) => highlight.isSelected);
            jumpToHighlightArea({
                ...highlights[(selectedInsight as ISelectedEntity).entityType][selectedIndex],
                top:
                    highlights[(selectedInsight as ISelectedEntity).entityType][selectedIndex].top -
                    JUMP_PADDING,
            });
            return;
        }
    }, [selectedInsight, textMatchIndex]);

    useEffect(() => {
        if (selectedInsightType === InsightType.CHAT) {
            jumpToHighlightArea({
                pageIndex: selectedSourcePageIndex,
                top: 0,
                left: 0,
                height: 0,
                width: 0,
            });
        }
    }, [selectedSourcePageIndex]);

    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('currentMatchIndex', '0');
        });
        return () => {
            window.removeEventListener('beforeunload', () => {
                console.log('search match index has been reset to 0');
            });
        };
    });

    return (
        <Container height="calc(100vh - 119px)" width="100%" overflow="hidden">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.js">
                <Container
                    style={{
                        display: 'flex',
                        padding: '0.25rem 0',
                        justifyContent: 'center',
                    }}>
                    <Zoom levels={[0.4, 0.8, 1.2, 1.6, 2.4, 3.2]} />
                </Container>

                {isSearching && (
                    <Search>
                        {(renderSearchProps: RenderSearchProps) => {
                            const [matchIndex, setMatchIndex] = useState(1);
                            const [matches, setMatches] = useState<any[]>([]);

                            useEffect(() => {
                                renderSearchProps.setKeyword(localStorage.keyword ?? '');
                                if (!selectedInsight) {
                                    renderSearchProps.changeMatchCase(matchCase ?? false);
                                    renderSearchProps.changeWholeWords(matchWord ?? false);
                                    renderSearchProps.search().then((matches) => {
                                        setMatches(matches);

                                        const storageMatchIndex = JSON.parse(
                                            localStorage.currentMatchIndex
                                        );
                                        const currentMatchIndex =
                                            storageMatchIndex == 0 //on new search,
                                                ? 1 //reset to 1
                                                : storageMatchIndex ?? //else existing index
                                                  1; //if null, set to 1

                                        setMatchIndex(currentMatchIndex);
                                    });
                                }
                            }, [
                                renderSearchProps.keyword,
                                renderSearchProps.matchCase,
                                renderSearchProps.wholeWords,
                            ]);

                            useEffect(() => {
                                if (matches.length && !selectedInsight) {
                                    jumpToHighlightArea({
                                        left: 0,
                                        width: 0,
                                        height: 0,
                                        pageIndex: matches[matchIndex - 1].pageIndex,
                                        top: matches[matchIndex - 1].startIndex / 50,
                                    });
                                }
                            }, [matchIndex]);

                            return (
                                <Flex
                                    justifyEnd
                                    style={{
                                        zIndex: 5,
                                        position: 'absolute',
                                        top: 8,
                                        right: 280,
                                        height: '63px',
                                    }}>
                                    <Flex
                                        style={{
                                            background: 'white',
                                            margin: '10px',
                                            width: 'fit-content',
                                            borderRadius: '30px',
                                            paddingLeft: '20px',
                                            paddingRight: '10px',
                                        }}
                                        alignCenter
                                        justifyCenter>
                                        <Input
                                            id="searchKey"
                                            style={{ fontSize: '16px' }}
                                            disableUnderline={true}
                                            placeholder="Enter to search"
                                            type="text"
                                            value={renderSearchProps.keyword}
                                            onChange={(e) => {
                                                renderSearchProps.setKeyword(e.target.value);
                                                localStorage.setItem('keyword', e.target.value);
                                                localStorage.setItem('currentMatchIndex', '0');
                                                setSelectedInsight(undefined);
                                                setHasClearedKeyword(e.target.value.length == 0);
                                            }}
                                        />
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                renderSearchProps.changeMatchCase(!matchCase);
                                                setMatchCase(!matchCase);
                                                localStorage.setItem('currentMatchIndex', '0');
                                                setSelectedInsight(undefined);
                                            }}
                                            style={{ color: matchCase ? 'black' : 'gray' }}>
                                            <VscCaseSensitive size="20px" />
                                        </IconButton>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                renderSearchProps.changeWholeWords(!matchWord);
                                                setMatchWord(!matchWord);
                                                localStorage.setItem('currentMatchIndex', '0');
                                                setSelectedInsight(undefined);
                                            }}
                                            style={{ color: matchWord ? 'black' : 'gray' }}>
                                            <VscWholeWord size="20px" />
                                        </IconButton>
                                        <p
                                            style={{
                                                color: matches.length ? Theme.primary : 'gray',
                                                marginRight: '10px',
                                                marginLeft: '10px',
                                                fontSize: '16px',
                                            }}>
                                            {matches.length ? matchIndex : 0}/{matches.length}
                                        </p>
                                        <IconButton
                                            style={{ height: '30px', width: '30px' }}
                                            disabled={matchIndex == 1}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const nextIndex = matchIndex - 1;
                                                setMatchIndex(nextIndex);
                                                localStorage.setItem(
                                                    'currentMatchIndex',
                                                    JSON.stringify(nextIndex)
                                                );
                                            }}>
                                            <KeyboardArrowUp />
                                        </IconButton>
                                        <IconButton
                                            style={{ height: '30px', width: '30px' }}
                                            disabled={
                                                matchIndex == renderSearchProps.numberOfMatches ||
                                                !renderSearchProps.numberOfMatches
                                            }
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const nextIndex = matchIndex + 1;
                                                setMatchIndex(nextIndex);
                                                localStorage.setItem(
                                                    'currentMatchIndex',
                                                    JSON.stringify(nextIndex)
                                                );
                                            }}>
                                            <KeyboardArrowDown />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                setIsSearching(false);
                                            }}>
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </Flex>
                                </Flex>
                            );
                        }}
                    </Search>
                )}

                <Viewer
                    defaultScale={SpecialZoomLevel.PageWidth}
                    fileUrl="./sample.pdf"
                    plugins={[
                        highlightPluginInstance,
                        zoomPluginInstance as Plugin,
                        searchPluginInstance as Plugin,
                    ]}
                    onDocumentLoad={(e) => {
                        setNumPages(e.doc.numPages);
                        setIsDocumentLoaded(true);
                        if (!highlights.length) return;
                        const index = highlights.findIndex(
                            (insight) => insight.text === selectedInsight
                        );

                        if (index !== -1) {
                            jumpToHighlightArea({
                                ...highlights[index],
                                top: highlights[index].top - JUMP_PADDING,
                            });
                        }
                    }}
                    onPageChange={(e) => {
                        if (!isSearching) {
                            setCurrentPage(e.currentPage);
                        }
                    }}
                />
            </Worker>
        </Container>
    );
};

export default PDFViewer;
