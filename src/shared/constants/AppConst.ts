import { AccordionSummary, createTheme, withStyles } from "@material-ui/core";
import { green, grey, red } from "@material-ui/core/colors";
import { AuthUser } from "../../types/models/AuthUser";
import { AuthType, EAccesRules, EAccesRulesType } from "./AppEnums";

export const authRole = {
  admin: ["admin"],
  user: ["user", "admin"],
};

export const defaultUser: AuthUser = {
  uid: "RFedvhji876rfhjuecvh7",
  displayName: "John Alex",
  email: "demo@example.com",
  token: "access-token",
  role: authRole.user,
  authType: AuthType.AUTH0,
  photoURL: "/assets/images/avatar/A11.jpg",
};

//Name of default tag
export const defaultTag ="Latest";
export const initialUrl = "/workspace"; // this url will open after login

export const ComboBoxRoutes = [
  "/properties",
  "/context",
  "/store",
  "/token",
  "/tags",
  "/upload",
  "/publish",
  "/user",
  "/export",
  "/userGroupes",
  "/csTask",
  "/accesRules",
  "/revision/property",
  "/task/admin",
  "/mergeTag",
  "/workspace"
]

export const taskAccessList = [
  "Update context",
  "Publication",
  "Upload",
  "Export",
  "Merge tag"
]


export const csPropertyDto = {
  csPropertyKeyViewDTOList:[],
  pagesNumber:0
}


export const propertyValue = [
  "KEY",
  "TEXT",
  "MAP",
  "LIST"

]

export const FilterSelect = "SELECT";
export const SELECT_MULTI_CHECK = "SELECT_MULTI_CHECK";
export const FilterText = "TEXTFIELD"

export const filterData = {
  name : '',
  Type : '',
  TAG : 'Latest',
  context : [
    {key: "ENV", values: []},
    {key: "REG", values: []},
    {key: "CTY", values: []},
  ]
}

export const filterDataReset = {
  name : '',
  Type : '',
  TAG : 'Latest',
  context : [
    {key: "ENV", values: []},
    {key: "REG", values: []},
    {key: "CTY", values: []},
  ]
}
export const themeButton = createTheme({
  palette: {
  primary: green
  }
});

export const themeDeleteButton = createTheme({
  palette: {
  primary: red
  }
});

export const themeDisabledButton = createTheme({
  palette: {
  primary: grey
  }
});

export const StyledAccordionSummary = withStyles({
  root: {
    height:'auto',
    "&.Mui-expanded": {
      minHeight: 12,
      maxHeight: 12,
    },
  },
})(AccordionSummary);

export const ResultList = ["SUCCESS","FAIL","ABORTED"]
export const StatusList = ["RUNNING","NEW","FINISHED","UNKNOWN"]
export const TaskTypeList = ["PUBLICATION","UPLOAD","DELETION","EXPORT","REPLICATION"]
export const statusTasklist = ['ONLINE','DRAFT']

export const statusStore = [
  {key:1,value:"PROPERTIES"},
  {key:2,value:"YAML"},
  {key:3,value:"JSON"},
  
]

export const TaskTypeEnum = [
  {key:1,value:"PUBLICATION"},
  {key:2,value:"UPLOAD"},
  {key:3,value:"DELETION"},
  {key:4,value:"EXPORT"},
  {key:5,value:"REPLICATION"},
]


export const ResultStatusEnum = [
  {key:1,value:"SUCCESS"},
  {key:2,value:"FAIL"},
  {key:3,value:"ABORTED"},
  
]

export const RunningStatusEnum = [
  {key:1,value:"NEW"},
  {key:2,value:"RUNNING"},
  {key:3,value:"FINISHED"},
  {key:4,value:"UNKNOWN"},
]

export const StatusEnum = [
  {key:1,value:"DRAFT"},
  {key:2,value:"PUBLISHED"},
]

export const StatusPropEnum = [
  {key:1,value:"DRAFT"},
  {key:2,value:"ONLINE"},
]

export const TypeListEnum = [
  {key:1,value:"TECHNICAL"},
  {key:2,value:"FUNCTIONAL"}
]

export const operationTypeEnum = [
  {key:1,value:"INSERT"},
  {key:2,value:"UPDATE"},
  {key:3,value:"DELETE"},
  {key:4,value:"PUBLISH"},
  {key:5,value:"PUBLISH DELETE"}
]

export const storeType = [
  {key:1,value:"PROPERTIES"},
  {key:2,value:"YAML"},
  {key:3,value:"JSON"},
  
]


export const contextAllEnum = 0;


export const generalRuleFirstRow = [
  {key:'Workspace',name:"Workspace",values:[]},
  {key:'Store',name:"Store",values:[]},
  {key:'Context',name:"Context",values:[]},
  {key:'Tag',name:"Tag",values:[]},
  {key:'Property',name:"Property",values:[]},
 
]

export const generalRuleSecondeRow = [
  {key:'Token',name:"Token",values:[]},
  {key:'User group',name:"User group",values:[]},
  {key:'User',name:"User",values:[]}
]



export const taskTypeRow = [
  {key:'Update context',name:"Update context",values:[]},
  {key:'Publication',name:"Publication",values:[]},
  {key:'Upload',name:"Upload",values:[]},
  {key:'Export',name:"Export",values:[]},
  {key:'Merge tag',name:"Merge tag",values:[]}
]

//this list is used to get related Rules
export const relatedRulesEnum = [
  {
    name:"Store",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null}
    ]
  },
  {
    name:"Context",
    values:[
      {key:"Store",type:EAccesRulesType.ENTITY,action:null}
    ]
  },
  {
    name:"Property",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:null},
      {key:"Tag",type:EAccesRulesType.ENTITY,action:null},
      {key:"Context",type:EAccesRulesType.ENTITY,action:null}
    ]
  },
  {
    name:"Tag",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:null}
    ]
  },
  {
    name:"User group",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:null}
    ]
  },
  {
    name:"User",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:null},
      {key:"User group",type:EAccesRulesType.ENTITY,action:null},
    ]
  },
  {
    name:"Token",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:null},
      {key:"Context",type:EAccesRulesType.ENTITY,action:null},
    ],
  },
  {
    name:"Update context",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Property",type:EAccesRulesType.ENTITY,action:EAccesRules.WRITE},
    ]
  },
  {
    name:"Publication",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Context",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Property",type:EAccesRulesType.ENTITY,action:EAccesRules.ALL},
      {key:"Tag",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
    ]
  },
  {
    name:"Upload",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Store",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Context",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Tag",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Property",type:EAccesRulesType.ENTITY,action:EAccesRules.WRITE},
    ]  
  },
  {
    name:"Export",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Context",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Tag",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Property",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
    ]
  },
  {
    name:"Merge tag",
    values:[
      {key:"Workspace",type:EAccesRulesType.ENTITY,action:null},
      {key:"Store",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Context",type:EAccesRulesType.ENTITY,action:EAccesRules.READ},
      {key:"Tag",type:EAccesRulesType.ENTITY,action:EAccesRules.ALL},
      {key:"Property",type:EAccesRulesType.ENTITY,action:EAccesRules.ALL},
    ]
  },
]

//this list is used to check if uncheck read element is valid
export const relatedUncheckRules = [
  {
    name:"Workspace",
    values:[
      {key:"Store",type:EAccesRulesType.ENTITY},
      {key:"Context",type:EAccesRulesType.ENTITY},
      {key:"Property",type:EAccesRulesType.ENTITY},
      {key:"Tag",type:EAccesRulesType.ENTITY},
      {key:"User group",type:EAccesRulesType.ENTITY},
      {key:"User",type:EAccesRulesType.ENTITY},
      {key:"Token",type:EAccesRulesType.ENTITY},
      {key:"Update context",type:EAccesRulesType.TASK},
      {key:"Publication",type:EAccesRulesType.TASK},
      {key:"Upload",type:EAccesRulesType.TASK},
      {key:"Export",type:EAccesRulesType.TASK},
      {key:"Merge tag",type:EAccesRulesType.TASK},
    ]
  },
  {
    name:"Store",
    values:[
      {key:"Context",type:EAccesRulesType.ENTITY},
      {key:"Property",type:EAccesRulesType.ENTITY},
      {key:"Tag",type:EAccesRulesType.ENTITY},
      {key:"User group",type:EAccesRulesType.ENTITY},
      {key:"User",type:EAccesRulesType.ENTITY},
      {key:"Token",type:EAccesRulesType.ENTITY},
      {key:"Update context",type:EAccesRulesType.TASK},
      {key:"Publication",type:EAccesRulesType.TASK},
      {key:"Upload",type:EAccesRulesType.TASK},
      {key:"Export",type:EAccesRulesType.TASK},
      {key:"Merge tag",type:EAccesRulesType.TASK},
    ]
  },
  {
    name:"Context",
    values:[
      {key:"Property",type:EAccesRulesType.ENTITY},
      {key:"Token",type:EAccesRulesType.ENTITY},
      {key:"Update context",type:EAccesRulesType.TASK},
      {key:"Publication",type:EAccesRulesType.TASK},
      {key:"Upload",type:EAccesRulesType.TASK},
      {key:"Export",type:EAccesRulesType.TASK},
      {key:"Merge tag",type:EAccesRulesType.TASK},
    ]
  },
  {
    name:"Tag",
    values:[
      {key:"Property",type:EAccesRulesType.ENTITY},
      {key:"Publication",type:EAccesRulesType.TASK},
      {key:"Upload",type:EAccesRulesType.TASK},
      {key:"Export",type:EAccesRulesType.TASK},
      {key:"Merge tag",type:EAccesRulesType.TASK},
    ]},
  {
    name:"User group",
    values:[
      {key:"User",type:EAccesRulesType.ENTITY},
    ]
  },
  {
    name:"Property",
    values:[
      {key:"Update context",type:EAccesRulesType.TASK},
      {key:"Publication",type:EAccesRulesType.TASK},
      {key:"Upload",type:EAccesRulesType.TASK},
      {key:"Export",type:EAccesRulesType.TASK},
      {key:"Merge tag",type:EAccesRulesType.TASK},
    ]
  },
]










