import Empty from './Empty';
import { render, screen } from '@testing-library/react';

describe('when testing <Empty /> component', () => {
    const message = 'There are no stuff here';
    it('should display empty message', () => {
        render(<Empty message={message} />);
        const emptyPlaceholder = screen.getByText(message);
        expect(emptyPlaceholder).toBeInTheDocument();
    });
});
