import * as React from "react";

import Typography from "@mui/material/Typography";
import { IGoal } from "src/@types/goal";

import { Divider, Stack, Button } from "@mui/material";
import { fDateTime } from "src/utils/dateutils";

export default function SelectedGoalHeader({
  goal,
  onUpdate,
}: {
  goal: IGoal;
  onUpdate: () => void;
}) {
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Typography variant="h4">{goal?.title}</Typography>
          <Typography variant="caption">{`Schedule: ${fDateTime(
            goal?.schedule
          )}`}</Typography>
        </Stack>
        <Button size="small" variant="contained" onClick={onUpdate}>
          Update
        </Button>
      </Stack>

      <Divider />
      <Typography
        dangerouslySetInnerHTML={{
          __html: `${goal?.description}`,
        }}
      />
    </Stack>
  );
}
