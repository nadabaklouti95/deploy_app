
  export const proportys =
    {
      "csPropertyKeyViewDTOList": [
        {
          "contextKeys": [
            {
              "context": [
                {
                  "key": "region1",
                  "values": [
                    "us",
                    "eur"
                  ]
                },
                {
                  "key": "region2",
                  "values": [
                    "us",
                    "eur"
                  ]
                }
                ,
                {
                  "key": "region3",
                  "values": [
                    "us",
                    "eur"
                  ]
                }
                ,
                {
                  "key": "region4",
                  "values": [
                    "us",
                    "eur"
                  ]
                }
                ,
                {
                  "key": "region5",
                  "values": [
                    "us",
                    "eur"
                  ]
                }
              ],
              "id": 0,
              "value": "region3"
            },
            {
              "context": [
                {
                  "key": "env",
                  "values": [
                    "prod",
                    "dev"
                  ]
                }
              ],
              "id": 1,
              "value": "env"
            }
          ],
          "key": "property 0",
          "keyID": 0,
          "type": "FUNCTIONAL"
        },
        {
          "contextKeys": [
            

          ],
          "key": "property 1",
          "keyID": 1,
          "type": "TECHNICAL"
        },
        
      ]
    }
  export const contextDatas =  [
      {
        "id":"1",
        "name": "ENV",
        "values": [
          {"value" : "PRD"},
          {"value" : "OAT"},
          {"value" : "UAT"},
          {"value" : "INT1"},
          {"value" : "INT2"}
        ]
      },
      {
        "id":"2",
        "name": "Region",
        "values": [
          {"value" : "EUR"},
          {"value" : "AMER"},
          {"value" : "APAC"},
          {"value" : "ME"},
          {"value" : "NA"}
        ]
      },
      {
        "id":"3",
        "name": "Market",
        "values": [
          {"value" : "US"},
          {"value" : "FR"},
          {"value" : "DE"},
          {"value" : "ES"},
          {"value" : "UAE"}
        ]
      },
      {
        "id":"4",
        "name": "Currency",
        "values": [
          {"value" : "EUR"},
          {"value" : "USD"}
        ]
      },
      {
        "id":"5",
        "name": "Type",
        "values": [
          {"value" : "FO"},
          {"value" : "Cockpit"}
        ]
      },
      {
        "id":"6",
        "name": "Test",
        "values": [
          {"value" : "preProd"},
          {"value" : "prod"},
          {"value" : "dev"}
        ]
      }
    
  ]
  export const token={}
  export const listFile = [
    {
      "fileName" : "file.application/octet-stream",
      "tagId": 3,
      "startTime": "2022-04-26T00:56:09.009717Z",
      "endTime": "2022-04-26T00:56:09.029708Z",
      "runningStatus": "FINISHED",
      "resultStatus": "SUCCESS",
      "progressPercentage": 100,
      "progressInfo": "Uploaded Keys: 4 / 4",        
      "nbrUploadedKeys": 4,
      "contextJson": "[{ENV=[PRD]},{REGION=[US]}]",
    },
    {
      "fileName" : "file.application/octet-stream",
      "tagId": 3,
      "startTime": "2022-04-26T00:56:09.009717Z",
      "endTime": "2022-04-26T00:56:09.029708Z",
      "runningStatus": "FINISHED",
      "resultStatus": "SUCCESS",
      "progressPercentage": 100,
      "progressInfo": "Uploaded Keys: 4 / 4",        
      "nbrUploadedKeys": 4,
      "contextJson": "[{ENV=[PRD]},{REGION=[US]}]",
    },
    {
      "fileName" : "file.application/octet-stream",
      "tagId": 3,
      "startTime": "2022-04-26T00:56:09.009717Z",
      "endTime": "2022-04-26T00:56:09.029708Z",
      "runningStatus": "FINISHED",
      "resultStatus": "SUCCESS",
      "progressPercentage": 100,
      "progressInfo": "Uploaded Keys: 4 / 4",        
      "nbrUploadedKeys": 4,
      "contextJson": "[{ENV=[PRD]},{REGION=[US]}]",
    }

  ]
  export const yamlProperties = 
  {
    "csPropertyKeyViewDTOList": 
      [
        {
          keyId : 1,
          name : "child1",
          type : "TECHNICAL",
          propertyValueType : null,
          active : true,
          isComplexe: false,
          status: "DRAFT" ,
          dirty : true ,
          fullIdList : [1,2] ,
          indexList : null ,
          fullName : "parent . child1",
          "contextKeys" : [ ],
          index:4,
          hasChild:false
        },
        {
          keyId : 1,
          name : "child2",
          isComplexe: false,
          type : "TECHNICAL",
          propertyValueType : "TEXT",
          active : true,
          status: "DRAFT" ,
          dirty : true ,
          fullIdList : [1,2] ,
          indexList : null ,
          fullName : "parent . username . firstName . lastName",
          "contextKeys" : [ ],
          index:null,
          hasChild:true
        }
      ],
    pagesNumber : 1033  
  }
  export const createProperties = {
    keyId : null,
    name : "",
    isComplexe: false,
    type : "TECHNICAL",
    propertyValueType : null,
    active : true,
    status: "DRAFT" ,
    dirty : true ,
    fullIdList : null ,
    indexList : null ,
    fullName : "",
    index:null,
    hasChild:false
  }

  export const getParentProperties = 
  [
    
    {
      keyId : 2,
      name : "child 1",
      type : "TECHNICAL",
      propertyValueType : null,
      isComplexe: false,
      active : true,
      status: "DRAFT" ,
      dirty : true ,
      fullIdList : null ,
      indexList : null ,
      fullName : ["docker","managment"],
      "contextKeys" : [ ],
      index:null,
      hasChild:false
    },
    {
      keyId : 3,
      isComplexe: false,
      name : "child 2",
      type : "TECHNICAL",
      propertyValueType : null,
      active : true,
      status: "DRAFT" ,
      dirty : true ,
      fullIdList : [1,2,3] ,
      indexList : null ,
      fullName : ["docker","managment"],
      "contextKeys" : [ ],
      index:4,
      hasChild:false
    }
  ]
  export const property = {   
    contextKeys:[],
    dirty:true,
    fullIdList:null,
    fullName:"data",
    index:null,
    key:"data",
    keyID:185,
    list:false,
    status:"DRAFT",
    type:"TECHNICAL",
  }
  export const DeletionTask = {
    id:0,
    EntityType:"STORE",
    entityName: "entity",
    TaskType:'DELETION',
    startTime:'2022-10-05T10:15:54Z',
    endTime:'2022-10-05T10:15:54Z',
    runningStatus:'FINISHED',
    resultStatus:'SUCCESS',
    progressPercentage:100,
    progressInfo:'progressInfo',
    userLogin:'Karim'
  }
  export const FileExportTask = {
    id:0,
    TaskType:'EXPORT',
    startTime:'2022-10-05T10:15:54Z',
    endTime:'2022-10-05T10:15:54Z',
    runningStatus:'FINISHED',
    resultStatus:'SUCCESS',
    progressPercentage:100,
    progressInfo:"Exported Keys: 0 / 0 \nExported values: 0 / 0",
    userLogin:'admin',
    context:[ {
      "key" : "YAML",
      "value" : "ALL"
    }, {
      "key" : "env",
      "value" : "ALL"
    }, {
      "key" : "pays",
      "value" : "ALL"
    }, {
      "key" : "yaml_001",
      "value" : "ALL"
    }, {
      "key" : "yaml_002",
      "value" : "ALL"
    } ],
    nbrExportedKeys:5,
    nbrExportedValues:5,
    propertiesType:'FUNCTIONAL',
    tagId:'tagId'
  }
  export const FileUploadedTask = {
    id:0,
    TaskType:'UPLOAD',
    startTime:'2022-10-05T10:15:54Z',
    endTime:'2022-10-05T10:15:54Z',
    runningStatus:'FINISHED',
    resultStatus:'SUCCESS',
    progressPercentage:100,
    progressInfo:'Uploaded Keys: 30 / 30 \nUploaded values: 13 / 13',
    userLogin:'admin',
    fileName:'fileName',
    context: [ {
      "key" : "YAML",
      "values" : [ "ALL" ]
    }, {
      "key" : "env",
      "values" : [ "ALL" ]
    }, {
      "key" : "pays",
      "values" : [ "ALL" ]
    } ],
    nbrUploadedKeys:30,
    nbrUploadedValues:60,
    propertiesType:'TECHNICAL',
    strategyType:'REPLACE',
    tagId:'tagId'
  }

  export const FilePublishTask = {
    id:0,
    TaskType:'PUBLICATION',
    startTime:"2022-10-20T10:58:15Z",
    endTime:"2022-10-20T10:58:15Z",
    runningStatus:'FINISHED',
    resultStatus:'SUCCESS',
    progressPercentage:100,
    progressInfo:'Published properties: 35 / 35',
    userLogin:'admin',
    publishEmptyProperties:false,
    nbrPublishedValues:4,
    nbrPublishedKeys:4,
    nbrDeletedValues:5,
    nbrDeletedKeys:7,
    tagId:'tagId'
  }


  export const accesRules = {
    "accessRuleContextDTO": {
      "accessRuleType": ["READ"],
      "contextKeys": [
        {
          "accessRuleType": ["WRITE"],
          "contextKey": "Envirenement",
          "contextValues": [
            {
              "accessRuleType": ["WRITE"],
              "contextValue": "DEV"
            },
            {
              "accessRuleType": ["READ"],
              "contextValue": "PRD"
            },
            {
              "accessRuleType": ["WRITE"],
              "contextValue": "TEST"
            }
          ]
        },
        {
          "accessRuleType": ["READ","WRITE"],
          "contextKey": "REGION",
          "contextValues": [
            {
              "accessRuleType": ["READ","WRITE"],
              "contextValue": "US"
            },
            {
              "accessRuleType": ["READ","WRITE"],
              "contextValue": "EUR"
            },
            {
              "accessRuleType": ["READ","WRITE"],
              "contextValue": "MENA"
            },
            {
              "accessRuleType": ["READ","WRITE"],
              "contextValue": "TN"
            }
          ]
        }
      ]
    },
    "generateToken": true,
    "id": 0,
    "status":'DRAFT',
    "manageGroupsAndUsers": true,
    "publishProperties": true,
    "storeId": 0,
    "userGroups": [
      {
        "description": "User Groupe 1",
        "id": 0,
        "name": "string",
      }
    ]
  }

  export const auditData = [
    {
      id:2,
      elementType:'VALUE',
      version:"V3",
      OperationType :"UPDATE",
      User :"Admin",
      Tag :"Latest",
      Type:'TECHNICAL',
      Date :"13-05-2022 15:25:32",
      Keys : "property for screen Properties",
      value : "Value of property for screen properties",
      "context" : [ {
        "key" : "region",
        "values" : [ "MENA","US","EUR" ]
      }, {
        "key" : "envirement",
        "values" : [ "DEV","TEST","STG" ]
      }, {
        "key" : "country",
        "values" : [ "TN","FR" ]
      } ],
      trancate:false,
      status:"ONLINE",
      dirty:'FALSE'
    },
    {
      id:1,
      elementType:'VALUE',
      version:"V1",
      OperationType :"INSERT",
      User :"User",
      Tag :"TAG1",
      Type:'FUNCTIONAL',
      Date :"13-04-2022 15:25:32",
      Keys : "Key detected by audit after update",
      value : "Value of property after update properties",
      "context" : [ {
        "key" : "region",
        "values" : [ "MENA","US","EUR" ]
      }, {
        "key" : "envirement",
        "values" : [ "DEV","TEST","STG" ]
      }, {
        "key" : "country",
        "values" : [ "TN","FR" ]
      } ],
      trancate:false,
      status:"DRAFT",
      dirty:'FALSE'
    }
  ]


  export const menuItems = [
{
    title: "Services",
    submenu: [{
            title: "web design",
        },
        {
            title: "web development",
            submenu: [{
                    title: "Frontend",
                },
                {
                    title: "Backend",
                    submenu: [{
                            title: "NodeJS",
                        },
                        {
                            title: "PHP",
                        },
                    ],
                },
            ],
        },
        {
            title: "SEO",
        },
    ],
}
];

export let contextKey = {
  "id":null,
  "name": "",
  "description": "",
  "storeId": null,
  "values":[]
}


export let listContext = [
  {
    id:0,
    priority:0,
    name:"context 1",
    description:'des',
    values:[
      {
        id:3,
        keyId:0,
        value:"usd"
      },
      {
        id:4,
        keyId:0,
        value:"eur"
      },
      {
        id:5,
        keyId:0,
        value:"tnd"
      },
    ]
  },
  {
    id:1,
    name:"context 2",
    description:'des',
    priority:1,
    values:[
      {
        id:7,
        keyId:1,
        value:"usd"
      },
      {
        id:8,
        keyId:1,
        value:"eur"
      },
      {
        id:9,
        keyId:1,
        value:"tnd"
      },
    ]
  },
]


export let userGroupeRules = {
  taskTypeId:[
    {name:"Publication",values:["READ","EXECUTE"]},
    {name:"Upload",values:["READ","EXECUTE"]},
    {name:"Deletion",values:["READ","EXECUTE"]},
    {name:"Export",values:["READ","EXECUTE"]},
    {name:"Replication",values:["READ","EXECUTE"]},
    {name:"Update context",values:["READ","EXECUTE"]},
    {name:"Merge",values:["READ","EXECUTE"]},

    
  ],
  entityId:[
    {name:"store",values:["READ","WRITE"]},
    {name:"Tag",values:["READ","WRITE"]},
    {name:"ContextKey",values:["READ","WRITE"]},
    {name:"ContextValue",values:["READ","WRITE"]},
    {name:"PropertyKey",values:["READ","WRITE"]},
    {name:"PropertyValue",values:["READ","WRITE"]},
    {name:"AccessRule",values:["READ","WRITE"]},
    {name:"Property",values:["READ","WRITE"]},
    {name:"Context",values:["READ","WRITE"]},
    {name:"UserGroup",values:["READ","WRITE"]},
    {name:"User",values:["READ","WRITE"]},
  ],
  storeId:1
}


export const accessRuleMapper = {
  "entities": {
      "store": {
          "read": {
              "depend_entities_read": [],
              "depend_entities_write": []
          },
          "write": {
              "depend_entities_read": [
                  "Store"
              ],
              "depend_entities_write": []
          }
      },
      "tag": {
          "read": {
              "depend_entities_read": [
                  "Store"
              ],
              "depend_entities_write": []
          },
          "write": {
              "depend_entities_read": [
                  "Store",
                  "Tag"
              ],
              "depend_entities_write": []
          }
      },
      "context": {
          "read": {
              "depend_entities_read": [
                  "Store"
              ],
              "depend_entities_write": []
          },
          "write": {
              "depend_entities_read": [
                  "Store",
                  "Context"
              ],
              "depend_entities_write": []
          }
      },
      "property": {
          "read": {
              "depend_entities_read": [
                  "Store",
                  "Tag",
                  "Context"
              ],
              "depend_entities_write": []
          },
          "write": {
              "depend_entities_read": [
                  "Store",
                  "Tag",
                  "Context",
                  "Property"
              ],
              "depend_entities_write": []
          }
      },
      "token": {
          "read": {
              "depend_entities_read": [
                  "Store"
              ],
              "depend_entities_write": []
          },
          "write": {
              "depend_entities_read": [
                  "Store",
                  "Token"
              ],
              "depend_entities_write": []
          }
      },
      "user_group": {
          "read": {
              "depend_entities_read": [
                  "Store"
              ],
              "depend_entities_write": []
          },
          "write": {
              "depend_entities_read": [
                  "Store",
                  "User group"
              ],
              "depend_entities_write": []
          }
      },
      "user": {
          "read": {
              "depend_entities_read": [
                  "User group"
              ],
              "depend_entities_write": []
          },
          "write": {
              "depend_entities_read": [
                  "User group",
                  "User"
              ],
              "depend_entities_write": []
          }
      }
  },
  "tasks": {
      "publication": {
          "read": {
              "depend_entities_read": [
                  "Store",
                  "Tag"
              ],
              "depend_entities_write": []
          },
          "execute": {
              "depend_entities_read": [
                  "Store",
                  "Tag",
                  "Property",
                  "publication"
              ],
              "depend_entities_write": [
                  "Property"
              ]
          }
      },
      "export": {
          "read": {
              "depend_entities_read": [
                  "Store",
                  "Tag"
              ],
              "depend_entities_write": []
          },
          "execute": {
              "depend_entities_read": [
                  "Store",
                  "Tag",
                  "Context",
                  "Property",
                  "Export"
              ],
              "depend_entities_write": []
          }
      },
      "upload": {
          "read": {
              "depend_entities_read": [
                  "Store",
                  "Tag"
              ],
              "depend_entities_write": []
          },
          "execute": {
              "depend_entities_read": [
                  "Store",
                  "Tag",
                  "Context",
                  "Property",
                  "Upload"
              ],
              "depend_entities_write": [
                  "Property"
              ]
          }
      },
      "update_context": {
          "read": {
              "depend_entities_read": [
                  "Store",
                  "Tag"
              ],
              "depend_entities_write": []
          },
          "execute": {
              "depend_entities_read": [
                  "Store",
                  "Tag",
                  "Context",
                  "Property",
                  "Update context"
              ],
              "depend_entities_write": [
                  "Property"
              ]
          }
      }
  }
}