import { ComponentType } from 'react';
import styled, { css } from 'styled-components';

interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    textAlign?: string;
    relative?: boolean;
    absolute?: boolean;
    sticky?: boolean;
    fixed?: boolean;
    backgroundColor?: string;
    width?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
    height?: number | string;
    innerSpacing?: number;
    leftInnerSpacing?: number;
    fullWidth?: boolean;
    fullHeight?: boolean;
    rightInnerSpacing?: number;
    topInnerSpacing?: number;
    bottomInnerSpacing?: number;
    outerSpacing?: number;
    leftOuterSpacing?: number | string;
    rightOuterSpacing?: number;
    topOuterSpacing?: number;
    bottomOuterSpacing?: number;
    borderRadius?: number | string;
    wordBreak?: boolean;
    overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
    border?: string;
    borderLeft?: string;
    borderRight?: string;
    borderTop?: string;
    borderBottom?: string;
    leftPosition?: number;
    rightPosition?: number;
    topPosition?: number | string;
    boxShadow?: string;
    filter?: string;
    bottomPosition?: number;
    zIndex?: number;
    pointerEvents?: string;
    cursor?: 'default' | 'pointer' | 'not-allowed' | 'grab';
    display?: string;
    justifyContent?: string;
    alignItems?: string;
}

const Container: ComponentType<IContainerProps> = styled.div`
    ${({
        textAlign,
        backgroundColor,
        width,
        maxWidth,
        maxHeight,
        minWidth,
        minHeight,
        height,
        innerSpacing,
        leftInnerSpacing,
        rightInnerSpacing,
        fullWidth,
        fullHeight,
        topInnerSpacing,
        bottomInnerSpacing,
        relative,
        absolute,
        sticky,
        fixed,
        wordBreak,
        outerSpacing,
        leftOuterSpacing,
        rightOuterSpacing,
        topOuterSpacing,
        bottomOuterSpacing,
        borderRadius,
        border,
        borderLeft,
        borderRight,
        borderTop,
        boxShadow,
        filter,
        borderBottom,
        overflow,
        leftPosition,
        rightPosition,
        topPosition,
        bottomPosition,
        zIndex,
        cursor,
        pointerEvents,
        display,
        justifyContent,
        alignItems,
    }: IContainerProps) =>
        css`
            ${textAlign && `text-align: ${textAlign}`};
            ${relative && `position: relative`};
            ${absolute && `position: absolute`};
            ${sticky && `position: sticky`};
            ${fixed && `position: fixed`};
            ${outerSpacing && `margin: ${outerSpacing}rem;`};
            ${innerSpacing && `padding: ${innerSpacing}rem;`};
            ${leftInnerSpacing && `padding-left: ${leftInnerSpacing}rem;`};
            ${rightInnerSpacing && `padding-right: ${rightInnerSpacing}rem;`};
            ${topInnerSpacing && `padding-top: ${topInnerSpacing}rem;`};
            ${bottomInnerSpacing && `padding-bottom: ${bottomInnerSpacing}rem;`};
            ${zIndex && `z-index: ${zIndex};`};
            ${wordBreak && `word-break: break-word;`};
            ${leftOuterSpacing &&
            `margin-left: ${
                typeof leftOuterSpacing === 'number' ? `${leftOuterSpacing}rem` : leftOuterSpacing
            }`};
            ${boxShadow &&
            `
                box-shadow: ${boxShadow};
            `};
            ${filter &&
            `
                    filter: ${filter};
                `};
            ${fullWidth && `width: 100%`};
            ${fullHeight && `height: 100%`};
            ${rightOuterSpacing && `margin-right: ${rightOuterSpacing}rem;`};
            ${topOuterSpacing && `margin-top: ${topOuterSpacing}rem;`};
            ${bottomOuterSpacing && `margin-bottom: ${bottomOuterSpacing}rem;`};
            ${backgroundColor && `background-color: ${backgroundColor};`};
            ${border && `border: ${border};`};
            ${borderLeft && `border-left: ${borderLeft};`};
            ${borderRight && `border-right: ${borderRight};`};
            ${borderTop && `border-top: ${borderTop};`};
            ${borderBottom && `border-bottom: ${borderBottom};`};
            ${overflow &&
            `
                overflow: ${overflow};
                scrollbar-width: thin;
                `};
            ${(leftPosition || leftPosition === 0) && `left: ${leftPosition}rem;`};
            ${(rightPosition || rightPosition === 0) && `right: ${rightPosition}rem;`};
            ${(topPosition || topPosition === 0) && `top: ${topPosition}rem;`};
            ${(bottomPosition || bottomPosition === 0) && `bottom: ${bottomPosition}rem;`};
            ${width &&
            `
                width: ${typeof width === 'number' ? `${width}rem` : width};
            `};
            ${maxWidth &&
            `
                max-width: ${typeof maxWidth === 'number' ? `${maxWidth}rem` : maxWidth};
            `};
            ${minHeight &&
            `
                min-height: ${typeof minHeight === 'number' ? `${minHeight}rem` : minHeight};
            `};
            ${minWidth &&
            `
              min-width: ${typeof minWidth === 'number' ? `${minWidth}rem` : minWidth};
            `};
            ${height &&
            `
                height: ${typeof height === 'number' ? `${height}rem` : height};
            `};
            ${maxHeight &&
            `
                max-height: ${typeof maxHeight === 'number' ? `${maxHeight}rem` : maxHeight};
            `};
            ${borderRadius &&
            `
                border-radius: ${
                    typeof borderRadius === 'number' ? `${borderRadius}rem` : borderRadius
                };
                `};
            ${cursor && `cursor: ${cursor};`};
            ${pointerEvents && `pointer-events: ${pointerEvents};`};
            ${display && `display: ${display};`};
            ${justifyContent && `justifyContent: ${justifyContent};`};
            ${alignItems && `alignItems: ${alignItems};`};
        `}
`;

export default Container;
