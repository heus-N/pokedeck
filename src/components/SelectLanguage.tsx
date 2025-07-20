'use client';

import { Typography } from "@mui/material";
import AutoCompleteInput, { OptionType } from "./AutoCompleteInput";
import { useTranslation } from "react-i18next";

const options = [
  { id: 1, name: 'Português', locale: 'pt' },
  { id: 2, name: 'English', locale: 'en' },
];

export default function SelectLanguage() {
    const { i18n } = useTranslation();

    const currentLocale = i18n.language || 'pt';
    const currentOption = options.find(opt => opt.locale === currentLocale) ?? options[0];

 const handleChange = (selected: OptionType | null) => {
    if (!selected) return;
    if (selected.locale === currentLocale) return;

    i18n.changeLanguage(selected.locale);
  };

    return (
        <>
            <Typography py={2} variant="h2" color="#fff">Idioma:</Typography>
            <AutoCompleteInput
                iconPath="flags"
                label="Idioma"
                options={options}
                value={currentOption}
                onChange={handleChange}
            />
        </>
    );
}
