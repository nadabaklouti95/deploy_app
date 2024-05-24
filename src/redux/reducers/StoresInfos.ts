import {} from "types/actions/Combo.actions";
import { GET_STORE_INFOS } from "types/actions/Store.actions";
import { GetStoresInfosType } from "types/actions/StoresInfos.actions";

import { AppActions } from "../../types";

const INIT_STATE: GetStoresInfosType = {
  storeslistinfos: [],
  // storelistsinfos:{
  //     date: "2021-09-15T12:17:52.471Z",
  //     id: -1,
  //     name: "",
  //     operation: "",
  //     sourceId: -1,
  //     type: "",
  //     userFirtName: "",
  //     userId: -1,
  //     userLastName: "",
  //     version: -1,

  // }
};

const StoreInfosReducer = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case GET_STORE_INFOS: {
      return {
        ...state,
        storeslistinfos: action.storelistsinfos,
      };
    }

    default:
      return state;
  }
};
export default StoreInfosReducer;
