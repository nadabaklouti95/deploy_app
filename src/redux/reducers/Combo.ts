import { LOADCOMBO } from "types/actions/Combo.actions";
import { Icombo } from "types/models/Combo";
import { AppActions } from "../../types";

const INIT_STATE: Icombo = {
  selectedCombo: "",
};

const Combo = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case LOADCOMBO: {
      return {
        ...state,
        selectedCombo: action.payload,
      };
    }

    default:
      return state;
  }
};
export default Combo;
