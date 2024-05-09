import styled, { css } from 'styled-components';

interface ICardWrapperProps {
    height?: number | string;
}

const CardWrapper = styled.div`
    background: #ffffff;
    box-shadow: 0px 3px 6px rgba(3, 138, 255, 0.1);
    border-radius: 12px;
    padding: 31px;

    ${({ height }: ICardWrapperProps) =>
        css`
            ${height &&
            `
      height: ${typeof height === 'number' ? `${height}rem` : height};
    `};
        `}
`;

export default CardWrapper;
