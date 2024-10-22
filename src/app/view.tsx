"use client";

import React from "react";
import { Provider } from "react-redux";

import TaskList from "@/components/TaskList";

import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { ITask } from "@/models/Tasks";

interface MyComponentProps {
  taskList: ITask[];
}

export default class View extends React.PureComponent<MyComponentProps> {
  constructor(props: MyComponentProps) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TaskList taskList={this.props.taskList} />
        </PersistGate>
      </Provider>
    );
  }
}
