import * as React from "react";
import List from "@mui/material/List";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, Stack } from "@mui/material";
import { IComment } from "src/@types/comment";
import { fDateTime } from "src/utils/dateutils";

import EditIcon from "@mui/icons-material/Edit";
import CommentForm from "./CommentForm";

export default function CommentList({
  comments,
  onDelete,
  onUpdate,
}: {
  comments: IComment[];
  onDelete: (id: number) => void;
  onUpdate: () => void;
}) {
  const [update, setUpdate] = React.useState<IComment | null>(null);

  const handleUpdate = () => {
    onUpdate();
    setUpdate(null);
  };
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {comments?.map((comment) =>
        update?.id === comment?.id ? (
          <Stack
            direction="column"
            key={`comment-list-${comment?.id}`}
            sx={{ mt: 2 }}
          >
            <CommentForm
              goalId={comment?.goalId}
              initialData={update}
              onCancel={() => setUpdate(null)}
              onSuccess={handleUpdate}
            />
          </Stack>
        ) : (
          <Stack key={`comment-list-${comment?.id}`}>
            <Typography
              dangerouslySetInnerHTML={{
                __html: comment?.remark,
              }}
            />

            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="caption">
                {fDateTime(comment?.createdAt)}
              </Typography>
              <Stack direction="row">
                <IconButton size="small" onClick={() => setUpdate(comment)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(comment?.id)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />
          </Stack>
        )
      )}
    </List>
  );
}
