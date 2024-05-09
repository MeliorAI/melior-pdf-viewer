import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import Container from '../../UI/Common/Container';
import Flex from 'styled-flex-component';
import { Theme } from '../../../theme';
import { Text } from '../../UI/Typography';
import { useContext } from 'react';
import {
    GetInsightsContext,
    GetInsightsContextType,
} from '../../../pages/GetInsights/context/getInsightsContext';
import { InsightType } from '../../../enums/InsightType';
import PDFNavigationBarContainer from '../PDFNavigationBarContainer';
import { MeliorTranslate } from '../../MeliorTranslate';

const ClauseNavigationBar = () => {
    const { documentData, selectedInsight, selectedInsightType, setSelectedInsight } = useContext(
        GetInsightsContext
    ) as GetInsightsContextType;
    const clauses = Object.keys(documentData.clauses);
    const currentIndex = clauses.findIndex((clause) => clause === selectedInsight);

    function backward() {
        if (currentIndex === 0) return;

        setSelectedInsight(clauses[currentIndex - 1]);
    }

    function forward() {
        if (currentIndex === clauses.length - 1) return;

        setSelectedInsight(clauses[currentIndex + 1]);
    }

    if (selectedInsightType !== InsightType.CLAUSE) {
        return <></>;
    }

    return (
        <PDFNavigationBarContainer>
            <Flex center>
                <Container
                    backgroundColor="white"
                    topInnerSpacing={0.375}
                    bottomInnerSpacing={0.375}
                    leftInnerSpacing={1}
                    rightInnerSpacing={1}
                    borderRadius={2}
                >
                    <Flex center>
                        <Text color={Theme.primaryDark} customFontSize={0.8125}>
                            <MeliorTranslate valueKey="Show clauses" />
                        </Text>
                        <Container>
                            <Flex center>
                                <Container
                                    cursor={currentIndex !== 0 ? 'pointer' : 'default'}
                                    onClick={backward}
                                >
                                    <ChevronLeftOutlined
                                        fontSize="small"
                                        style={{
                                            color:
                                                currentIndex === 0
                                                    ? 'rgba(13, 24, 50, 0.24)'
                                                    : 'rgba(13, 24, 50, 0.54)',
                                            marginTop: '5px',
                                        }}
                                    />
                                </Container>
                                <Text customFontSize={0.8125}>
                                    {currentIndex + 1} of {clauses.length}
                                </Text>
                                <Container
                                    cursor={
                                        currentIndex !== clauses.length - 1 ? 'pointer' : 'default'
                                    }
                                    onClick={forward}
                                >
                                    <ChevronRightOutlined
                                        fontSize="small"
                                        style={{
                                            color:
                                                currentIndex === clauses.length - 1
                                                    ? 'rgba(13, 24, 50, 0.24)'
                                                    : 'rgba(13, 24, 50, 0.54)',
                                            marginTop: '5px',
                                        }}
                                    />
                                </Container>
                            </Flex>
                        </Container>
                    </Flex>
                </Container>
            </Flex>
        </PDFNavigationBarContainer>
    );
};

export default ClauseNavigationBar;
