import PageTabs, { ITab } from './Tabs';
import { render, screen } from '@testing-library/react';

describe('when testing <PageTabs /> component', () => {
    describe('when rendering tabs component with an empty array prop', () => {
        beforeAll(() => render(<PageTabs tabs={[]} />));
        it('should not render tabpanel', () => {
            const tabPanel = screen.queryByRole('tabpanel');
            expect(tabPanel).not.toBeInTheDocument();
        });
        it('should not render tablist', () => {
            const tabList = screen.queryByRole('tablist');
            expect(tabList).not.toBeInTheDocument();
        });
    });

    describe('when rendering tabs component with non-empty array prop', () => {
        const tabs: ITab[] = [
            {
                label: 'Test Tab',
                children: <>Hello World</>,
            },
            {
                label: 'Test Tab 2',
                children: <>Hi there</>,
            },
        ];

        it('should render tab panels', () => {
            render(<PageTabs tabs={tabs} />);
            const tabPanel = screen.queryAllByRole('tab');
            expect(tabPanel).toHaveLength(tabs.length);
        });
    });
});
