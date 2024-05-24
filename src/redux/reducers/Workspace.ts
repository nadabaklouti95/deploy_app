import {AppActions} from "../../types";
import {GET_WORKSPACE, GetWorkspacesStateType} from "../../types/actions/Workspace.actions";

const INIT_STATE: GetWorkspacesStateType = {
    workspaceslist: [],
};
const WorkspaceReducer = (state = INIT_STATE, action: AppActions) => {
    switch (action.type) {
        case GET_WORKSPACE: {
            return {
                ...state,
                workspaceslist: action.workspaceslist,
            };
        }

        default:
            return state;
    }
};

export default WorkspaceReducer;
