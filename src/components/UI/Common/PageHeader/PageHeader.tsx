import { Theme } from '../../../../theme';
import { H4, Text } from '../../Typography';
import Container from '../Container';
import Flex from 'styled-flex-component';

interface IPageHeaderProps {
    title?: string;
    subtitle?: string;
    customAccessory?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, customAccessory }: IPageHeaderProps) => {
    return (
        <Flex justifyBetween alignCenter>
            <Container>
                <H4 color={Theme.primaryDark}>{title}</H4>
                {subtitle && (
                    <Container topOuterSpacing={0.3125}>
                        <Text customFontSize={1.125} color="rgba(13, 24, 50, 0.54);">
                            {subtitle}
                        </Text>
                    </Container>
                )}
            </Container>
            <Container>{customAccessory}</Container>
        </Flex>
    );
};

export default PageHeader;
