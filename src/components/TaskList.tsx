"use client";

import React from "react";
import { connect } from "react-redux";

import { RootState } from "@/store";
import ListItem from "@/components/ListItem";
import { ITask } from "@/models/Tasks";
import styles from "./TaskList.module.scss";

interface Props {
  taskList: ITask[];
  pageLayOut: String;
}

type MyState = {
  taskList: ITask[];
};

class TaskList extends React.PureComponent<Props, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskList: props.taskList,
    };
  }

  handleDelete = (data: String) => {
    const newList = this.state.taskList.filter((item) => {
      return item._id !== data;
    });
    this.setState({ taskList: newList });
  };
  handleEdit = (data: ITask) => {
    const newList = this.state.taskList.map((item) => {
      if (data.id === item._id) {
        item.name = data.name;
        item.description = data.description;
      }
      return item;
    });
    this.setState({ taskList: newList });
  };

  render() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>You have this many task: {this.state.taskList.length}</h1>
        <ul className={styles.taskList}>
          {this.state.taskList.map((item: ITask) => (
            <ListItem
              key={item._id?.toString()}
              name={item.name}
              ownerID={item.ownerID}
              id={item._id}
              status={item.status}
              description={item.description}
              notifyDelete={this.handleDelete}
              notifyEdit={this.handleEdit}
              pageLayOut={this.props.pageLayOut}
            />
          ))}
        </ul>
      </main>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    pageLayOut: state.pageLayOut,
  };
};

export default connect(mapStateToProps, {})(TaskList);
