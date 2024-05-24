
export enum ThemeStyle {
  MODERN = 'modern',
  STANDARD = 'standard',
}

export enum ThemeStyleRadius {
  MODERN = 30,
  STANDARD = 4,
}

export enum ThemeMode {
  LIGHT = 'light',
  SEMI_DARK = 'semi-dark',
  DARK = 'dark',
}

export enum LayoutType {
  FULL_WIDTH = 'full-width',
  BOXED = 'boxed',
}

export enum NavStyle {
  DEFAULT = 'default',
  MINI = 'mini',
  MINI_SIDEBAR_TOGGLE = 'mini-sidebar-toggle',
  STANDARD = 'standard',
  HEADER_USER = 'user-header',
  HEADER_USER_MINI = 'user-mini-header',
  DRAWER = 'drawer',
  BIT_BUCKET = 'bit-bucket',
  H_DEFAULT = 'h-default',
  HOR_LIGHT_NAV = 'hor-light-nav',
  HOR_DARK_LAYOUT = 'hor-dark-layout',
}

export enum FooterType {
  FIXED = 'fixed',
  FLUID = 'fluid',
}

export enum HeaderType {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum RouteTransition {
  NONE = 'none',
  FADE = 'fade',
  SLIDE_LEFT = 'slideLeft',
  SLIDE_RIGHT = 'slideRight',
  SLIDE_UP = 'slideUp',
  SLIDE_DOWN = 'slideDown',
}

export enum Fonts {
  LIGHT = 300,
  REGULAR = 400,
  MEDIUM = 500,
  BOLD = 600,
  EXTRA_BOLD = 700,
}

export enum AuthType {
  FIREBASE = 'firebase',
  AWS_COGNITO = 'aws_cognito',
  AUTH0 = 'auth0',
  JWT_AUTH = 'jwt_auth',
}

export enum ActionMode {
  DISPLAY_MODE = 'display_mode',
  DELETE_MODE = 'delete_mode',
  CREATION_MODE = 'creation_mode',
  EDIT_MODE = 'edit_mode',
  CANCEL_MODE = 'cancel_mode',
  UPDATE_VALUE_MODE = 'update_value_mode',
  UPDATE_PRIORITY = 'update_priority',
  UPDATE_GENERAL_ACCESS = 'update_general_access'
}

export enum ProportyType{
  THECHNICAL = 'TECHNICAL',
  FUNCTIONAL = 'FUNCTIONAL'
}

export enum TaskType {
  PUBLICATION = 'PUBLICATION',
  UPLOAD = 'UPLOAD',
  DELETION = 'DELETION',
  EXPORT = 'EXPORT',
  REPLICATION = 'REPLICATION'
 }


 export enum RunningStatus {
  NEW = "NEW", 
  RUNNING = "RUNNING", 
  FINISHED = "FINISHED", 
  UNKNOWN = "UNKNOWN"
}

export enum ResultStatus {
  SUCCESS = "SUCCESS", 
  FAIL = "FAIL", 
  ABORTED = "ABORTED"
}

export enum EAccesRules{
  READ = "READ",
  WRITE = "WRITE",
  EXECUTE ="EXECUTE",
  ALL = 'ALL'
}

export enum EAccesRulesLevel{
  ALL = 'ALL',
  contextKey = 'contextKey',
  contextValue = 'contextValue'
}

export enum EAccesRulesType{
  ENTITY = 'entity',
  TASK = 'task'
}

export enum EStatus{
  ONLINE = "ONLINE",
  DRAFT = "DRAFT"
}

export enum TaskTypeId {
  PUBLICATION = 1,
  UPLOAD = 2,
  DELETION = 3,
  EXPORT = 4,
  REPLICATION = 5,
  UPDATE_CONTEXT = 6,
  MERGE_TAG = 7
 }
 
 export enum StatusId {
  DRAFT = 1,
  ONLINE = 2,
 }

 export enum typeEnum {
  TECHNICAL = 1,
  FUNCTIONAL = 2,
 }

 export enum typeStoreEnum {
  PROPERTIES = 1,
  YAML = 2,
  JSON = 3,
 }

 export enum filterTypeEnum {
  SELECT_MULTI = "select-multi",
  TEXT = "textField",
  TEXT_VERSION = "textVersion",
  TEXT_KEY = "textKey",
  DATE_RANGE = "date-range",
  SELECT_ONE ="select-one",
  SELECT_ONLY_ONE = "select-only-one",
  AUTOCOMPLETE = "autocomplete"
 }


 export enum ActionAccessMode {
  DELETE_MODE = 'delete',
  CREATION_MODE = 'create',
  EDIT_MODE = 'update',
  EXECUTE_MODE = 'EXECUTE',
  WRITE_MODE = 'WRITE',
  READ_MODE = 'READ'
}

export enum ETask {
  UPDATE_CONTEXT = 'Update context',
  EXPORT = 'Export',
  UPLOAD = 'Upload',
  PUBLISH = 'Publication',
  MERGE_TAG = 'WRITE',
}
 export enum typeMergeTag {
    RECENT = 1,
    FORCE = 2
 }
