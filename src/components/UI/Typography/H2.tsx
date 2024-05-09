import { getHeaderStyled, IHProps } from './H.styled';

const HStyled = getHeaderStyled('h2', {
    fontSize: 3.75,
    fontWeight: 600,
    letterSpacing: 0,
});

export const H2 = (props: IHProps & React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <HStyled {...props} />;
};
