import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { authLogout } from "../store/actions/auth";
export default function HomepageAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state: RootState) => state.auth.user);
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  }));
  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          {user ? `Welcome ${user.name}` : "Library Management System"}
        </Typography>
        {user ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Button onClick={() => dispatch(authLogout())}>Logout</Button>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Button component={Link} to={"/"}>
              Home
            </Button>
            <Button component={Link} to={"/login/"}>
              Login
            </Button>
            <Button component={Link} to={"/register/"}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
