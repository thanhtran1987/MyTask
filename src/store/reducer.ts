import { createSlice } from "@reduxjs/toolkit";
import {
  IChangeTheme,
  IChangeLayOut,
  SettingState,
  IMemberAdd,
} from "./actions";
import { ITask } from "@/models/Tasks";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    taskList: [],
    pageTheme: "default",
    pageLayOut: "hero",
  },
  reducers: {
    changeTheme: (state: SettingState, action: IChangeTheme) => {
      state.pageTheme = action.payload;
    },
    changeLayOut: (state: SettingState, action: IChangeLayOut) => {
      state.pageLayOut = action.payload;
    },
    memberAdd: (state: SettingState, action: IMemberAdd) => {
      state.taskList.push(action.payload);
    },
    memberRemove: (state: SettingState, action: IChangeTheme) => {
      state.taskList = state.taskList.filter(
        (item: ITask) => item.id !== action.payload
      );
    },
  },
});

const { actions, reducer } = settingSlice;
export const { changeTheme, changeLayOut, memberAdd, memberRemove } = actions;
export default reducer;
