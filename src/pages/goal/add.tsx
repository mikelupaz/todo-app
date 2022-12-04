import { Stack } from "@mui/material";
import GoalForm from "src/@sections/goal/GoalForm";

import MainTemplate from "src/template";

const LoginPage = () => (
  <Stack
    maxWidth={"sm"}
    justifyContent={"center"}
    display="flex"
    alignSelf={"center"}
    flex={1}
  >
    <GoalForm />
  </Stack>
);

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainTemplate>{page}</MainTemplate>;
};

export default LoginPage;
