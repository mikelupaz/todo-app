import { Stack, Button } from "@mui/material";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, RichTextEditor } from "src/components/Form";

import { CommentSchema } from "./helper";
import { addComment, updateComment } from "src/hooks/useComment";
import { IComment, ICommentForm } from "src/@types/comment";

export default function CommentForm({
  goalId,
  onSuccess,
  onCancel,
  initialData,
}: {
  goalId: number;
  onSuccess: () => void;
  onCancel?: () => void;
  initialData?: IComment;
}) {
  const methods = useForm<ICommentForm>({
    resolver: yupResolver(CommentSchema),
    defaultValues: initialData,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: ICommentForm) => {
    if (initialData?.id) {
      const response = await updateComment({
        ...data,
      });
      if (!response?.isError) {
        onSuccess();
      }
    } else {
      const response = await addComment({
        ...data,
        goalId: goalId,
        createdAt: new Date(),
      });
      if (!response?.isError) {
        reset();
        onSuccess();
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RichTextEditor name="remark" />
        <Stack
          direction={"row"}
          display="flex"
          alignSelf="self-end"
          columnGap={2}
        >
          {initialData?.id ? (
            <Button variant="contained" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          ) : null}
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
