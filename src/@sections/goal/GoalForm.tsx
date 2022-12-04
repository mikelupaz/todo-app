import { Stack, Button, Box, Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

import {
  DatePicker,
  FormProvider,
  RichTextEditor,
  TextField,
} from "src/components/Form";

import { IGoal, IGoalForm } from "src/@types/goal";
import { addGoal, updateGoal } from "src/hooks/useGoal";

import { GoalSchema } from "./helper";
import { useUser } from "src/hooks/useLogin";

export default function GoalForm({
  title,
  initialData,
  onClose,
  onSuccess,
}: {
  title?: string;
  initialData?: IGoal | null;
  onClose?: () => void;
  onSuccess?: (x: IGoal) => void;
}) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data: user } = useUser();

  const methods = useForm<IGoalForm>({
    resolver: yupResolver(GoalSchema),
    defaultValues: {
      id: initialData?.id,
      title: initialData?.title || "",
      schedule: initialData?.schedule || null,
      description: initialData?.description || "",
      userId: user?.id,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: IGoalForm) => {
    if (Boolean(data?.id)) {
      const response = await updateGoal(data);
      if (!response?.isError) {
        enqueueSnackbar("Updated Goal Successfully!");
        if (onSuccess) {
          onSuccess(response?.data);
        }
      }
    } else {
      const response = await addGoal(data);
      if (!response?.isError) {
        enqueueSnackbar("New Goal Successfully Added!");
        push("/goal");
      }
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }

    push("/goal");
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ my: 2 }}>
        {title || "Add New Goal"}
      </Typography>

      <Stack spacing={2}>
        <TextField label="Title" name="title" />
        <DatePicker label="Schedule" name="schedule" minDate={Date.now()} />

        <RichTextEditor label="Description" name="description" />
        <Box flexDirection={"row"} display="flex" columnGap={2}>
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" fullWidth>
            Save
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
}
