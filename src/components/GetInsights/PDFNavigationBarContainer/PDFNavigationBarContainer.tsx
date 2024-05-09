import { ReactNode } from 'react';
import Container from '../../UI/Common/Container';

interface Props {
    children: ReactNode;
}

const PDFNavigationBarContainer = ({ children }: Props) => {
    return (
        <Container
            width="fit-content"
            leftPosition={27}
            borderRadius={2}
            topPosition={5}
            topInnerSpacing={0.4}
            bottomInnerSpacing={0.4}
            leftInnerSpacing={0.5}
            rightInnerSpacing={0.5}
        >
            {children}
        </Container>
    );
};

export default PDFNavigationBarContainer;
