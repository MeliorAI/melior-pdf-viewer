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
import { ISelectedEntity } from '../helpers/types';
import PDFNavigationBarContainer from '../PDFNavigationBarContainer';
import { MeliorTranslate } from '../../MeliorTranslate';

const KeyDataNavigationBar = () => {
    const { documentData, selectedInsight, selectedInsightType, setSelectedInsight } = useContext(
        GetInsightsContext
    ) as GetInsightsContextType;
    const entities = Object.keys(documentData.entities);
    const currentIndex = selectedInsight
        ? entities.findIndex((entity) => entity === (selectedInsight as ISelectedEntity).entityType)
        : -1;
    const isBackOptionEnabled = currentIndex > 0;
    const isForwardEnabled = currentIndex < entities.length - 1;

    function backward() {
        if (currentIndex < 1) return;
        if (!selectedInsight) return;
        const entityIndex = entities.findIndex(
            (entity) => (selectedInsight as ISelectedEntity).entityType === entity
        );
        if (entityIndex === -1) return;
        setSelectedInsight({
            entityType: entities[entityIndex - 1],
            index: 0,
        });
    }

    function forward() {
        if (currentIndex === entities.length - 1) return;
        if (!selectedInsight) {
            setSelectedInsight({
                entityType: entities[0],
                index: 0,
            });
            return;
        }
        const entityIndex = entities.findIndex(
            (entity) => (selectedInsight as ISelectedEntity).entityType === entity
        );
        if (entityIndex === -1) return;
        setSelectedInsight({
            entityType: entities[entityIndex + 1],
            index: 0,
        });
    }

    if (selectedInsightType !== InsightType.KEYDATA) {
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
                        <Text customFontSize={0.8125} color={Theme.primaryDark}>
                            <MeliorTranslate valueKey="Show key data" />
                        </Text>
                        <Container>
                            <Flex center>
                                <Container
                                    cursor={isBackOptionEnabled ? 'pointer' : 'default'}
                                    onClick={backward}
                                >
                                    <ChevronLeftOutlined
                                        fontSize="small"
                                        style={{
                                            color: isBackOptionEnabled
                                                ? 'rgba(13, 24, 50, 0.54)'
                                                : 'rgba(13, 24, 50, 0.24)',
                                            marginTop: '5px',
                                        }}
                                    />
                                </Container>
                                <Text customFontSize={0.8125}>
                                    {currentIndex + 1} of {entities.length}
                                </Text>
                                <Container
                                    cursor={isForwardEnabled ? 'pointer' : 'default'}
                                    onClick={forward}
                                >
                                    <ChevronRightOutlined
                                        fontSize="small"
                                        style={{
                                            color: isForwardEnabled
                                                ? 'rgba(13, 24, 50, 0.54)'
                                                : 'rgba(13, 24, 50, 0.24)',
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

export default KeyDataNavigationBar;
