import { useContext } from 'react';
import {
    GetInsightsContext,
    GetInsightsContextType,
} from '../../pages/GetInsights/context/getInsightsContext';
import { InsightType } from '../../enums/InsightType';
import Container from '../UI/Common/Container';

const ChatNavigationBar = () => {
    const { selectedInsightType } = useContext(GetInsightsContext) as GetInsightsContextType;

    if (selectedInsightType !== InsightType.CHAT) {
        return <></>;
    }

    return <Container height={3.62} />;
};

export default ChatNavigationBar;
