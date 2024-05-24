import * as React from "react";
import useStyles from "./styles";

import { Pagination, Skeleton } from "@material-ui/lab";
import { IStoreListMode } from "types/models/interface";
import StoreItem from "../StoreItem";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../redux/store";

const StoreListMode: React.FC<IStoreListMode> = (props) => {

  const listWS = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const cookieNameWS = "selectedWorkspace";
  const initialValueWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === cookieNameWS ? `${acc}${cur.split("=")[1]}` : acc,"");
  const [selectedWS, setSelectedWS] = useState<any>(null);


  const classes = useStyles()
    const handleChange = (event:any, value:any) =>{
      props.handlePages("page",value)
    }

  useEffect(() => {

    if(!initialValueWS){
      var d = new Date();
      d.setMonth(d.getMonth() + 3);
      document.cookie = `selectedWorkspace=;expires=${d.toUTCString()};Path=/`;
      document.cookie = `selectedStore=;expires=${d.toUTCString()};Path=/`;
    }
    if(listWS.length > 0){
      let foundElementWS:any = listWS.find((obj:any)=> obj.workSpaceDTO.name === initialValueWS);
      setSelectedWS(foundElementWS)
    }
  }, [listWS, initialValueWS]);

    return(
      <div className={classes.list_container} style={{height:"100%"}}>
        {props.stateComponnent &&
          <div style={{width: "100%",padding:4}}>
            <Skeleton   height={80} />
            <Skeleton  height={80} />
            <Skeleton  height={80} />
          </div>
        }
        {!props.stateComponnent &&
        <div className={classes.container_list} style={{width:"100%",}}>
          <div className={classes.listAudit} style={{overflowY:"auto",overflowX:"hidden"}}>
            {props.listStore.storeDTOList.filter((store:any) => store.workspace.id === selectedWS?.workSpaceDTO.id).map((element:any,indexStore:any)=>(
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}} key={indexStore}>
                <div key={`div_userGroupe_value_${element.id}`} style={{width:'100%',padding:4}}>
                  <StoreItem store={element} stateComponnent={element} handleStore={props.handleStore} fold={props.fold} indexStore={indexStore}/>
                </div>
              </div>
              
            ))}
          </div>
          
        </div>
        }
        {!props.stateComponnent &&
        <div className={classes.pagination} style={{padding:8,height:'8%'}}>
            <Pagination id={`list_pagination`}  count={props.listStore.pagesNumber} page={(props.page)+1} onChange={handleChange} variant="outlined" disabled={props.listStore.pagesNumber < 2 ? true : false} />        
          </div>
        }
    </div>
    );
};
export default StoreListMode;
