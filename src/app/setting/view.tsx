"use client";

import React from "react";
import { Provider } from "react-redux";

import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

import Setting from "@/components/Setting";
import { IConfig } from "@/helper/configs";

interface MyComponentProps {
  config: IConfig;
}

export default class View extends React.PureComponent<MyComponentProps> {
  constructor(props: MyComponentProps) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Setting config={this.props.config} />
        </PersistGate>
      </Provider>
    );
  }
}
