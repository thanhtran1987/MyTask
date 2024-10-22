"use client";

import React from "react";
import { connect } from "react-redux";

import styles from "./Form.module.scss";
import { RootState } from "@/store";
import { ITask, TaskStatus } from "@/models/Tasks";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
}));

interface MyComponentProps {
  pageLayOut: string;
}

class AddTask extends React.Component<MyComponentProps, ITask> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }

  async handleAdd() {
    try {
      const res = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "content-type": "application/json",
        },
      });
      return res.json();
    } catch (error) {
      console.error(error);
    }
  }
  setName(data: string) {
    this.setState({
      name: data,
    });
  }
  setDescription(data: string) {
    this.setState({
      description: data,
    });
  }

  render() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Box
          component="form"
          sx={{ border: "1px dashed grey" }}
          className={styles.formStyle}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>
                <TextField
                  id="name"
                  label="Task Name"
                  variant="standard"
                  fullWidth
                  value={this.state.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setName(event.target.value);
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <TextField
                  id="description"
                  label="Task Desciption"
                  variant="standard"
                  fullWidth
                  value={this.state.description}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setDescription(event.target.value);
                  }}
                />
              </Item>
            </Grid>
          </Grid>

          <Stack
            spacing={2}
            direction="row"
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                this.handleAdd();
              }}
            >
              Add Task
            </Button>
          </Stack>
        </Box>
      </main>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    pageLayOut: state.pageLayOut,
  };
};

export default connect(mapStateToProps, {})(AddTask);
