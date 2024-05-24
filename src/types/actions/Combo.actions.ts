export const LOADCOMBO = "LOADCOMBO";

export interface loadComboBox {
  type: typeof LOADCOMBO;
  payload: string | null;
}

export type ComboBoxType = loadComboBox;
