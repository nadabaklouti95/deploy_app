import { Icombo } from "types/models/Combo";
import { AppActions } from "../../types";
import {LOADCOMBOWS} from "../../types/actions/ComboWS.actions";

const INIT_STATE: Icombo = {
    selectedCombo: "",
};

const ComboWS = (state = INIT_STATE, action: AppActions) => {
    switch (action.type) {
        case LOADCOMBOWS: {
            return {
                ...state,
                selectedComboWS: action.payload,
            };
        }

        default:
            return state;
    }
};
export default ComboWS;
