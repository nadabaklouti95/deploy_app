export interface accesRulesDTO {
    "id":any,
    "generateToken": boolean,
    "manageGroupsAndUsers": boolean;
    "publishProperties":boolean;
    "storeId":any;
    "userGroupsName":any;
    "accessRuleContextDTO":any
  }

export interface accessRuleContextDTO {
    "accessRuleType": string[];
    "contextKeys": contextKeysDTO[]
} 

export interface contextKeysDTO {
    accessRuleType: string[];
    contextKey: string;
    contextValues: contextValueDTO[];
}

export interface contextValueDTO{
    accessRuleType: string[];
    contextValue:string;
}