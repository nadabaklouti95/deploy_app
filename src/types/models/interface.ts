import { ResultStatus, RunningStatus, TaskType } from "shared/constants/AppEnums";

export interface ICsPropertiesDefault {
    fold:any;
    stateActionAccord:any;
    properties:any;
    storeType:any;
    handleKey:any;
    handleValue:any;
    deleteKey:any;
    deleteValue:any;
    ContextData:any;
    changeStatusValue:any;
    cancelKey:any;
    stateValue:any;
    selectedTag:any;
    handleNewPropertyKey:any;
    handlePropertyFiler:any;
    modeView:any;
    indexElement:any;
    publishProperty:any;
    addValueState:any;
}

export interface IPropertyList {
    storeType:any
    listProperty:any;
    tagId:any;
    initialProperty:any;
    page:any;
    rowsPerPage:any;
    fold:any;
    loadingx:any;
    ContextData:any;
    stateValue:any;
    stateActionAccord:any;
    handleNewPropertyKey:any;
    deleteKey:any;
    deleteValue:any;
    cancelKey:any;
    handleKey:any;
    handleValue:any;
    changeStatusValue:any;
    handleChangeRowsPerPage:any;
    handleChangePage:any;
    handlePropertyFiler:any;
    modeView:any;
    propertyTree:any;
    requestData:any;
    stateComponnent:any;
    stateTreeFilter:any;
    publishProperty:any;
    publishResponse:any;
    addValueState:any;
}


export interface PropertyDetailsProps {
    headerActionState: string;
    handleKey: any,
    handleValue:any,
    deleteKey: any,
    deleteValue:any,
    csPropertyKey:any,
    storeType:any;
    initialContext:any;
    selectedTag: any;
    stateValue:any;
    changeStatusValue:any;
    cancelCreationAction:any;
    handleNewPropertyKey:any;
    handlePropertyFiler:any;
    modeView:any;
    indexElement:any;
    publishProperty:any;
    updateValue?:any
    addValueState:any
}

export interface PropertyValueProps {
    value:any;
    context:any;
    key:any;
    KeyId:any;
    headerMode:string;
    actionMode:any;
    deletePropertyValue:any;
    handleAction:any;
    cancelCreation:any;
    updateActionMode:any;
    storeType:any;
    indexProperty:any;
    publishProperty:any;
    updateValue?:any;
    indexValue:any;
}

export interface IPropertyKey {
    handleCreate : any;
    handleUpdate : any;
    handleDelete : any;
    cancelCreate : any;
    propertyKey : any;
    storeType : any;
    selectedTag : any
    Loading : any;
    state : any;
    handleNewPropertyKey:any;
    handlePropertyFiler:any;
    modeView:any;
    indexProperty:any;
    publishProperty:any;
    updateValue?:any;
}

export interface IPropertiesFilter {
    resetFilter:any;
    handleChangeTag:any;
    handleChangeType:any;
    handleChangeContext:any;
    FindProperty:any;
    handleChangeSearch:any;
    setAutoCompleteValue:any;
    tagsLists:any;
    TagFilter:any;
    Type:any;
    names:any;
    ContextData:any;
    contextValues:any;
    autoCompleteValue:any;
    loadingFind:any;
    propertyKeys:any;
    handleStatus:any;
    status:any;
    modeView:any;
}

export interface IPublishAdd {
    tagList:any;
    errorAction:any;
    loading:any;
    handlePublish:any;
    cancelPublish:any;
    storeType:any
}
export interface IMergeTagAdd {
    tagList:any;
    errorAction:any;
    loading:any;
    handleMerge:any;
    cancelPublish:any;
}
export interface ITreeProperty {
    id:any;
    name:any;
    property:any;
    storeType:any;
    handleKey:any;
    handleValue:any;
    deleteKey:any;
    deleteValue:any;
    ContextData:any;
    changeStatusValue:any;
    cancelKey:any;
    stateValue:any;
    selectedTag:any;
    handleNewPropertyKey:any;
    handlePropertyFiler:any;
    requestData:any;
    indexElement:any;
    publishProperty:any;
    publishResponse:any;
    addValueState:any;
}

export interface IExport {

}

export interface IFilter {
    disabled:any;
    stateFilter:any;
    stateComponent:any;
    context:any;
    filterData:any;
    handleSearch:any;
    resetForm:any;
    list?:any;
    handleAutocomplete?:any
}
export interface IExportFilter {
    handleFilter:any;
    tags:any;
    mainValues:any;
    disabled:any;
}

export interface IExportList{
    fold:any;
    ExportList:any;
    tagName:any;
    loading:any;
    handlePagination:any;
    row:any,
    page:any;

}

export interface IExportAdd{
    store:any;
    tags:any;
    loading:any;
    context:any;
    action:any;
}
export interface IUserGroupeList{
    listGroupe:any;
    handleUserGroupe:any;
    fold:any;
    stateComponent:any;
    handleAccessRule:any;
    handlePages:any;
    page:any;
}

export interface IUserGroupeRules{
  accessRule:any;
  indexAccess:any;
  status:any;
  handleGeneralAccess:any;
}

export interface IUserGroupeFilter{
    handleFilter:any;
    filterRequest:any;
    stateComponnent:any;

}

export interface ITagFilter{
    handleFilter:any;
    filterRequest:any;
    stateComponnent:any;
    disabled:any
}

export interface IUserGroupe{
  csUserGroupDTO:any;
  csAccessRuleDTO:any;
  handleValue:any;
  fold:any;
  actionMode:any;
  handleAccessRule:any;
  indexUserGroupeValue:any;
  csGeneralAccessRuleDTO:any;
}

export interface IUserGroupeAdd{
  csUserGroupDTO:any;
  csAccessRuleDTO:any;
  handleValue:any;
  fold:any;
  actionMode:any;
  handleAccessRule:any;
  indexUserGroupeValue:any;
}

export interface ICsTaskFilter{
    handleFilter:any;
    stateComponnent:any;
    tagsLists:any;
}

export interface ICsTaskList{
  taskList:any;
  fold:any;
  stateComponent:any;
  tagName:any;
  page:any;
  handlePages:any;
  handleTaskLog:any;
}

export interface ICsTaskValue{
    csTask:any;
    fold:any;
    actionMode:any;
    tagName:any
    handleTaskLog:any;

}

export interface ICsTaskValue{
    csTask:any;
    fold:any;
    actionMode:any;
    tagName:any

}

export interface Task{
    type : TaskType,
    startTime : Date,
    endTime : Date,
    runningStatus : RunningStatus,
    resultStatus : ResultStatus,
    progressPercentage : Number,
    progressInfo : String,
    userId : Number,
    userLogin : String
}


export interface ITagList{
    stateComponnent:any;
    listTag:any;
    fold:any;
    handleTag:any;
    handlePages:any;
    page:any;
    size:any;
    mergeTags:any;
}

export interface ITagValue{
    fold:any;
    tag:any;
    handleTag:any;
    indexTag:any;
    listTags:any;
    mergeTags:any;
}

export interface ITagValueMerge {
    tag:any;
    listTags:any;
    mergeTags:any;
}
export interface ITagValueGeneral {
    tag:any,
    handleTag:any,
    indexTag:any,
    lockTag:any,
}
export interface ITagValueStats {
    tag:any,
}

export interface IAccessRulesValue{
    accessRule:any;
    handleAccessRule:any;
    fold:any;
    status:any;
    indexAccess:any
}

export interface IAccessRulesList{
    stateComponnent:any;
    listAccessRules:any;
    handleAccessRules:any;
    fold:any;
    handlePagination:any;
}

export interface IAccesRulesFilter{
    handleFilter:any;
    stateComponnent:any;
}


export type TagProps = {
    id: number;
    name: string;
    description: string;
    storeId: number;
    nextTags: [];
};
export type Tagdimension = {
    id: number;
    name: string;
    description: string;
    storeId: number;
    nextTags: [];
    y: number;
    x: number;
};
export interface SelectedTagProps {
    description: string;
    id: number;
    name: string;
    nextTags: [string];
    storeId: number;
}
export interface droppable {
    tags: any;
    id: any;
    openEdit: (data: any) => () => void;
    openDelete: (data: any) => () => void;
}



export interface IPropertyRevisionFilter{
    handleFilter:any;
    stateComponnent:any;
    filterData:any;
    context:any;
    contextValues:any;
    tags:any;
    sourceId:any;
    handleSource:any;
    history:any;
}

export interface IPropertyRevisionItem{

}

export interface IPropertyRevisionList {
    stateComponnent:any;
    listAudit:any;
    fold:any;
    stateCompare:any;
    compareData:any;
    handleCompare:any;
    handlePages:any;
    page:any;
    checkCompare:any;
    compareElement:any;
}

export  interface IAudit {
    fold:any;
    audit:any;
}

export interface IPropertyRevisionCompare{
    compareData:any;
    handleCompare:any;
}

export interface IMenuItems {
    items:any;
    depthLevel:any;
}

export interface IDropdown{
    submenus:any;
    dropdown:any;
    depthLevel:any;
}


export interface IPropertyAudit{
    audit:any;
    idProperty:any;
    indexProperty:any;
}

export interface IStoreFilter{
    handleFilter:any;
    stateComponnent:any;
}

export interface IStoreListMode{
    listStore :any;
    stateComponnent:any;
    handleStore:any;
    page:any;
    handlePages:any;
    fold:any;

}

export interface IStoreItem{
    store:any;
    stateComponnent:any;
    handleStore:any;
    fold:any;
    indexStore:any;
}

export interface IDropdownfilter{
    name:any;
    label:any;
    handleValue:any;
    values:any;
    selectedValues:any;
    type:any;
    search:any;
    context:any;
    typeFilter:any;
    disabled:any;
    key?:any;
}

export interface ICsTaskAdminList{
    taskList:any;
    fold:any;
    stateComponnent:any;
    tagName:any;
    page:any;
    handlePages:any;
}

export interface ICsTaskAdminFilter {
    handleSearch:any;
    stateFilter:any;
    filterData:any;
    stateComponent:any;
    storeList:any;
    tagList:any;
    resetForm:any;
    disabled:any;
}

export interface ICsTaskLog {
  taskLogInfo:any;
  taskDate:any;
}

export interface IAccessButton{
    id?:any;
    className?:any;
    style?:any;
    color?:any;
    ariaLabel?:any;
    handleClick?:any;
    children?: any;
    disabled?:any;
    actionType?:any;
    iconButton?:any;
    tooltip?:any;
    theme?:any;
    type?:any;
    startIcon?:any;
    variant?:any;
    taskName?:any;
}

export interface IAccessCheckbox{
    actionType?:any;
    id?:any;
    disabled?:any;
    checked?:any;
    value?:any;
    style?:any;
    size?:any;
    className?:any;
    handleChange?:any;
    inputProps?:any;
    color?:any;
    handleBlur?:any;
    name?:any;
}

export interface IAccessSelect{
    actionType?:any;
    labelId?:any;
    id?:any;
    value?:any;
    className?:any;
    handleChange?:any;
    variant?:any;
    inputProps?:any;
    children?:any;
    multiple?:any;
    displayEmpty?:any;
    renderValue?:any;
    MenuProps?:any;
    disabled?:any;
    input?:any;
    style?:any;
}

export interface IAccessTextField{
    fullWidth?:any;
    id?:any;
    name?:any;
    value?:any;
    handleChange?:any;
    size?:any;
    label?:any;
    variant?:any;
    className?:any;
    style?:any;
    disabled?:any;
    InputProps?:any;
    helperText?:any;
    error?:any;
    InputLabelProps?:any;
    actionType?:any;
    key?:any;
    multiline?:any;
    minRows?:any;
    maxRows?:any;
    handleBlur?:any;
    inputProps?:any;
    children?:any;
    select?:any;
    rows?:any;
    placeholder?:any;
    type?:any;
}

export interface IAccessSwitch{
    id?:any;
    checked?:any;
    handleChange?:any;
    name?:any;
    value?:any;
    handleBlur?:any;
    actionType?:any;
    isMultiLine?:any;
}

export interface IAccessMultiLineSwitch{
    id:string;
    inputProps:any;
    handleChange:any;
    name:any;
    checked:boolean;
    actionType:any;
}
export interface IWorkspaceItem {
    fold:any,
    workspace:any,
    handleWorkspace:any,
    indexWorkspace:any
}

export interface IWorkspaceGeneral {
    workspace:any,
    handleWorkspace:any,
    indexWorkspace:any
}

export interface IWorkspaceList {
    workspaceList:any,
    stateComponnent:any,
    handleWorkspace:any,
    page:any,
    handlePages:any,
    fold:any
}

export interface IWorkspaceAdd{
    cancelAction:any,
    handleWorkspace:any,
    stateAction:any
}

export interface IStoreGeneral {
    store:any,
    handleStore:any,
    stateComponnent:any,
    indexStore:any,
    getStoreType:any,
    deleteStore:any,
    openConfirmdialog:any,
    handleCloseConfirmPopup:any,
    headerConfirmPopup:any,
    contentConfirmPopup:any
}
export interface IStoreAudit {
    
}
export interface IStoreStats {
    store:any
}