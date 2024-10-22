"use client";

import React from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import styles from "./Form.module.scss";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
}));

type MyState = { name: string; password: string };

interface PropsWithRouter {
  router: AppRouterInstance;
}

const LoginWithRouter = () => {
  const router = useRouter();
  return <Login router={router} />;
};

class Login extends React.Component<PropsWithRouter, MyState> {
  constructor(props: PropsWithRouter) {
    super(props);
    this.state = { name: "", password: "" };
  }

  async handleLogin() {
    try {
      const res = await fetch("/api/auth/ldap", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "content-type": "application/json",
        },
      });
      this.props.router.push("/");
      this.props.router.refresh();
    } catch (error) {
      console.error(error);
    }
  }
  setUsername(data: string) {
    this.setState({
      name: data,
    });
  }
  setPassword(data: string) {
    this.setState({
      password: data,
    });
  }

  render() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome to the task demo, please login to begin</h1>
        <Box
          component="form"
          sx={{ border: "1px dashed grey" }}
          className={styles.formStyle}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>
                <TextField
                  id="user"
                  label="Username"
                  variant="standard"
                  value={this.state.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setUsername(event.target.value);
                  }}
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  value={this.state.password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setPassword(event.target.value);
                  }}
                  fullWidth
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
                this.handleLogin();
              }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </main>
    );
  }
}

export default LoginWithRouter;
