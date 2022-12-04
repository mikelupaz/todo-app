import { useFormContext, Controller } from "react-hook-form";

import { FormControl, TextField, TextFieldProps } from "@mui/material";

interface IProps {
  name: string;
}

export default function FormTextField({
  name,
  ...other
}: IProps & TextFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant="standard" fullWidth error={Boolean(error)}>
          <TextField
            {...other}
            {...field}
            helperText={error?.message}
            error={Boolean(error)}
          />

          {/* <FormHelperText id={`form-field-error-${field?.name}`}>
            {error?.message || ""}
          </FormHelperText> */}
        </FormControl>
      )}
    />
  );
}
