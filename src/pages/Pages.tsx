import { Route, Routes } from 'react-router-dom';
import GetInsightsPage from './GetInsights';

const PageRoot = () => {
    return (
        <Routes>
            <Route path="/" element={<GetInsightsPage />} />
        </Routes>
    );
};

export default PageRoot;
