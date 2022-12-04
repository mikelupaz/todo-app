import { ReactNode } from "react";
import { ReactQuillProps } from "react-quill";

import dynamic from "next/dynamic";

import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        bgcolor: "background.paper",
      }}
    >
      Loading...
    </Box>
  ),
});

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,

  "& .ql-container.ql-snow": {
    height: "auto",
    borderColor: "transparent",
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  "& .ql-editor": {
    wordBreak: "break-word",
    "&.ql-blank::before": {
      fontStyle: "normal",
      color: theme.palette.text.disabled,
    },
    "& pre.ql-syntax": {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
  "& .quill": {
    minHeight: "150px",
    maxHeight: "225px" || "80vh",
    overflowY: "scroll",
  },
}));

export interface Props extends ReactQuillProps {
  label?: string;
  id?: string;
  error?: boolean;
  helperText?: ReactNode;
  maxHeight?: string;
  height?: string;
}

export default function Editor({
  id = "minimal-quill",
  label,
  error,
  value,
  onChange,
  helperText,
  placeholder,
  ...other
}: Props) {
  return (
    <Box>
      <Typography
        sx={{
          ...(error && {
            color: (theme) => theme.palette.error.main,
          }),
        }}
      >
        {label}
      </Typography>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
        }}
      >
        <ReactQuill
          value={value}
          onChange={onChange}
          theme={"snow"}
          placeholder={"Write something awesome..." || placeholder}
          {...other}
        />
      </RootStyle>
      {helperText ? (
        <Typography variant="caption" color="error" padding={"0px 10px"}>
          {helperText}
        </Typography>
      ) : null}
    </Box>
  );
}
