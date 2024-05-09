import { getHeaderStyled, IHProps } from './H.styled';

const HStyled = getHeaderStyled('h1', {
    fontSize: 6,
    fontWeight: 600,
    letterSpacing: 0,
});

export const H1 = (props: IHProps & React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <HStyled {...props} />;
};
