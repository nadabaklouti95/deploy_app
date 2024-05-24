export interface IContextItem {
    handleContext:any;
    contextItem:any;
    fold:any;
    contextIndex:any;
    contextList:any;
}
export interface IContextKey {
    contextKey:any;
    handleKey:any;
    stateAction:any;
    disabled:any;
    indexElement:any;
    accordState:any;
}
export interface IContextList {
    handleContext:any;
    contextList:any;
    fold:any;
    stateComponent:any;
}
export interface IContextValue {
    contextKey:any;
    handleValue:any;
    indexElement:any;
}
export interface IContextFilter {}
export interface IContext {}
export interface IContextAdd{
    handleContext:any;
    context:any;
    stateAction:any;
    storeId:any;
    cancelAction:any;
}

export interface IContextStepAdd{
    handleContext:any;
    context:any;
    stateAction:any;
    storeId:any;
    cancelAction:any;
    indexElement:any;
    indexId:any;
}