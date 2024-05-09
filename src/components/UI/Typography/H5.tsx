import React from 'react';

import { getHeaderStyled, IHProps } from './H.styled';

const HStyled = getHeaderStyled('h5', {
    fontSize: 1.5,
    fontWeight: 600,
    letterSpacing: 0,
});

export const H5 = (props: IHProps & React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <HStyled {...props} />;
};
