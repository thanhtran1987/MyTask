import React from "react";
import Button from "@mui/material/Button";

import { ITask, ITaskPut, TaskStatus } from "@/models/Tasks";
import { APIMethod } from "@/helper/data";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";

import DoneIcon from "@mui/icons-material/Done";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
}));

interface MyState extends ITask {
  toggle: boolean;
}

interface MyComponentProps extends ITask {
  notifyDelete: (data: String) => void;
  notifyEdit: (data: ITask) => void;
  pageLayOut: String;
}

export default class ListItem extends React.PureComponent<
  MyComponentProps,
  MyState
> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      status: props.status,
      name: props.name?.toString() || "",
      description: props.description?.toString() || "",
      toggle: false,
    };
  }
  showEdit = (data: Boolean) => {
    return (
      <div>
        <Modal
          open={this.state.toggle}
          onClose={() => {
            this.setState({ toggle: false });
          }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              bgcolor: "#fff",
              m: 3,
              p: 3,
            }}
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
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "flex-end",
              }}
              mt={3}
            >
              <Button
                variant="contained"
                onClick={() => {
                  this.handleEdit();
                }}
              >
                <EditIcon /> Save
              </Button>
            </Stack>
          </Box>
        </Modal>
        <h2>{this.props.name}</h2>
        <p>{this.props.description}</p>
      </div>
    );
  };
  showCTA = (data: TaskStatus) => {
    if (data === TaskStatus.STATUS_COMPLETE) {
      return (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
          }}
          onClick={() => {
            this.handlePending();
          }}
        >
          <DoneIcon /> Completed
        </Stack>
      );
    }
    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            this.handleComplete();
          }}
        >
          <DoneIcon /> Complete
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            this.handleEdit();
          }}
        >
          <EditIcon /> Edit
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            this.handleDelete();
          }}
        >
          <RemoveCircleOutlineIcon /> Delete
        </Button>
      </Stack>
    );
  };
  handleComplete = () => {
    this.updateDB(TaskStatus.STATUS_COMPLETE);
    this.setState({ status: TaskStatus.STATUS_COMPLETE });
  };
  handlePending = () => {
    this.updateDB(TaskStatus.STATUS_PENDING);
    this.setState({ status: TaskStatus.STATUS_PENDING });
  };
  handleEdit = async () => {
    if (!this.state.toggle) {
      this.setState({ toggle: true });
    } else {
      const payLoad: ITask = {
        id: this.props.id,
        name: this.state.name,
        description: this.state.description,
      };
      try {
        const res = await fetch("/api/task", {
          method: APIMethod.PUT,
          body: JSON.stringify(payLoad),
          headers: {
            "content-type": "application/json",
          },
        });

        this.setState({ toggle: false });
        this.props.notifyEdit(payLoad);
      } catch (error) {
        console.error(error);
      }
    }
  };

  setName(data: String) {
    this.setState({
      name: data,
    });
  }
  setDescription(data: String) {
    this.setState({
      description: data,
    });
  }
  handleDelete = async () => {
    const itemID = this.props.id!;
    const payLoad: { id: String } = {
      id: itemID,
    };

    try {
      const res = await fetch("/api/task", {
        method: APIMethod.DELETE,
        body: JSON.stringify(payLoad),
        headers: {
          "content-type": "application/json",
        },
      });
      this.props.notifyDelete(itemID);
      return res.json();
    } catch (error) {
      console.error(error);
    }
  };
  updateDB = async (data: TaskStatus) => {
    const payLoad: ITaskPut = {
      id: this.props.id,
      status: data,
    };
    try {
      const res = await fetch("/api/task", {
        method: APIMethod.PUT,
        body: JSON.stringify(payLoad),
        headers: {
          "content-type": "application/json",
        },
      });
      return res.json();
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    const status = this.state.status!;
    return (
      <li>
        {this.showEdit(this.state.toggle)}
        <div className="cta">{this.showCTA(status)}</div>
      </li>
    );
  }
}
