import * as Yup from "yup";

export const CommentSchema = Yup.object({
  remark: Yup.string().required("Required"),
});
