"use client";
import React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import ButtonGroup from "@mui/material/ButtonGroup";
import { connect } from "react-redux";

import styles from "./Setting.module.scss";
import { RootState } from "@/store";
import { changeTheme, changeLayOut } from "@/store/reducer";
import SettingTheme from "./SettingTheme";
import SettingLayout from "./SettingLayout";

import { IConfig } from "@/helper/configs";

interface MyComponentProps {
  pageTheme: string;
  pageLayOut: string;
  changeTheme: (data: string) => void;
  changeLayOut: (data: string) => void;
  config: IConfig;
}

class Setting extends React.PureComponent<MyComponentProps> {
  constructor(props: MyComponentProps) {
    super(props);
  }

  pageThemeList: string[] = this.props.config.pageTheme;
  pageLayOutList: string[] = this.props.config.pageLayOut;

  render() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>(WIP) Demo of server side rendering</h1>
        <div className={styles.settingOptions}>
          <FormControl>
            <FormLabel>Page Theme:</FormLabel>
            <ButtonGroup variant="contained" aria-label="Page Size:">
              {this.pageThemeList.map((item: string) => (
                <SettingTheme
                  key={item}
                  value={item}
                  current={this.props.pageTheme}
                  handleChange={this.props.changeTheme}
                />
              ))}
            </ButtonGroup>
          </FormControl>
        </div>
        <div className={styles.settingOptions}>
          <FormControl>
            <FormLabel>Task Layout:</FormLabel>
            <ButtonGroup variant="contained" aria-label="Recruit Layout:">
              {this.pageLayOutList.map((item: string) => (
                <SettingLayout
                  key={item}
                  value={item}
                  current={this.props.pageLayOut}
                  handleChange={this.props.changeLayOut}
                />
              ))}
            </ButtonGroup>
          </FormControl>
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    pageTheme: state.pageTheme,
    pageLayOut: state.pageLayOut,
  };
};
export default connect(mapStateToProps, {
  changeTheme,
  changeLayOut,
})(Setting);
