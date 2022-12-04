import { Grid, Typography, Box, Stack, Tabs, Tab } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import Button from "@mui/material/Button";

import { useState } from "react";

import GoalList from "src/@sections/goal/list";
import SelectedGoalHeader from "src/@sections/goal/selectedGoalHeader";
import { IGoal } from "src/@types/goal";
import { deleteGoal, useGoals } from "src/hooks/useGoal";

import MainTemplate from "src/template";
import DialogBox from "src/components/DialogBox";
import { useRouter } from "next/router";
import GoalForm from "src/@sections/goal/GoalForm";
import CommentForm from "src/@sections/comment/CommentForm";
import CommentList from "src/@sections/comment/list";
import { useComments, deleteComment } from "src/hooks/useComment";
import { useUser } from "src/hooks/useLogin";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const GoalPage = () => {
  const [selectedGoal, setSelectedGoal] = useState<IGoal | null>(null);
  const [confirm, setConfirm] = useState<number | null>(null);
  const [update, setUpdate] = useState(false);
  const [updateComment, setUpdateComment] = useState(null);
  const { data: user } = useUser();
  const { push } = useRouter();

  const { data: goals, mutate } = useGoals(user?.id);
  const { data: comments, mutate: mutateComment } = useComments(
    selectedGoal?.id
  );

  const handleSelectGoal = (selected: IGoal) => {
    setSelectedGoal(selected);
  };
  const handleDeleteGoal = async () => {
    if (confirm === selectedGoal?.id) {
      setSelectedGoal(null);
    }
    if (confirm) {
      const response = await deleteGoal(confirm);
      if (!response?.isError) {
        setConfirm(null);
        mutate();
      }
    }
  };
  const handleConfirmDelete = (id: number) => {
    setConfirm(id);
  };

  const handleAddNewGoal = () => {
    push("/goal/add");
  };
  const handleUpdateGoal = () => {
    setUpdate(true);
  };

  const handleUpdateSuccess = (selected: IGoal) => {
    setSelectedGoal(selected);
    setUpdate(false);
    mutate();
  };

  const handleDeleteComment = async (id: number) => {
    const response = await deleteComment(id);
    if (!response?.isError) {
      mutateComment();
    }
  };

  const handleUpdateComment = () => {
    mutateComment();
  };

  return (
    <Grid container gap={5}>
      <Grid xs={12} md={3}>
        <Button variant="contained" fullWidth onClick={handleAddNewGoal}>
          Add New Goal
        </Button>
        <GoalList
          goals={goals}
          onSelectGoal={handleSelectGoal}
          onDeleteGoal={handleConfirmDelete}
          selected={selectedGoal}
        />
      </Grid>
      <Grid xs={12} md={8}>
        {selectedGoal ? (
          <Stack rowGap={5}>
            <SelectedGoalHeader
              goal={selectedGoal}
              onUpdate={handleUpdateGoal}
            />
            <Tabs value={0}>
              <Tab label="Comments" />
            </Tabs>
            <TabPanel index={0} value={0}>
              <CommentForm
                onSuccess={() => mutateComment()}
                goalId={selectedGoal?.id}
              />
              <CommentList
                comments={comments}
                onDelete={handleDeleteComment}
                onUpdate={handleUpdateComment}
              />
            </TabPanel>
          </Stack>
        ) : (
          <Box
            display="flex"
            height="100%"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h5" sx={{ opacity: "0.6" }}>
              No Goal Selected
            </Typography>
          </Box>
        )}
      </Grid>
      <DialogBox
        open={Boolean(confirm)}
        message="Are you sure you want to delete this goal?"
        onClose={() => setConfirm(null)}
        onConfirm={handleDeleteGoal}
        title={"Confirm Deletion"}
      />
      <Dialog open={update} onClose={() => setUpdate(false)}>
        <DialogContent>
          <GoalForm
            title={"Update Goal"}
            initialData={selectedGoal}
            onClose={() => setUpdate(false)}
            onSuccess={handleUpdateSuccess}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

GoalPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainTemplate>{page}</MainTemplate>;
};

export default GoalPage;
