export interface IGoal {
  id: number;
  title: string;
  description?: string;
  schedule: Date;
  author: number;
}

export interface IGoalForm {
  id?: number;
  title: string;
  description?: string;
  schedule: Date | null;
  author: number;
  userId: number;
}
