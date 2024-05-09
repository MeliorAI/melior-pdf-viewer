import Loading from './Loading';
import { render, screen } from '@testing-library/react';

describe('when testing <Loading /> component', () => {
    const message = 'Loading stuff';
    it('should display loading message', () => {
        render(<Loading message={message} />);
        const loadingText = screen.getByText(message);
        expect(loadingText).toBeInTheDocument();
    });
});
