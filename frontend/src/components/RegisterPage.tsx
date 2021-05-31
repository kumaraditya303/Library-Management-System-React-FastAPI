import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { RootState } from "../store";
import { authRegister } from "../store/actions/auth";

const RegisterPage = () => {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const authenticated =
    useSelector((state: RootState) => state.auth.token) !== null;
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const useStyles = makeStyles((theme) => ({
    box: {
      minHeight: "100vh",
      maxWidth: "40%",
      margin: "auto",
      [theme.breakpoints.down("md")]: {
        maxWidth: "auto",
        margin: "auto",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyles();
  if (authenticated) {
    return <Redirect to={(state as any)?.from || "/"} />;
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.box}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(authRegister(name, email, password));
          }}
          autoComplete={"off"}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <AccountCircle style={{ fontSize: 100 }} />
                <Typography variant="h6">Create new Account</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                color="secondary"
                label="Name"
                type="text"
                name="name"
                size="small"
                variant="outlined"
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={!!error}
                color="secondary"
                label="Email"
                type="email"
                name="email"
                size="small"
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={!!error}
                color="secondary"
                label="Password"
                name="password"
                size="small"
                type="password"
                variant="outlined"
                onChange={(event) => setPassword(event.target.value)}
                inputProps={{
                  minLength: 8,
                }}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                fullWidth
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default RegisterPage;
