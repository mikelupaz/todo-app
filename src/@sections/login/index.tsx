import { Stack, Button } from "@mui/material";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, TextField } from "src/components/Form";

import { LoginFormType } from "src/@types/login";
import { LoginSchema } from "./helper";
import { loginUser } from "src/hooks/useLogin";
import { setLoggedUser } from "src/utils/session";

export default function LoginForm() {
  const { push } = useRouter();

  const methods = useForm<LoginFormType>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "mikel@email.com",
      password: "user1",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginFormType) => {
    const response = await loginUser(data);
    if (response?.data?.length > 0) {
      setLoggedUser(response?.data?.[0]);
      push("/goal");
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField label="Email" name="email" />
        <TextField label="Password" name="password" type="password" />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </FormProvider>
  );
}
