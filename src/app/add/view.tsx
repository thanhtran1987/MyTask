"use client";

import React from "react";
import { Provider } from "react-redux";

import AddTask from "@/components/AddTask";

import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

export default class View extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AddTask />
        </PersistGate>
      </Provider>
    );
  }
}
