import * as React from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import ReorderIcon from "@material-ui/icons/Reorder";
import DeleteIcon from "@material-ui/icons/Delete";
import // createStyles,

"@material-ui/core";

import { FieldArray } from "formik";

import { useField } from "formik";
import { AppTheme } from "types/AppContextPropsType";
import { red } from "@material-ui/core/colors";

const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#e8f5e9",
        padding: "2px 2px",
      },
    },
  })
)(TableRow);
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#313541",
      color: theme.palette.common.white,
      padding: "8px 2px",
    },
    body: {
      fontSize: 14,
      padding: "1px 5px",
    },
  })
)(TableCell);

const useStyles = makeStyles((theme: AppTheme) => ({
  avatarRoot: {
    backgroundColor: red[500],
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
  },
  buttons: {
    color: "white",
    backgroundColor: "green",
    justifyContent: "flex-end",
  },

  footer: {
    padding: theme.spacing(8, 6),
    marginTop: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));
export type DataItem = {
  id: string;
  name: string;
  value: string;
};

export default function MaterialTable(reference: any) {
  const [items, setItems] = React.useState<DataItem[]>(
    reference.reference.current.values.testingformik
  );
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
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 4) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(4);
    });
  }

  return (
    <Card>
      <CardHeader
        title="Context keys"
        titleTypographyProps={{ variant: "h6" }}
      />

      <CardContent>
        <Paper>
          <FieldArray name="testingformik">
            {({ push, remove, form }) => (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable" direction="vertical">
                  {(droppableProvided: DroppableProvided) => (
                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      <colgroup>
                        <col style={{ width: "0%" }} />
                        <col style={{ width: "1%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "70%" }} />
                      </colgroup>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">
                            Priority
                          </StyledTableCell>
                          <StyledTableCell align="left">&nbsp;</StyledTableCell>
                          <StyledTableCell align="left">
                            Identifier
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Description
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            Actions
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reference.reference.current.values.testingformik.map(
                          (fields: any, index: number) => (
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
                                    <StyledTableCell align="inherit">
                                      <div
                                        {...draggableProvided.dragHandleProps}
                                      >
                                        <ReorderIcon />
                                      </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="inherit">
                                      <div>{index + 1}</div>
                                    </StyledTableCell>
                                    <StyledTableCell align="inherit">
                                      <MyTextField
                                        fullWidth
                                        required
                                        id={`testingformik.${index}.name`}
                                        name={`testingformik.${index}.name`}
                                        label="Identifier"
                                        onChange={form.handleChange}
                                        variant="outlined"
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell align="inherit">
                                      <MyTextField
                                        required
                                        fullWidth
                                        id={`testingformik[${index}].value`}
                                        name={`testingformik[${index}].value`}
                                        label="Description"
                                        onChange={form.handleChange}
                                        variant="outlined"
                                      />
                                    </StyledTableCell>

                                    <StyledTableCell align="inherit">
                                      <Avatar
                                        className={classes.avatarRoot}
                                        onClick={() => remove(index)}
                                      >
                                        <DeleteIcon />
                                      </Avatar>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              }}
                            </Draggable>
                          )
                        )}
                      </TableBody>

                      <Box
                        display="flex"
                        flexDirection="flex-end"
                        justifyContent="flex-end"
                        p={2}
                        m={1}
                        className={classes.footer}
                      >
                        <Button
                          variant="contained"
                          className={classes.buttons}
                          onClick={() => {
                            let up: string = uuid();
                            push({
                              id: up,
                              name: "",
                              value: "",
                            });
                          }}
                        >
                          Add
                        </Button>
                      </Box>

                      {droppableProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </FieldArray>
        </Paper>
      </CardContent>
    </Card>
  );
}
