export const LOADCOMBOWS = "LOADCOMBOWS";

export interface loadComboBoxWS {
    type: typeof LOADCOMBOWS;
    payload: string | null;
}

export type ComboBoxWSType = loadComboBoxWS;
