import { contextKeysDTO } from "./contextKeysDTO";

export class csPropertyKeyViewDTO {
    keyID: number = 0;
    key: string = ""
    type: string = "TECHNICAL"
    contextKeys: contextKeysDTO[] = [];
    status:string = "";
    list:boolean =  false;
    parentId:any = null;
    fullName:any = '';
    fullIdList:any =  null;
  }


  export class userGroupeDTO 
    {
      "attachedToStore": false;
      "description": "";
      "id": 0;
      "name": "";
      "storeId": 0;
    }