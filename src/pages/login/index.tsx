import { Stack } from "@mui/material";
import LoginForm from "src/@sections/login";
import MainTemplate from "src/template";

const LoginPage = () => (
  <Stack
    maxWidth={"sm"}
    justifyContent={"center"}
    display="flex"
    alignSelf={"center"}
    flex={1}
  >
    <LoginForm />
  </Stack>
);

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainTemplate>{page}</MainTemplate>;
};

export default LoginPage;
