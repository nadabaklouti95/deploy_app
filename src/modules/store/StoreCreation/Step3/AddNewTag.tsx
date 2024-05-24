import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import { Box, Icon, IconButton } from "@material-ui/core";
import useStyles from "modules/store/styles";
import { green, grey } from "@material-ui/core/colors";

interface AddNewTagProps {
  onAddNewTag: (tag: string) => void;
  id: number;
  index: number;
  reference: any;
  modTags: (YN: string) => void;
  modtags: boolean;
  checkErreur:any;
}

const AddNewTag: React.FC<AddNewTagProps> = ({
  onAddNewTag,
  index,
  id,
  reference,
  modtags,
  modTags,
  checkErreur
}) => {
  const [newTag, setNewTag] = useState("");
  const [Err, setErr] = useState("");

  const [isAddNewTag, setAddNewTag] = useState(false);

  const onAddTag = () => {
    onAddNewTag(newTag);
    setNewTag("");
    setAddNewTag(false);
  };

  const classes = useStyles();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTag(value);
    if (value !== "") {
      setErr("");
    } else {
      setErr("value is mandatory");
    }
  };
  const AddActions = () => {
    setAddNewTag(true);
    modTags("");
  };

  return (
    <>
      {isAddNewTag ? (
        <>
          <div style={{ width: "143px" }}>
            <TextField
              id={`store_context_value_${index}`}
              variant="outlined"
              value={newTag}
              onChange={onInputChange}
              InputProps={{
                className: classes.valuesInput,
              }}
              error={Boolean(Err)}
              helperText={Err}
              size="small"
            />
          </div>
          <div style={{ marginTop: -3, marginLeft: 4 }}>
            <div>
              <CheckIcon
                id={`store_context_value_confirm__${index}`}
                className={classes.pointer}
                color="primary"
                style={{ fontSize: "18px" }}
                onClick={() => {
                  setErr("");
                  if (newTag === "") {
                    setErr("value is mandatory");
                  }
                  if(newTag.toLowerCase() === 'all'){
                    setErr("You cannot use ALL for context value");
                  }
                  else {
                    const found = reference.current.values.testingformik[
                      index
                    ].Cvalue.find(
                      (element: any) =>
                        element.value.toLowerCase() === newTag.toLowerCase()
                    );
                    if (found) {
                      let val = found.value;

                      setErr(`value: ${val} is duplicated`);
                    } else {
                      onAddTag();
                      reference.current.values.testingformik[index].Cvalue.push(
                        {
                          value: newTag,
                          id: null,
                          keyid: null,
                        }
                      );
                      checkErreur("")
                      modTags("close");
                    }
                  }
                }}
              />
            </div>
            <div>
              <CloseIcon
                id={`store_context_value_cancel__${index}`}
                className={classes.pointer}
                color={"error"}
                style={{ fontSize: "18px" }}
                onClick={() => {
                  setAddNewTag(false);
                  modTags("close");
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <Box style={{ margin: "3px" }}>
          <IconButton id={`store_context_value_add__${index}`} disabled={modtags} onClick={AddActions} className={classes.addContext}>
            <Icon style={modtags ? { color: grey[900] } : { color: green[500] }} className={classes.addIcon}>add_circle</Icon>
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default AddNewTag;
