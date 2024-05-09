import React from 'react';

import { getHeaderStyled, IHProps } from './H.styled';

const HStyled = getHeaderStyled('h3', {
    fontSize: 3,
    fontWeight: '600',
    letterSpacing: 0,
});

export const H3 = (props: IHProps & React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <HStyled {...props} />;
};
