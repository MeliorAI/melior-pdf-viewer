import ErrorPlaceholder from './ErrorPlaceholder';
import { render, screen } from '@testing-library/react';

describe('when testing <ErrorPlaceholder /> component', () => {
    const errorMessage = 'An error occured';
    it('should display error message', () => {
        render(<ErrorPlaceholder message={errorMessage} />);
        const errorText = screen.getByText(errorMessage);
        expect(errorText).toBeInTheDocument();
    });
});
