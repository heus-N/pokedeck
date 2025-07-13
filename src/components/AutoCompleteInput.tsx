import { Autocomplete, TextField } from '@mui/material';

interface OptionType {
  name: string;
  id: number;
}

interface AutoCompleteInputProps {
  options: OptionType[];
  label: string;
  placeholder?: string;
  value?: OptionType | null;
  onChange?: (value: OptionType | null) => void;
}

export default function AutoCompleteInput({
  options,
  label,
  placeholder = '',
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
    />
  );
}
