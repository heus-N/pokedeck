'use client';

import { Typography } from "@mui/material";
import AutoCompleteInput, { OptionType } from "./AutoCompleteInput";
import { useTranslation } from "react-i18next";
import Tip from "./Tip";

const options = [
  { id: 1, name: 'Português', locale: 'pt' },
  { id: 2, name: 'English', locale: 'en' },
];

export default function SelectLanguage() {
    const { i18n } = useTranslation();
    const { t } = useTranslation('common');
    const currentLocale = i18n.language || 'pt';
    const currentOption = options.find(opt => opt.locale === currentLocale) ?? options[0];

    const handleChange = (selected: OptionType | null) => {
        if (!selected) return;
        if (selected.locale === currentLocale) return;

        if (selected.locale) {
            i18n.changeLanguage(selected.locale);
            localStorage.setItem('i18nextLng', selected.locale);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Typography py={2} variant="h2" color="#fff">
                    {t('filter.language')}
                </Typography>
                <Tip message={t('filter.tip')} />
            </div>
            <AutoCompleteInput
                iconPath="flags"
                label={t('filter.language')}
                options={options}
                value={currentOption}
                onChange={handleChange}
            />
        </div>
    );
}
