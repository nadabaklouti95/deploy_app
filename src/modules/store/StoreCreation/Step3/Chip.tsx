import { Chip, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    fontSize: 14,
    margin: 8,
    padding: "8px 4px",
    color: theme.palette.primary.contrastText,
  },
  roundedXl: {
    borderRadius: 4,
  },
  greyColorRoot: {
    backgroundColor: theme.palette.grey[200],
  },
  pointer: {
    cursor: "pointer",
  },
}));

interface AddNewTagProps {
  onAddNewTag: (tagToDelete: string) => void;
  item: any;
  index: number;
  idx: number;
  reference: any;
}

const Chips: React.FC<AddNewTagProps> = ({
  onAddNewTag,
  item,
  index,
  idx,
  reference,
}) => {
  const [isDeletetag, setDeletetag] = useState(false);
  console.log(isDeletetag);

  const onDeleteDelete = () => {
    onAddNewTag(item);

    setDeletetag(false);
  };

  const classes = useStyles();

  return (
    <Chip
      key={item.id}
      color="primary"
      size="small"
      label={item.value}
      className={classes.root}
      onDelete={() => {
        reference.current.values.testingformik[idx].Cvalue.splice(index, 1);
        onDeleteDelete();
      }}
    />
  );
};

export default Chips;
