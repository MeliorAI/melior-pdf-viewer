import PageHeader from './PageHeader';
import { render, screen } from '@testing-library/react';

describe('when testing <PageHeader /> component', () => {
    const title = 'This is a page title';
    const subtitle = 'This is a subtitle';
    it('renders title and subtitle respectively', () => {
        render(<PageHeader title={title} subtitle={subtitle} />);
        const titleText = screen.getByText(title);
        expect(titleText).toBeInTheDocument();

        const subtitleText = screen.getByText(subtitle);
        expect(subtitleText).toBeInTheDocument();
    });
});
