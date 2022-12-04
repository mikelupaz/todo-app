import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().required("Required").email("Please enter a valid email"),
  password: Yup.string().required("Required"),
});
