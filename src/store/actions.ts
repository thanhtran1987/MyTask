import { ITask } from "@/models/Tasks";

export interface IChangeTheme {
  type: string;
  payload: string;
}
export interface IChangeLayOut {
  type: string;
  payload: string;
}
export interface IPayLoadNumber {
  type: string;
  payload: number;
}
export interface IMemberAdd {
  type: string;
  payload: ITask;
}
export enum ActionTypes {
  PAGINATION_CHANGE = "paginationChange",
}

export type SettingState = {
  pageTheme: string;
  pageLayOut: string;
  taskList: ITask[];
};

export type Action = IChangeTheme | IChangeLayOut | IPayLoadNumber;
