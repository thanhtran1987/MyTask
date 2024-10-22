"use client";
import React from "react";
import Button from "@mui/material/Button";

interface MyComponentProps {
  handleChange: (data: string) => void;
  current: string;
  value: string;
}

export default class SettingLayout extends React.PureComponent<MyComponentProps> {
  constructor(props: MyComponentProps) {
    super(props);
  }
  isActive = (data: string) => {
    if (this.props.current === data) {
      return "contained";
    }
    return "outlined";
  };
  render() {
    return (
      <Button
        variant={this.isActive(this.props.value)}
        onClick={() => {
          this.props.handleChange(this.props.value);
        }}
      >
        {this.props.value}
      </Button>
    );
  }
}
