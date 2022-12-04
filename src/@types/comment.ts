export interface IComment {
  id: number;
  goalId: number;
  remark: string;
  author: number;
  createdAt: Date;
}

export interface ICommentForm {
  id?: number;
  goalId: number;
  remark: string;
  createdAt: Date;
  author: number;
}
