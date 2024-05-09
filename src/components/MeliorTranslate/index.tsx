import { useTranslation } from 'react-i18next';

interface Props {
    valueKey: string;
}

export const MeliorTranslate = ({ valueKey }: Props) => {
    const { t } = useTranslation();
    return <>{t(valueKey)}</>;
};
