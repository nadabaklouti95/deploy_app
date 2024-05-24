// import { AppActions } from "types";
// import { GET_STORE_INFOS } from "types/actions/Store.actions";

import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import { Dispatch } from "redux";
import { AppActions } from "types";
import { GET_STORE_INFOS } from "types/actions/Store.actions";
import { fetchError, fetchStart, fetchSuccess } from ".";

// export const getStoreInfos = (storelistsinfos: any | null): AppActions => ({
//   type: GET_STORE_INFOS,
//   storelistsinfos,
// });

export const loadStoreInfos = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.get(
        "cs-store-audit/find-all-stores-audit-creation-infos"
      );
      const stores = res.data;

      dispatch(fetchSuccess());

      dispatch({
        type: GET_STORE_INFOS,
        storelistsinfos: stores,
      });
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
