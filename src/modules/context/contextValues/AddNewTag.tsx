import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {Icon,IconButton, Tooltip} from "@material-ui/core";
import useStyles from "./styles";
import {green,grey} from "@material-ui/core/colors";

interface AddNewTagProps {
  onAddNewTag: (tag: string) => void;
  id: number;
  index: number;
  reference: any;
  modtags: boolean;
  modTags: (YN: string) => void;
}

const AddNewTag: React.FC<AddNewTagProps> = ({onAddNewTag,index,reference, modtags,modTags}) => {
  const classes = useStyles();
  const [newTag, setNewTag] = useState("");
  const [isAddNewTag, setAddNewTag] = useState(false);
  const [Err, setErr] = useState("");

  const onAddTag = async () => {
    setNewTag("");
    setAddNewTag(false);
    onAddNewTag(newTag);
    modTags("close");
  };
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
          <div style={{width: "144px",}}>
            <TextField  id={`context_value_index_${index}`} variant="outlined" value={newTag} onChange={onInputChange} error={Boolean(Err)} helperText={Err} InputProps={{className: classes.valuesInput}} size="small"/>
          </div>
          <div style={{ marginTop: -5, marginLeft: 4 }}>
            <div>
              <CheckIcon className={classes.pointer} style={{ color:'#4caf4f',fontSize: "18px" }}
                onClick={() => {
                  setErr("");
                  if (newTag === "") {
                    setErr("value is mandatory");
                  }
                  if (newTag.toLowerCase() === 'all') {
                    setErr("You cannot use ALL for context value");
                  } else {
                    const found = reference.current.values.contextKeys[
                      index
                    ].values.find(
                      (element: any) =>
                        element.value.toLowerCase() === newTag.toLowerCase()
                    );

                    if (found && found.value) {
                      let val = found.value;

                      setErr(`value: ${val} is duplicated`);
                    } else {
                      reference.current.values.contextKeys[index].values.push({
                        id: null,
                        value: newTag,
                        keyId: reference.current.values.contextKeys[index].id,
                      });
                      onAddTag();
                    }
                  }
                }}
              />
            </div>
            <div>
              <CloseIcon  id={`cancel_button_index_${index}`}  className={classes.pointer} color={"error"} style={{ fontSize: "18px" }}
                onClick={() => {
                  setErr("");
                  setNewTag("");
                  setAddNewTag(false);
                  modTags("close");
                }}
              />
            </div>
          </div>
        </>
      ) : reference.current.values.contextKeys[index].name ? (
        <div style={{margin:4}}>
          <Tooltip title={"Add New Context Value "} arrow enterDelay={0} leaveDelay={400}>
          <span>
            <IconButton  id={`add_context_value_button_index_${index}`} disabled={modtags} onClick={AddActions} className={classes.addContext} >
            <Icon style={modtags ? { color: grey[300]} : { color: green[500] }} className={classes.addIcon} > add_circle </Icon>
          </IconButton>

          </span>

          </Tooltip>
        </div>
      ) : null}
    </>
  );
};

export default AddNewTag;
