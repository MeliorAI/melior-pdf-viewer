import GetInsightsHeader from '../../components/GetInsights/Header';
import PDFViewer from '../../components/GetInsights/PDFViewer';
import Flex from 'styled-flex-component';
import InsightsSidebar from '../../components/GetInsights/Sidebar';
import Container from '../../components/UI/Common/Container';
import { useState } from 'react';
import GetInsightsProvider from './context/getInsightsContext';
import PDFViewerPageIndicator from '../../components/GetInsights/PDFViewerPageIndicator';
import GetInsightsLayoutStyled from '../../components/GetInsights/Layout/Layout.styled';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import document from '../GetInsights/documentData';

const GetInsightsPage = () => {
    const [sidebarSize, setSidebarSize] = useState<number>();
    const [fileUrl] = useState<string>('');

    window.addEventListener('keydown', function (event) {
        if (
            (event.ctrlKey || event.metaKey) &&
            String.fromCharCode(event.which).toLowerCase() == 'f'
        ) {
            event.preventDefault();
        }
    });

    return (
        <GetInsightsProvider
            documentData={document}
            fileUrl={fileUrl}>
            <GetInsightsLayoutStyled>
                <GetInsightsHeader />
                <Container topInnerSpacing={4}>
                    <Flex justifyBetween full>
                        <PanelGroup autoSaveId="sidebar" direction="horizontal">
                            <Panel
                                defaultSize={20}
                                minSize={20}
                                order={1}
                                onResize={(size) => {
                                    setSidebarSize(size);
                                    console.log(sidebarSize);
                                    
                                }}>
                                <InsightsSidebar/>
                            </Panel>
                            <PanelResizeHandle style={{ width: '5px' }} />
                            <Panel order={2}>
                                <Container
                                    topInnerSpacing={1.0625}
                                    bottomInnerSpacing={1.0625}
                                    leftInnerSpacing={1.6875}
                                    rightInnerSpacing={1.6875}
                                    height="calc(100vh - 98px)"
                                    width="calc(100vh - ${sidebarSize})">
                                    <PDFViewer />
                                    <PDFViewerPageIndicator />
                                </Container>
                            </Panel>
                        </PanelGroup>
                    </Flex>
                </Container>
            </GetInsightsLayoutStyled>
        </GetInsightsProvider>
    );
};

export default GetInsightsPage;
