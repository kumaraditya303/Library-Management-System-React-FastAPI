import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AuthActionType } from "../actionTypes";
import { AuthState, User } from "../reducers/auth";
const authStart = () => {
  return {
    type: AuthActionType.AUTH_START,
  };
};
const authSuccess = (token: string, user: User) => {
  return {
    type: AuthActionType.AUTH_SUCCESS,
    token: token,
    user: user,
  };
};
const authError = (error: string) => {
  return {
    type: AuthActionType.AUTH_FAIL,
    error: error,
  };
};
export const authLogin = (email: string, password: string) => {
  return (dispatch: ThunkDispatch<AuthState, void, AnyAction>) => {
    dispatch(authStart());
    axios
      .post("/api/login/", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.access_token as string;
        localStorage.setItem("token", token);
        axios
          .get("/api/me/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(authSuccess(token, res.data));
          });
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.detail));
      });
  };
};

export const authRegister = (name: string, email: string, password: string) => {
  return (dispatch: ThunkDispatch<AuthState, void, AnyAction>) => {
    dispatch(authStart());
    axios
      .post("/api/register/", {
        name,
        email,
        password,
      })
      .then((response) => {
        const token = response.data.access_token as string;
        localStorage.setItem("token", token);
        axios
          .get("/api/me/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(authSuccess(token, res.data));
          });
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.detail));
      });
  };
};

export const authLogout = () => {
  return (dispatch: ThunkDispatch<AuthState, void, AnyAction>) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: AuthActionType.AUTH_LOGOUT });
  };
};
