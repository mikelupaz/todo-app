import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { IGoal } from "src/@types/goal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, ListItemButton } from "@mui/material";

export default function GoalList({
  goals,
  onSelectGoal,
  onDeleteGoal,
  selected,
}: {
  goals: IGoal[];
  onSelectGoal: (selected: IGoal) => void;
  onDeleteGoal: (id: number) => void;
  selected: IGoal | null;
}) {
  const handleDelete = (id: number) => {
    onDeleteGoal(id);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {goals?.map((goal) => (
        <>
          <ListItem
            key={`goal-list-${goal?.id}`}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => {
                  handleDelete(goal?.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              onClick={() => onSelectGoal(goal)}
              dense
              selected={Number(selected?.id) === Number(goal.id)}
            >
              <ListItemText
                primary={goal?.title}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={
                  <Typography
                    variant="caption"
                    dangerouslySetInnerHTML={{
                      __html: `${goal?.description}`,
                    }}
                  />
                }
              />
            </ListItemButton>
          </ListItem>

          <Divider />
        </>
      ))}
    </List>
  );
}
