import GetInsightsHeader from '../../components/GetInsights/Header';
import PDFViewer from '../../components/GetInsights/PDFViewer';
import Flex from 'styled-flex-component';
import InsightsSidebar from '../../components/GetInsights/Sidebar';
import Container from '../../components/UI/Common/Container';
import { useEffect, useState } from 'react';
import { IDocument, StorageDetails } from '../../@types/Document';
import GetInsightsProvider from './context/getInsightsContext';
import PDFViewerPageIndicator from '../../components/GetInsights/PDFViewerPageIndicator';
import GetInsightsLayoutStyled from '../../components/GetInsights/Layout/Layout.styled';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import document from '../GetInsights/documentData';
import { adminGetShadowDownloadLinkWithBoxDetails } from '../../api/box/admin/file';
import getStorageDetails from '../../utils/getStorageDetails';

const GetInsightsPage = () => {
    const [isLoadingDocumentData, setIsLoadingDocumentData] = useState<boolean>(true);
    const [documentData, setDocumentData] = useState<IDocument>();
    const [sidebarSize, setSidebarSize] = useState<number>();
    const [fileUrl, setFileUrl] = useState<string>('');

    async function downloadFile(boxDetails: StorageDetails) {
        try {
            // Get the "shadow" version of the file, i.e. the one with OCR, used for rendering.
            const fileUrl = await adminGetShadowDownloadLinkWithBoxDetails(boxDetails);
            console.log('file: ', fileUrl);

            setFileUrl(fileUrl);
        } catch (e) {
            console.error('downloadFile error', e);
        }
    }

    async function getDocument() {
        try {
            const response = document;
            setDocumentData(response);
            setIsLoadingDocumentData(false);
            downloadFile(getStorageDetails(response));
        } catch (e) {
            console.error('getDocument e', e);
        }
    }

    useEffect(() => {
        getDocument();
    }, []);

    window.addEventListener('keydown', function (event) {
        if (
            (event.ctrlKey || event.metaKey) &&
            String.fromCharCode(event.which).toLowerCase() == 'f'
        ) {
            event.preventDefault();
        }
    });

    return (
        <>
            <GetInsightsProvider
                documentData={documentData}
                isLoadingDocumentData={isLoadingDocumentData}
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
                                    <InsightsSidebar
                                    />
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
                            ;
                        </Flex>
                    </Container>
                </GetInsightsLayoutStyled>
            </GetInsightsProvider>
        </>
    );
};

export default GetInsightsPage;
