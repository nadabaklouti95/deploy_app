import { CommonActionTypes } from "./actions/Common.action";
import { SettingsActionTypes } from "./actions/Settings.action";
import { AuthActions } from "./actions/Auth.actions";
import { StoreType } from "./actions/Store.actions";
import { ComboBoxType } from "./actions/Combo.actions";
import { loadstoreinfosType } from "./actions/StoresInfos.actions";
import { AUDIT_ACTION } from "./actions/audit.actions";
import { WorkspaceType } from "./actions/Workspace.actions";
import { ComboBoxWSType } from "./actions/ComboWS.actions";

export type AppActions =
  | StoreType
  | WorkspaceType
  | CommonActionTypes
  | SettingsActionTypes
  | AuthActions
  | ComboBoxType
  | ComboBoxWSType
  | loadstoreinfosType
  | AUDIT_ACTION;
