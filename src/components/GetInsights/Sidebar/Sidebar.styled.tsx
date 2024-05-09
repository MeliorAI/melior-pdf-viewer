import { Accordion, AccordionSummary } from '@mui/material';
import styled from 'styled-components';

export default styled.aside`
    height: calc(100vh - 80px);
    background: white;
    top: 80px;
`;

export const StyledAccordion = styled(Accordion)`
    box-shadow: none !important;
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
    padding-right: 32px !important;
    .MuiAccordionSummary-content {
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding-left: 16px;
        padding-right: 2rem;
    }
`;
