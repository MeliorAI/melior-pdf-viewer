import Flex from 'styled-flex-component';
import { Text } from '../../Typography';
import { CircularProgress } from '@mui/material';

interface ILoadingProps {
    message: string;
    marginTop?: string;
}

const Loading = ({ message, marginTop }: ILoadingProps) => {
    return (
        <Flex style={{ gap: '10px', marginTop: marginTop ?? '20px' }}>
            <CircularProgress
                style={{
                    color: '#3f51b5',
                    width: '20px',
                    height: '20px',
                }}
            />
            <Text>{message}</Text>
        </Flex>
    );
};

export default Loading;
