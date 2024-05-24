import jwtAxios from "../../app/services/auth/jwt-auth/jwt-api";
import { fetchError, fetchStart, fetchSuccess } from "./Common";
import { AuthType } from "../../shared/constants/AppEnums";
import { defaultUser } from "../../shared/constants/AppConst";
import { AuthUser } from "../../types/models/AuthUser";
import { AppActions } from "../../types";
import { Dispatch } from "redux";
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
} from "../../types/actions/Auth.actions";

export const onJwtUserSignUp = (body: {
  username: string;
  password: string;
  rememberMe: Boolean;
}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post("users", body);

      localStorage.setItem("token", res.data.id_token);
      dispatch(setJWTToken(res.data.token));
      await loadJWTUser(dispatch);
    } catch (err:any) {
      if (
          err.response.data.status !== 491 &&
          err.response.data.status !== 490
      ) {
        dispatch(fetchStart());
        dispatch(
            fetchError(
                `  ${err.response.data.status} occurred, please contact your administrator.` as string
            )
        );
      }
    }
  };
};

export const onJwtSignIn = (body: {
  username: string;
  password: string;
  rememberMe: boolean;
}) => {
  return async (dispatch: Dispatch<AppActions>): Promise<any> => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post("authenticate", body)
      
      localStorage.setItem("token", res.data.id_token);
      dispatch(setJWTToken(res.data.id_token));
      await loadJWTUser(dispatch);
      return res.data.id_token;
    } catch (err:any) {
      if (
          err.response.data.status !== 491 &&
          err.response.data.status !== 490
      ) {
        dispatch(fetchStart());
        dispatch(
            fetchError(
                `  ${err.response.data.status} occurred, please contact your administrator.` as string
            )
        );
      }
    }
  };
};

export const loadJWTUser = async (dispatch: Dispatch<AppActions>) => {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get("/authenticate");
    dispatch(fetchSuccess());

    dispatch({
      type: UPDATE_AUTH_USER,
      payload: getUserObject(res.data),
    });
  } catch (err:any) {
    if (err.response.data.status !== 491 || err.response.data.status !== 490) {
      dispatch(fetchStart());
      dispatch(
          fetchError(
              `  ${err.response.data.status} occurred, please contact your administrator.` as string
          )
      );
    }
  }
};

export const setJWTToken = (id_token: string | null): AppActions => ({
  type: SET_AUTH_TOKEN,
  payload: id_token,
});

const getUserObject = (authUser: any): AuthUser => {
  return {
    authType: AuthType.JWT_AUTH,
    displayName: authUser.name,
    email: authUser.email,
    role: defaultUser.role,
    token: authUser._id,
    uid: authUser._id,
    photoURL: authUser.avatar,
  };
};

export const onJWTAuthSignout = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchSuccess());
    setTimeout(() => {
      dispatch({ type: SIGNOUT_AUTH_SUCCESS });
      dispatch(fetchSuccess());
      localStorage.removeItem("token");
      localStorage.removeItem("accessRules");
    }, 500);
  };
};
