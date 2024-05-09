import { Theme } from '../../../theme';
import Container from '../../UI/Common/Container';
import Flex from 'styled-flex-component';
import { Text } from '../../UI/Typography';
import { useContext } from 'react';
import {
    GetInsightsContext,
    GetInsightsContextType,
} from '../../../pages/GetInsights/context/getInsightsContext';
import ClauseNavigationBar from '../ClauseNavigationBar';

const GetInsightsHeader = () => {
    const { documentData } = useContext(GetInsightsContext) as GetInsightsContextType;

    return (
        <Container fixed width="100%" zIndex={1} backgroundColor={Theme.primaryDark}>
            <Container
                leftInnerSpacing={2}
                rightInnerSpacing={2.6875}
                topInnerSpacing={0.75}
                bottomInnerSpacing={0.75}
                color={Theme.whiteColor}>
                <Flex justifyBetween alignCenter>
                    <Flex alignCenter>
                        <Container maxWidth={30}>
                            <Text
                                customFontWeight={600}
                                data-testid="header-document-name"
                                customFontSize={1}
                                color={Theme.whiteColor}
                                whiteSpace="break-spaces"
                                wordBreak="break-all">
                                {documentData.name}
                            </Text>
                        </Container>
                    </Flex>
                    <Container leftOuterSpacing={0.5}>
                        <ClauseNavigationBar />
                    </Container>
                </Flex>
            </Container>
        </Container>
    );
};
export default GetInsightsHeader;
