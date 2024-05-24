import { Dispatch } from "react";

import { AppActions } from "types";

import { LOADCOMBOWS } from "types/actions/ComboWS.actions";

export const LoadComboWS = (ComboValueWS: string) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(setcomboWS(ComboValueWS));
        var d = new Date();
        d.setMonth(d.getMonth() + 3);
        document.cookie = `selectedWorkspace=${ComboValueWS};expires=${d.toUTCString()};Path=/`;
    };
};

export const setcomboWS = (ComboValueWS: string | null): AppActions => ({
    type: LOADCOMBOWS,
    payload: ComboValueWS,
});