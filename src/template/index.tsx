import * as React from "react";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Header from "src/components/Header";
import { Container } from "@mui/material";

export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth={"lg"}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 5,
          py: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
