import { CountryCode } from './enums/CountryCode';

export const LINT_VERSION = 'v1.5.0-dev';

const countryFlag = (code: string) => (
    <img
        alt="United States"
        height="20"
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code.toUpperCase()}.svg`}
    />
);

export const COUNTRIES = {
    en: {
        language: 'US English',
        icon: countryFlag('US'),
    },
    es: {
        language: 'Spanish',
        icon: countryFlag(CountryCode.SPANISH),
    },
    fr: {
        language: 'French',
        icon: countryFlag(CountryCode.FRENCH),
    },
    pt: {
        language: 'Portuguese',
        icon: countryFlag(CountryCode.PORTUGUESE),
    },
};
