import React from 'react';

import { getHeaderStyled, IHProps } from './H.styled';

const HStyled = getHeaderStyled('h4', {
    fontSize: 2.125,
    fontWeight: 600,
    letterSpacing: 0,
});

export const H4 = (props: IHProps & React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <HStyled {...props} />;
};
