import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router";
import { RootState } from "../store";
import { authLogin } from "../store/actions/auth";

const LoginPage = () => {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const authenticated =
    useSelector((state: RootState) => state.auth.token) !== null;
  const { state } = useLocation();
  const dispatch = useDispatch();
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
        className={classes.box}
        justifyContent="center"
        alignItems="center"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(authLogin(email, password));
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
                <Typography variant="h6">Login to your Account</Typography>
              </Grid>
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
                Login
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

export default LoginPage;
