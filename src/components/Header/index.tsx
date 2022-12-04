import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { Button } from "@mui/material";
import Router from "next/router";
import { useUser } from "src/hooks/useLogin";
import { setLoggedUser } from "src/utils/session";

export default function Header() {
  const { data } = useUser();
  const handleLogout = () => {
    setLoggedUser(null);
    Router.push("/login");
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box display="flex" justifyContent={"flex-end"} width={"100%"}>
          {data?.id ? (
            <Button
              onClick={handleLogout}
              sx={{ color: (theme) => theme.palette.grey[100] }}
            >
              Logout
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
