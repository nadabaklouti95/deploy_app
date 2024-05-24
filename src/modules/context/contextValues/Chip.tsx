import { Chip, TextField } from "@material-ui/core";
import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";

interface AddNewTagProps {
  onAddNewTag: (tagToDelete: string) => void;
  item: any;
  index: number;
  idx: number;
  reference: any;

  modTags: (YN: string) => void;
  modtags: any;
}
const Chips: React.FC<AddNewTagProps> = ({onAddNewTag, modTags,item,index,idx,reference,modtags}) => {
  const classes = useStyles();
  const [isAddNewTag,setAddNewTag] = useState(false);
  const [newModTag,setModTag] = useState("");
  const [Err,setErr] = useState("");

  const onDeleteDelete = () => {
    onAddNewTag(item);
    modTags("close");
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  setModTag(value);
    if (value !== "") {
      setErr("");
    } else {
      setErr("value is mandatory");
    }
  };
  const pushinto = (YN: string) => {
    if (YN === "close") {
      onAddNewTag(item);
      modTags("close");
      setErr("");
      setAddNewTag(false);
    } else {
      modTags("");

      setAddNewTag(true);
      setModTag(item.value);
    }
  };

  return (
    <>
      {isAddNewTag ? (
        <>
          <div style={{ width: "120px" }}>
            <TextField id={`update_value_index_${index}`} variant="outlined"  value={newModTag} onChange={onInputChange} style={{ fontSize: "18px" }} fullWidth error={Boolean(Err)} helperText={Err} InputProps={{className: classes.valuesInput,}}/>
          </div>
          <div style={{ marginTop: -5, marginLeft: 4 }}>
            <div>
              <CheckIcon id={`confirm_update_value_index_${index}`} className={classes.pointer} color="primary" style={{ fontSize: "18px" }}
                onClick={() => {
                  setErr("");
                  if (newModTag === "") {
                    setErr("value is mandatory");
                  } else {
                    const found = reference.current.values.contextKeys[
                      idx
                    ].values.find(
                      (element: any) =>
                        element.value.toLowerCase() === newModTag.toLowerCase()
                    );
                    let objIndex =
                      reference.current.values.contextKeys[idx].values;

                    if (found) {
                      if (objIndex[index].value !== found.value) {
                        let val = found.value;
                        setErr(`value: ${val} is duplicated`);
                      } else {
                        objIndex[index].value = newModTag;

                        setAddNewTag(false);
                        modTags("close");
                      }
                    } else {
                      objIndex[index].value = newModTag;

                      setAddNewTag(false);
                      modTags("close");
                    }
                  }
                }}
              />
            </div>
            <div>
              <CloseIcon id={`cancel_update_value_index_${index}`} className={classes.pointer} color={"error"} fontSize="small" onClick={() => { pushinto("close"); }} />
            </div>
          </div>
        </>
      ) : (
        <Chip id={`update_value_Button_index_${index}`} key={item.id} color="primary" size="small" label={item.value}  className={classes.root} onClick={() => { pushinto(""); }} disabled={modtags}
          onDelete={() => {
            reference.current.values.contextKeys[idx].values.splice(index, 1);
            onDeleteDelete();
          }}
        />
      )}
    </>
  );
};

export default Chips;
