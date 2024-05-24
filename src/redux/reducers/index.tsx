import Settings from "./Setting";
import CommonReducer from "./CommonReducer";
import Auth from "./Auth";
import StoreReducer from "./Store";
import Combo from "./Combo";
import StoreInfosReducer from "./StoresInfos";
import auditReducer from "./audit";
import WorkspaceReducer from "./Workspace";
import ComboWS from "./ComboWS";

const reducers = {
  settings: Settings,
  auth: Auth,
  common: CommonReducer,
  stores: StoreReducer,
  combo: Combo,
  workspaces: WorkspaceReducer,
  comboWS: ComboWS,
  storesInfo: StoreInfosReducer,
  audit: auditReducer
};

export default reducers;
