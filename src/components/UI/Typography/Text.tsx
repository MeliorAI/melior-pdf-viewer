import TextStyled from './Text.styled';

export interface ITextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * Sets the color of the text
     *
     * @default rgba(0, 0, 0, 0.7)
     */
    color?: string;

    /**
     * Displays the text in uppercase
     *
     * @default false
     */
    uppercase?: boolean;

    /**
     * Displays the text with capitalized first letter for each word
     *
     * @default false
     */
    capitalize?: boolean;

    /**
     * custom font weight for text weights that do not fit the preset letterSpacing
     *
     * @default undefined
     */
    customletterSpacing?: number;

    /**
     * custom font size (in rem) for text sizes that do not fit the preset fontsizes
     *
     * @default undefined
     */
    customFontSize?: number;

    /**
     * custom font weight for text weights that do not fit the preset fontweights
     *
     * @default undefined
     */
    customFontWeight?: number;

    /**
     * custom font family
     *
     * @default undefined
     */
    customFontFamily?: string;

    whiteSpace?: string;
    wordBreak?: string;
}

export const Text = (props: ITextProps) => {
    return <TextStyled {...props} />;
};
