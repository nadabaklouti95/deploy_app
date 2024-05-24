import * as React from "react";

import {Box,Button,createStyles,Icon,Table,TableBody,TableCell, TableRow,Theme, withStyles,} from "@material-ui/core";
import _ from "lodash";

import {DragDropContext,Droppable,Draggable,DraggableProvided,DroppableProvided,DraggableStateSnapshot,DropResult,ResponderProvided,DroppableStateSnapshot} from "react-beautiful-dnd";

import "@material-ui/core";
import { FieldArray } from "formik";
import Alert from "@material-ui/lab/Alert";
import useStyles from "modules/store/styles";
import { green, grey } from "@material-ui/core/colors";
import AppsContent from "app/components/AppsContainer/AppsContent";
import AppsContainer from "app/components/AppsContainer";
import { ActionMode } from "shared/constants/AppEnums";
import ContextStep from "./ContextStep";

const checkStateAction = (values:any)=>{
  if(values.name === undefined){
    return ActionMode.DISPLAY_MODE
  }else{
    if(values.name.length === 0 && values.description.length === 0 && values.values.length === 0 ){
      return ActionMode.CREATION_MODE
    }else{
      return ActionMode.DISPLAY_MODE
    }
  }
  
}

const checkStateTable = (value:any)=>{
  if(value.length === 1 ){
    let stateFirstElement = checkStateAction(value[0])
    if(stateFirstElement === ActionMode.CREATION_MODE ){
      return false
    }else{
      return true
    }
  }else if(value.length > 1){
    return true
  }else{
    return false
  }
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#e8f5e9",
        // padding: "2px 2px",
      },
      height: "auto",
    },
  })
)(TableRow);
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#ffffff",
      color: theme.palette.common.white,
      padding: "10px 2px",
    },
    body: {
      fontSize: 14,
      backgroundColor: "#ffffff",
      padding: "0px 6px",
    },
  })
)(TableCell);

export type DataItem = {
  id: string;
  name: string;
  value: string;
};

export default function Step2(reference: any) {
  const [items, setItems] = React.useState<DataItem[]>();
  //const [empty, setempty] = React.useState(false);
  const [btnDisabled,setBtnDisabled] = React.useState<any>(false)

  const classes = useStyles();
  console.log(items);

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const data = reference.reference.current.values.testingformik;

    const newOrder: any = reorder(
      data,
      result.source.index,
      result.destination.index
    );
    setItems(newOrder);
    reference.reference.current.setFieldValue("testingformik", newOrder);
  };

  function uuid() {
    return "xxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 4) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(4);
    });
  }
  /*function reverse() {
    if (empty) {
      return "button";
    } else {
      return "submit";
    }
  }*/

  const handleAddContext = (actionMode: ActionMode,valueJson:any,indexElement:any,handleLoading:any,handleError:any) => {
    let contextList:any = reference.reference.current.values.testingformik;
    let errorDescription = 'Context description of key is empty'
    let errorName = 'Context name is empty'
    let errorsValues = 'Context values is empty'

    if(actionMode === ActionMode.CREATION_MODE){
      if(valueJson.name.length === 0 && valueJson.values.length === 0 && valueJson.description.length === 0){
        
        let errors = [errorDescription,errorName,errorsValues]
        handleError(errors)
        handleLoading(false)
      }
      else if (valueJson.name.length !== 0 && valueJson.values.length === 0 && valueJson.description.length === 0){
        handleError([errorDescription,errorsValues])
        handleLoading(false)
      }
      else if (valueJson.name.length === 0 && valueJson.values.length !== 0 && valueJson.description.length === 0){
        handleError([errorDescription,errorName])
        handleLoading(false)
      }
      else if (valueJson.name.length === 0 && valueJson.values.length === 0 && valueJson.description.length !== 0){
        handleError([errorDescription,errorsValues])
        handleLoading(false)
      }
      else if (valueJson.name.length !== 0 && valueJson.values.length !== 0 && valueJson.description.length === 0){
        handleError([errorDescription])
        handleLoading(false)
      }
      else if (valueJson.name.length === 0 && valueJson.values.length !== 0 && valueJson.description.length !== 0){
        handleError([errorName])
        handleLoading(false)
      }
      else if (valueJson.name.length !== 0 && valueJson.values.length === 0 && valueJson.description.length !== 0){
        handleError([errorsValues])
        handleLoading(false)
      }
      else{
        let lastElement:any = contextList[indexElement]
        let foundElementIndex:any = contextList.findIndex((obj:any)=> obj.name === valueJson.name)
        if((foundElementIndex !== (-1))&& (foundElementIndex !== indexElement)){
          handleError(['Identifier already exist'])
          handleLoading(false)
        }else{
        handleLoading(true)
        handleError([])
        handleLoading(false)
        lastElement.name = valueJson.name
        lastElement.description = valueJson.description
        lastElement.value = valueJson.values
        contextList[indexElement] = lastElement
        reference.reference.current.setFieldValue('testingformik',contextList)
        let foundNewItem:any = contextList.find((obj:any)=> obj.name.length === 0 && obj.description.length === 0 &&  obj.value.length === 0)

        if(foundNewItem === undefined){
          setBtnDisabled(false)
        }
        
        }
      }
     
    }
    if(actionMode === ActionMode.DELETE_MODE){
      contextList.splice(indexElement,1);
      reference.reference.current.setFieldValue('testingformik',contextList)
      setBtnDisabled(false)
    }
  }

  return (
    <FieldArray name="testingformik">
      {({ push, remove, form }) => (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <AppsContainer title="Context keys" fullView>
                <AppsContent>
                  <div style={{margin:'4px 0px 4px 0px',alignItems:'center',display:"flex"}}>
                    <Button
                      id="add_new_key"
                      fullWidth
                      className={classes.boardStylekey}
                      style={{width:'auto'}}
                      type="button"
                      disabled={ btnDisabled}
                      onClick={() => {
                        if ( form.errors &&  _.isArray(form.errors.testingformik) && reference.reference.current.values.testingformik.length > 0) {
                          setBtnDisabled(true)
                          //setempty(true);
                        } else {
                          let up: string = uuid();
                          setBtnDisabled(true)
                          push({
                            id: up,
                            name: "",
                            Cvalue: [],
                            "description": "",
                            "storeId": null,
                            "values":[],
                            value:[]
                          });
                          //setempty(false);
                        }
                      }}
                    >
                      <Icon
                        style={
                          form.errors &&
                          _.isArray(form.errors.testingformik) &&
                          reference.reference.current.values.testingformik
                            .length > 0
                            ? { color: grey[300] }
                            : { color: green[500] }
                        }
                      >
                        add_circle
                      </Icon>
                      Add new Context
                    </Button>
                  </div>
                  <div style={{display:'flex',width:'100%'}}>
                    {reference.reference.current.values.testingformik.length !==0 && checkStateAction(reference.reference.current.values.testingformik[reference.reference.current.values.testingformik.length - 1]) === ActionMode.CREATION_MODE &&   
                      <div className={classes.addContainer} style={{margin:'4px 0px 8px 0px'}}>
                        <ContextStep 
                          context={reference.reference.current.values.testingformik[reference.reference.current.values.testingformik.length - 1 ]} 
                          handleContext={handleAddContext} 
                          stateAction={checkStateAction(reference.reference.current.values.testingformik[reference.reference.current.values.testingformik.length - 1])} 
                          storeId={null} 
                          cancelAction={() => { console.log("cancel"); } } 
                          indexElement={reference.reference.current.values.testingformik.length - 1}
                          indexId={'add'}
                        />
                      </div>
                    }
                  </div>
                  <div style={{display:'flex',width:'100%'}}>
                    {checkStateTable(reference.reference.current.values.testingformik) &&
                      <div style={{display:'flex',width:'100%'}}>
                      <Table ref={provided.innerRef} {...provided.droppableProps} style={{border:'1px solid #D2CECE',padding:4,borderRadius:4}}>
                        <colgroup>
                          <col style={{ width: "100%",backgroundColor:'white' }} />
                        </colgroup>
                        <TableBody>
                          {reference.reference.current.values.testingformik.map((fields: any, index: number) => (
                              <Draggable
                                key={fields.id}
                                draggableId={fields.id}
                                index={index}
                              >
                                {(
                                  draggableProvided: DraggableProvided,
                                  snapshot: DraggableStateSnapshot
                                ) => {
                                  return (

                                      
                                        <StyledTableRow
                                          ref={draggableProvided.innerRef}
                                          {...draggableProvided.draggableProps}
                                        >
                                          
                                          <StyledTableCell align="inherit" style={{display:'flex',padding:'0px 12px 0px 2px',width:"100%"}} >
                                          {checkStateAction(fields) !== ActionMode.CREATION_MODE && 
                                            <div style={{display:'flex',width:"100%"}} {...draggableProvided.dragHandleProps} className={classes.addContainer}>
                                            <ContextStep 
                                              context={fields} 
                                              handleContext={handleAddContext} 
                                              stateAction={checkStateAction(fields)} 
                                              storeId={null} 
                                              cancelAction={() => { console.log("cancel"); } } 
                                              indexElement={index}
                                              indexId={index}
                                            />
                                            </div>
                                        }
                                          </StyledTableCell>
                                        </StyledTableRow>
                                      
                                  );
                                }}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </TableBody>
                        
                      </Table>
                      </div>
                    }
                  </div>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    {form.errors &&
                      _.isString(form.errors.testingformik) &&
                      _.isArray(form.touched.testingformik) && (
                        <Alert severity="error" style={{ width: "100%" }}>
                          {form.errors.testingformik}
                        </Alert>
                      )}
                  </Box>
                  
                </AppsContent>
              </AppsContainer>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </FieldArray>
  );
}
