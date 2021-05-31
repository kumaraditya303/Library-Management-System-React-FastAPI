import { AuthActionType } from "../actionTypes";

export type User = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  issued_books: any[];
};

export type AuthState = {
  token: string | null;
  error: string | null;
  loading: boolean;
  user: User | null;
};

export type AuthAction = AuthState & {
  type: AuthActionType;
};

const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
  user: null,
};

const reducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.AUTH_START:
      return { ...state, error: null, loading: true };
    case AuthActionType.AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        token: action.token,
        error: null,
        loading: false,
      };
    case AuthActionType.AUTH_FAIL:
      return { ...state, error: action.error, loading: false };
    case AuthActionType.AUTH_LOGOUT:
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};

export default reducer;
