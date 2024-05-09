import Flex from 'styled-flex-component';
import { Text } from '../../UI/Typography';
import Container from '../../UI/Common/Container';
import { Theme } from '../../../theme';
import { ISelectedEntity } from '../helpers/types';

interface ICLausesListItemProps {
    index: number;
    clause: {
        id: string;
        key: string;
    };
    hoveredInsight: string;
    setHoveredInsight: (string) => void;
    isEditing: (string) => boolean;
    setSelectedInsight: (insight: string | ISelectedEntity | undefined) => void;
    setTextMatchIndex: (index: number) => void;
    isHideable: boolean;
    isParsed: boolean;
    editSelection: (e: any, clause: any) => void;
}

const ClausesListItem = ({
    clause,
    hoveredInsight,
    setHoveredInsight,
    isEditing,
    setSelectedInsight,
    setTextMatchIndex,
    isHideable,
}: ICLausesListItemProps) => {
    return (
        <Container
            onClick={() => {
                setTextMatchIndex(0);
                setSelectedInsight(isHideable ? clause.key : '');
            }}
            pointerEvents={isEditing(clause.key) && isHideable ? 'none' : ''}
            backgroundColor={
                isEditing(clause.key) && isHideable
                    ? 'rgba(13, 24, 50, 0.3)'
                    : hoveredInsight == clause.key
                      ? 'whitesmoke'
                      : 'white'
            }
            display="flex"
            data-testid="clause-row"
            cursor="pointer"
            borderBottom="1px solid rgba(13, 24, 50, 0.12)"
            leftInnerSpacing={2}
            rightInnerSpacing={1}
            height={5}
            onMouseEnter={() => {
                setHoveredInsight(clause.key);
            }}
            onMouseLeave={() => {
                setHoveredInsight('');
            }}>
            <Flex justifyBetween alignCenter style={{ width: '100%' }}>
                <Flex alignCenter>
                    <Text
                        color={
                            isHideable
                                ? Theme.primaryDark
                                : hoveredInsight == clause.key
                                  ? Theme.primaryDark
                                  : 'darkgray'
                        }
                        dangerouslySetInnerHTML={{ __html: clause.key }}
                    />
                </Flex>
            </Flex>
        </Container>
    );
};

export default ClausesListItem;
