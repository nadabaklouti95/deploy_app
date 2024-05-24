import * as React from "react";
import useStyles from "./styles";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CsPropertiesDefault from "../csPropertiesDefault";
import { IPropertyList } from "types/models/interface";
import TreeProperty from "../TreeProperty";
import { Pagination, Skeleton } from "@material-ui/lab";


export const dataContext = React.createContext({data:null});

const PropertiesList: React.FC<IPropertyList> = (props) => {
  const classes = useStyles();
  const handleChange = (event:any, value:any) =>{
    props.handleChangePage(event,value)
  }

  return (
      <div className={classes.list_container} style={{height:"100%"}}>    
        {props.stateComponnent &&
          <div style={{width: "100%",padding:4}}>
            <Skeleton   height={80} />
            <Skeleton  height={80} />
            <Skeleton  height={80} />
          </div>
        }
          {!props.stateComponnent && (props.listProperty.csPropertyKeyViewDTOList !== null && !props.modeView) && 
            <div className={classes.list_container}>
                <div id={`properties_container`} className={classes.container_list} style={{width:"100%",}}>
                  {props.listProperty.csPropertyKeyViewDTOList?.length > 0 && props.listProperty.csPropertyKeyViewDTOList.map((row:any,index:any)=>(

                      <div style={{width:'100%',padding:4}} key={index}>
                      <CsPropertiesDefault
                        key={`CsPropertiesDefault_${index}`}
                        fold={props.fold}
                        stateActionAccord={props.stateActionAccord}
                        properties={row}
                        storeType={props.storeType}
                        handleKey={props.handleKey}
                        handleValue={props.handleValue}
                        deleteKey={props.deleteKey}
                        deleteValue={props.deleteValue}
                        ContextData={props.ContextData}
                        changeStatusValue={props.changeStatusValue}
                        cancelKey={props.cancelKey}
                        stateValue={props.stateValue}
                        selectedTag={props.tagId}
                        handleNewPropertyKey={props.handleNewPropertyKey}
                        handlePropertyFiler={props.handlePropertyFiler} 
                        modeView={props.modeView}      
                        indexElement={index}
                        publishProperty={props.publishProperty}
                        addValueState={props.addValueState}
                      />
                    </div>
                  ))}
              </div>
              <div className={classes.pagination} style={{padding:8,height:'8%'}} >
                <Pagination 
                  id={`list_pagination`} 
                  count={props.listProperty.pagesNumber} 
                  page={(props.page)+1} 
                  onChange={handleChange} 
                  variant="outlined" 
                  disabled={props.listProperty.pagesNumber < 2 ? true : false} 
                />
              </div>
            </div>
          }
          {(props.listProperty.csPropertyKeyViewDTOList !== null && props.modeView) &&
          <div className={classes.listProperties} style={{ paddingTop: 0, width: "100",flexDirection:'column'}} id="content" >

              {(props.listProperty.csPropertyKeyViewDTOList !== null && props.modeView) &&
            <>
              {props.propertyTree.map((elementProp:any,indexTree:any)=>(
                      <TreeProperty
                        key={`tree_property_${indexTree}`}
                        id={elementProp.csPropertyKeyViewDTO.keyID}
                        name={elementProp.csPropertyKeyViewDTO.key}
                        property={elementProp} 
                        storeType={props.storeType} 
                        handleKey={props.handleKey} 
                        handleValue={props.handleValue} 
                        deleteKey={props.deleteKey} 
                        deleteValue={props.deleteValue} 
                        ContextData={props.ContextData} 
                        changeStatusValue={props.changeStatusValue} 
                        cancelKey={props.cancelKey} 
                        stateValue={props.stateValue} 
                        selectedTag={props.tagId} 
                        handleNewPropertyKey={props.handleNewPropertyKey} 
                        handlePropertyFiler={props.handlePropertyFiler} 
                        requestData={props.requestData}
                        indexElement={indexTree}
                        publishProperty={props.publishProperty}
                        publishResponse={props.publishResponse}
                        addValueState={props.addValueState}
                      />
                ))
              }
            </>
          }
          </div>
          }
        <ToastContainer />
        </div> 
        
  );
};

export default PropertiesList;
