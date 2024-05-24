import { AppActions } from "types";
import { AUDIT_PROPERTY } from "types/actions/audit.actions";
import { auditProperty } from "types/models/audit";

export const initialData:auditProperty = {
    csContextsDTOList: null,
    fromDate: null,
    operationTypeList: null,
    propertyKey: null, 
    statusList: null,
    storeId: null, 
    tagIdList: null,
    toDate: null,
    userLogin:null,
  };
 
  const auditReducer = (state = initialData, action: AppActions) => {
    switch (action.type) {
      case AUDIT_PROPERTY: {
        return {
          ...state,
          audit: action.audit,
        };
      }
  
      default:
        return state;
    }
  };
  export default auditReducer;