import {
  GET_STORE,
  GetStoresStateType,
} from "../../types/actions/Store.actions";
import { AppActions } from "../../types";

const INIT_STATE: GetStoresStateType = {
  storeslist: [],
};
const StoreReducer = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case GET_STORE: {
      return {
        ...state,
        storeslist: action.storeslist,
      };
    }

    default:
      return state;
  }
};

export default StoreReducer;
