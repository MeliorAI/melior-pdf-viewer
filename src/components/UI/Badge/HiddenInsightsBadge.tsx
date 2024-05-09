import { Badge, styled } from '@mui/material';

interface IHiddenInsightsBadgeProps {
    content: number;
}

const StyledBadge = styled(Badge)({
    '& .MuiBadge-badge': {
        backgroundColor: 'lightgray',
    },
});

export default function HiddenInsightsBadge({ content }: IHiddenInsightsBadgeProps) {
    return <StyledBadge badgeContent={content.toString()} />;
}
