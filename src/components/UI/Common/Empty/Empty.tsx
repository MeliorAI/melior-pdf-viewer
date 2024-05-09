import { Text } from '../../Typography';

interface ILoadingProps {
    message: string | React.ReactNode;
}

const Empty = ({ message }: ILoadingProps) => {
    if (typeof message === 'string') <Text>{message}</Text>;

    return <>{message}</>;
};

export default Empty;
