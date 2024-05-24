import {Dispatch} from "redux";
import {AppActions} from "../../types";
import {fetchError, fetchStart, fetchSuccess} from "./Common";
import jwtAxios from "../../app/services/auth/jwt-auth/jwt-api";

export const loadWorkspace = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        try {
            const res = await jwtAxios.get("cs-workspace/get-workspaces");
            const workspaces = res.data.reverse();
            dispatch(fetchSuccess());

            dispatch({
                type: "GET_WORKSPACE",
                workspaceslist: workspaces,
            });
        } catch (err:any) {

            if (
                err.response.data.status !== 491 &&
                err.response.data.status !== 490
            ) {
                dispatch(fetchStart());
                dispatch(
                    fetchError(
                        `  ${err.response.data.status} occurred, please contact your administrator.(workspace)` as string
                    )
                );
            }
        }
    };
};