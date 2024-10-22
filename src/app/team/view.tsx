"use client";

import React from "react";
import { Provider } from "react-redux";

import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

export default class View extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <h1>(WIP) demo of shared task between users</h1>
          <ul>
            <li>
              Team task will have a check out workflow to prevent two people
              from editing the same task
            </li>
            <li>Task can be viewed by any team members</li>
            <li>Users can only see task for teams they belong to</li>
          </ul>
        </PersistGate>
      </Provider>
    );
  }
}
