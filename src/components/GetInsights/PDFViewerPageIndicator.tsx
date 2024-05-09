import { useContext } from 'react';
import Container from '../UI/Common/Container';
import { Text } from '../UI/Typography';
import {
    GetInsightsContext,
    GetInsightsContextType,
} from '../../pages/GetInsights/context/getInsightsContext';
import { MeliorTranslate } from '../MeliorTranslate';

const PDFViewerPageIndicator = () => {
    const { currentPage, numPages, isDocumentLoaded } = useContext(
        GetInsightsContext
    ) as GetInsightsContextType;
    if (!isDocumentLoaded) return <></>;
    return (
        <Container fullWidth textAlign="center" topOuterSpacing={0.3}>
            <Text>
                <MeliorTranslate valueKey="Page" /> {currentPage + 1}{' '}
                <MeliorTranslate valueKey="of" /> {numPages}
            </Text>
        </Container>
    );
};

export default PDFViewerPageIndicator;
