import React from 'react';

import { getHeaderStyled, IHProps } from './H.styled';

const HStyled = getHeaderStyled('h6', {
    fontSize: 1.25,
    fontWeight: 600,
    letterSpacing: 0,
});

export const H6 = (props: IHProps & React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <HStyled {...props} />;
};
