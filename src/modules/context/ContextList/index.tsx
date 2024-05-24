import { Table, TableBody, TableContainer, } from "@material-ui/core";
import { FieldArray, Form, Formik } from "formik";
import * as React from "react";
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import {  ContextTableRow, StyledTableCell } from "shared/components/StyledTable";
import { IContextList } from "types/interfaces/ContextInterface";
import ContextItem from "../ContextItem";
import useStyles from "./styles";
import { ActionMode } from "shared/constants/AppEnums";
import {Pagination, Skeleton} from "@material-ui/lab";

const ContextList: React.FC<IContextList> = (props) => {
  const classes = useStyles();

  return (
    <div style={{width:'100%',height:'100%'}}>
            {props.stateComponent &&
            <div style={{width: "100%",padding:4}}>
                <Skeleton   height={80} />
                <Skeleton  height={80} />
                <Skeleton  height={80} />
            </div>
            }
      <div className={classes.container_list}>

          <Formik
              enableReinitialize
              initialValues={{context: props.contextList}}
              onSubmit={async (values: any) => {
              }}


          >
              {({values, setFieldValue, errors}) => {
                  //setItems(values.context);

                  return (
                      <Form style={{width: "100%", height: '100%', display: 'flex', flexDirection: 'column'}}>
                          <FieldArray name="contextKeys">
                              {({push, remove, form}) => (
                                  <>
                                      <div style={{height: 'auto'}}>
                                          <TableContainer>
                                              <Table>
                                                  <colgroup>
                                                      <col style={{width: "100%", backgroundColor: 'white'}}/>
                                                  </colgroup>
                                                  <DragDropContext

                                                      onDragEnd={(params: any) => {
                                                          if (params.source !== null && params.destination !== null) {
                                                              const srcI = params.source.index;
                                                              const desI = params.destination.index;
                                                              values.context.splice(desI, 0, values.context.splice(srcI, 1)[0]);
                                                              //setItems([]);
                                                              let elementsList: any = JSON.parse(JSON.stringify(props.contextList))
                                                              elementsList = values.context.map((obj: any, index: any) => {

                                                                  obj.priority = index + 1
                                                                  return obj
                                                              })
                                                              props.handleContext(ActionMode.UPDATE_PRIORITY, elementsList, null, null)
                                                          }

                                                      }}
                                                  >
                                                      <Droppable droppableId="list" direction="vertical">
                                                          {(
                                                              provided: DroppableProvided,
                                                              snapshot: DroppableStateSnapshot
                                                          ) => (
                                                              <TableBody

                                                                  ref={provided.innerRef}
                                                                  {...provided.droppableProps}
                                                              >
                                                                  {values.context.map(
                                                                      (fields: any, index: number) => {
                                                                          return (
                                                                              <Draggable
                                                                                  key={fields.id}
                                                                                  draggableId={fields.id === null ? '' : fields.id.toString()}
                                                                                  index={index}
                                                                              >
                                                                                  {(
                                                                                      draggableProvided: DraggableProvided,
                                                                                      snapshot: DraggableStateSnapshot
                                                                                  ) => {
                                                                                      return (
                                                                                          <ContextTableRow
                                                                                              ref={draggableProvided.innerRef}
                                                                                              {...draggableProvided.draggableProps}
                                                                                          >
                                                                                              <StyledTableCell
                                                                                                  align="inherit"
                                                                                                  style={{
                                                                                                      display: 'flex',
                                                                                                      padding: 4,
                                                                                                      width: "100%"
                                                                                                  }}>
                                                                                                  <div style={{
                                                                                                      display: 'flex',
                                                                                                      width: "100%"
                                                                                                  }} {...draggableProvided.dragHandleProps}>
                                                                                                      <ContextItem
                                                                                                          handleContext={props.handleContext}
                                                                                                          contextItem={fields}
                                                                                                          fold={props.fold}
                                                                                                          contextIndex={index}
                                                                                                          contextList={values.context}/>
                                                                                                  </div>
                                                                                              </StyledTableCell>
                                                                                          </ContextTableRow>
                                                                                      );
                                                                                  }}
                                                                              </Draggable>
                                                                          );
                                                                      }
                                                                  )}
                                                                  {provided.placeholder}
                                                              </TableBody>
                                                          )}
                                                      </Droppable>
                                                  </DragDropContext>
                                              </Table>
                                          </TableContainer>
                                      </div>

                                  </>

                              )}
                          </FieldArray>
                      </Form>
                  );
              }}
          </Formik>


          <div className={classes.pagination} style={{padding: 8}}>
              <Pagination id={`list_pagination`} count={1} page={1} variant="outlined" disabled={true}/>
          </div>
      </div>
    </div>
  );

};

export default ContextList;
