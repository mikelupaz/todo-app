import * as Yup from "yup";

export const GoalSchema = Yup.object({
  title: Yup.string().required("Required"),
  schedule: Yup.date()
    .required("Required")
    .min(new Date(), "Schedule must not be a previous date")
    .typeError("Invalid Date format"),
  description: Yup.string().required("Required"),
});
