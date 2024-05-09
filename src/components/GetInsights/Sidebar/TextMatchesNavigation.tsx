import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Container from '../../UI/Common/Container';
import Flex from 'styled-flex-component';
import { Text } from '../../UI/Typography';
import { ClauseDataExtraction, EntityDetection } from '../../../@types/Document';
import { useContext } from 'react';
import {
    GetInsightsContext,
    GetInsightsContextType,
} from '../../../pages/GetInsights/context/getInsightsContext';
import { MeliorTranslate } from '../../MeliorTranslate';

interface Props {
    items: ClauseDataExtraction[] | EntityDetection[];
}

const TextMatchesNavigation = ({ items }: Props) => {
    const { textMatchIndex, setTextMatchIndex } = useContext(
        GetInsightsContext
    ) as GetInsightsContextType;

    function goLeft(e) {
        e.stopPropagation();
        if (textMatchIndex === 0) return;

        setTextMatchIndex(textMatchIndex - 1);
    }

    function goRight(e) {
        e.stopPropagation();
        if (textMatchIndex === items.length - 1) return;

        setTextMatchIndex(textMatchIndex + 1);
    }
    return (
        <Container>
            <Flex justifyBetween alignCenter>
                <Container cursor="pointer" onClick={goLeft}>
                    <ChevronLeft fontSize="inherit" />
                </Container>
                <Text customFontSize={0.625}>
                    {textMatchIndex + 1} <MeliorTranslate valueKey="of" /> {items.length}{' '}
                    <MeliorTranslate valueKey="Matches" />
                </Text>
                <Container cursor="pointer" onClick={goRight}>
                    <ChevronRight fontSize="inherit" />
                </Container>
            </Flex>
        </Container>
    );
};

export default TextMatchesNavigation;
