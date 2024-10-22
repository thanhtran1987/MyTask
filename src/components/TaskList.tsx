"use client";

import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
interface PropsWithRouter extends Props {
  router: AppRouterInstance;
}

const TaskListWithRouter = (props: any, state: any) => {
  const router = useRouter();
  return (
    <TaskList
      router={router}
      taskList={props.taskList}
      pageLayOut={props.pageLayOut}
    />
  );
};
class TaskList extends React.PureComponent<PropsWithRouter, MyState> {
  constructor(props: PropsWithRouter) {
    super(props);
    this.state = {
      taskList: props.taskList,
    };
  }

  showCTA = () => {
    if (this.state.taskList.length < 1) {
      return (
        <div
          onClick={() => {
            this.props.router.push("/add");
            this.props.router.refresh();
          }}
        >
          <h1>You don&apos;t have any task, click here to add some task</h1>
          <p>Only you can view, edit, complete and delete your tasks</p>
        </div>
      );
    }
  };
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
        {this.showCTA()}
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

export default connect(mapStateToProps, {})(TaskListWithRouter);
