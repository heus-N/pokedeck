import { Autocomplete, Box, TextField, Typography } from '@mui/material';

export interface OptionType {
  name: string;
  id: number;
  locale?: string;
}

interface AutoCompleteInputProps {
  options: OptionType[];
  label: string;
  placeholder?: string;
  iconPath?: string;
  value?: OptionType | null;
  onChange?: (value: OptionType | null) => void;
}

export default function AutoCompleteInput({
  options,
  label,
  placeholder = '',
  iconPath,
  value,
  onChange,
}: AutoCompleteInputProps) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={value ?? null}
      onChange={(_, newValue) => onChange?.(newValue ?? null)}
      sx={{ width: '100%', marginBottom: '1rem' }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return(
          <Box
            key={key}
            component="li"
            {...rest}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 1 }}
          >
            <Box sx={{flexGrow: 1, textTransform: 'capitalize'}}>{option.name}</Box>
            {iconPath && <img
              src={`/utils/${iconPath}/${option.name.toLowerCase()}.png`}
              alt={option.name}
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
            />}
          </Box>
        )
      }}
    />
  );
}
