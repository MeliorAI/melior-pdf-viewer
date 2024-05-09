import styled, { css } from 'styled-components';

export interface IStyledHeaderProps {
    fontSize: number;
    fontWeight: number | string;
    lineHeight?: number | string;
    letterSpacing: number;
}

export interface IHProps {
    inline?: boolean;
    light?: boolean;
    leftOuterSpacing?: number;
    rightOuterSpacing?: number;
    topOuterSpacing?: number;
    bottomOuterSpacing?: number;
    center?: boolean;
    uppercase?: boolean;
    clickable?: boolean;
    textOverflowAsEllipsis?: boolean;
    capitalize?: boolean;
}

export const getHeaderStyled = (element: string, props: IStyledHeaderProps) =>
    styled(element)`
        ${({
            color,
            inline,
            light,
            leftOuterSpacing,
            rightOuterSpacing,
            topOuterSpacing,
            bottomOuterSpacing,
            center,
            uppercase,
            clickable,
            textOverflowAsEllipsis,
            capitalize,
        }) => css`
            font-family: 'Poppins', sans-serif;
            margin-top: 0;
            margin-bottom: 0;
            font-size: ${props.fontSize}rem;
            font-weight: ${props.fontWeight};
            ${props.lineHeight &&
            css`
                line-height: ${props.lineHeight};
            `}

            letter-spacing: ${props.letterSpacing}px;
            ${color &&
            css`
                color: ${color};
            `};
            ${inline &&
            css`
                display: inline;
                line-height: normal;
            `};
            ${light &&
            css`
                font-weight: 300;
            `};
            ${leftOuterSpacing &&
            css`
                margin-left: ${leftOuterSpacing}rem;
            `};
            ${rightOuterSpacing &&
            css`
                margin-right: ${rightOuterSpacing}rem;
            `};
            ${topOuterSpacing &&
            css`
                margin-top: ${topOuterSpacing}rem;
            `};
            ${bottomOuterSpacing &&
            css`
                margin-bottom: ${bottomOuterSpacing}rem;
            `};
            ${center &&
            css`
                text-align: center;
            `};
            ${uppercase &&
            css`
                text-transform: uppercase;
            `};
            ${clickable &&
            css`
                cursor: pointer;
            `};
            ${textOverflowAsEllipsis &&
            css`
                text-overflow: ellipsis;
                overflow: hidden;
            `};
            ${capitalize &&
            css`
                text-transform: capitalize;
            `};
        `};
    `;
