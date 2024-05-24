import { Dispatch } from "react";

import { AppActions } from "types";

import { LOADCOMBO } from "types/actions/Combo.actions";

export const LoadCombo = (ComboValue: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(setcombo(ComboValue));
    var d = new Date();
    d.setMonth(d.getMonth() + 3);
    document.cookie = `selectedStore=${ComboValue};expires=${d.toUTCString()};Path=/`;
  };
};

export const setcombo = (ComboValue: string | null): AppActions => ({
  type: LOADCOMBO,
  payload: ComboValue,
});

// export const Verifiedcoockie = (coockieValue: string) => {
//   const cookieName = "selectedStore";
//   const initialValue = document.cookie
//     .split("; ")
//     .reduce(
//       (acc, cur) =>
//         cur.split("=")[0] === cookieName ? `${acc}${cur.split("=")[1]}` : acc,
//       ""
//     );
//   if (coockieValue !== initialValue) {
//     return;
//   }
// };
