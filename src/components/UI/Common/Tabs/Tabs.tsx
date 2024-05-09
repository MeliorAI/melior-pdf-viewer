import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Flex from 'styled-flex-component';
import Container from '../Container';

export function tabProps(index: number) {
    return {
        'id': `tab-${index}`,
        'key': `tab-${index}-key`,
        'aria-controls': `tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box marginTop={0}>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

export interface ITab {
    label: string;
    children?: React.ReactNode;
}

interface IPageTabsProps {
    tabs: ITab[];
    customAccessories?: React.ReactNode[];
}

const PageTabs = ({ tabs, customAccessories }: IPageTabsProps) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Flex justifyBetween>
                    <Tabs style={{ overflow: 'visible' }} value={value} onChange={handleChange}>
                        {tabs.map((tab: ITab, index) => (
                            <Tab label={tab.label} {...tabProps(index)} key={index} />
                        ))}
                    </Tabs>
                    <Flex>
                        {customAccessories?.map((element, index) => {
                            return <Container key={index}>{element}</Container>;
                        })}
                    </Flex>
                </Flex>
            </Box>
            {tabs.map((tab: ITab, index) => (
                <TabPanel value={value} key={index} index={index}>
                    {tab.children}
                </TabPanel>
            ))}
        </>
    );
};

export default PageTabs;
