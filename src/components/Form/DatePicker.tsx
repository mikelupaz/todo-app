import { useFormContext, Controller } from "react-hook-form";

import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type IProps = {
  name: string;
  minDate?: Date | number;
  label?: string;
  readOnly?: boolean;
  required?: boolean;
};

export default function DatePicker({
  name,
  minDate,
  readOnly,
  required,
  ...other
}: IProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            minDate={minDate}
            renderInput={(params) => (
              <TextField
                sx={{ m: 0 }}
                {...params}
                disabled={readOnly}
                fullWidth
                error={!!error}
                required={required}
                helperText={error?.message}
                margin="normal"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
            {...field}
            {...other}
          />
        </LocalizationProvider>
        // <DateTimePicker
        //   {...field}
        //   {...other}
        //   minDate={minDate}
        //   inputFormat="MM/dd/yyyy"
        //   renderInput={(params) => (
        //     <TextField
        //       sx={{ m: 0 }}
        //       {...params}
        //       disabled={readOnly}
        //       fullWidth
        //       error={!!error}
        //       required={required}
        //       helperText={error?.message}
        //       margin="normal"
        //       inputProps={{
        //         ...params.inputProps,
        //       }}
        //     />
        //   )}
        // />
      )}
    />
  );
}
