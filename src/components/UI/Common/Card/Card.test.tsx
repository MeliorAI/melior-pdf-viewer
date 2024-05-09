import { render, screen } from '@testing-library/react';
import CardContainer from './Card';

describe('when testing <CardContainer /> component', () => {
    it('should render card properly label', () => {
        render(
            <CardContainer>
                <span>Hello World</span>
            </CardContainer>
        );
        const label = screen.queryByText('Hello World');
        expect(label).toBeInTheDocument();
    });
});
