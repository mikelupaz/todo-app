import { useFormContext, Controller } from "react-hook-form";

import { Typography } from "@mui/material";

import Editor, { Props as EditorProps } from "src/components/RichEditor";

interface Props extends EditorProps {
  name: string;
}

export default function RHFEditor({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          id={name}
          value={field.value}
          onChange={field.onChange}
          error={Boolean(error)}
          helperText={
            error ? (
              <Typography variant="caption" color="error">
                {error?.message}
              </Typography>
            ) : null
          }
          {...other}
        />
      )}
    />
  );
}
