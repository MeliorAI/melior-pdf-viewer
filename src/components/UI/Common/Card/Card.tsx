import CardWrapper from './Card.styled';

interface IBaseProps {
    children: React.ReactNode;
    height?: number | string;
}

const CardContainer = ({ children, height }: IBaseProps) => {
    return <CardWrapper height={height}>{children}</CardWrapper>;
};

export default CardContainer;
