import styled, { css } from 'styled-components';
import { ITextProps } from './Text';

export default styled<ITextProps>('span')`
    font-size: 0.875rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.3px;
    text-transform: none;

    ${({ color }) =>
        color &&
        css`
            color: ${color};
        `};

    ${({ uppercase }) =>
        uppercase &&
        css`
            text-transform: uppercase;
        `};

    ${({ capitalize }) =>
        capitalize &&
        css`
            text-transform: capitalize;
        `};

    ${({ customletterSpacing }) =>
        customletterSpacing &&
        css`
            letter-spacing: ${customletterSpacing}rem;
        `};
    ${({ customFontSize }) =>
        customFontSize &&
        css`
            font-size: ${customFontSize}rem;
        `};
    ${({ customFontWeight }) =>
        customFontWeight &&
        css`
            font-weight: ${customFontWeight};
        `};

    ${({ customFontFamily }) =>
        customFontFamily &&
        css`
            font-family: ${customFontFamily};
        `};

    ${({ whiteSpace }) =>
        whiteSpace &&
        css`
            white-space: ${whiteSpace};
        `};

    ${({ wordBreak }) =>
        wordBreak &&
        css`
            word-break: ${wordBreak};
        `};
`;
