import * as React from "react";
import { MenuItem } from "@material-ui/core";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import { AppState } from "redux/store";
import useStyles from "modules/store/styles";
import AppsContainer from "app/components/AppsContainer";
import AppsContent from "app/components/AppsContainer/AppsContent";
import {maxLengthValue} from "../../../../shared/constants/MaxLength";


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

const Step2 = () => {
  const [currency, setCurrency] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const storetype = [
    {
      value: 1,
      label: "Properties",
    },

    {
      value: 2,
      label: "YAML",
    },
    {
      value: 3,
      label: "JSON",
    },
  ];

  const classes = useStyles();

  const Data = useSelector((state: AppState) => state.stores.storeslist);

  function validateUsername(value: String) {
    let storeName: String = value.trim()
    let error;
    if (
        Data.find(
            (element: any) =>
                element.name.toLocaleLowerCase() === storeName.toLocaleLowerCase()
        )
    ) {
      error =
          "A store with name “" +
          storeName +
          "” already exists, please choose another name.";
    }
    return error;
  }

  return (
      <AppsContainer title="Store" fullView>
        <AppsContent>
          <MyTextField
              fullWidth
              id="store_name"
              name="name"
              variant="outlined"
              label="Name"
              required
              validate={validateUsername}
              className={classes.hover}
              margin="normal"
              size="small"
              inputProps={{ maxLength: maxLengthValue }}
          />

          <MyTextField
              id="store_description"
              name="description"
              label="Description"
              multiline
              fullWidth
              minRows={4}
              placeholder="description Here..."
              variant="outlined"
              className={classes.hover}
              margin="normal"
              size="small"
              inputProps={{ maxLength: maxLengthValue }}
          />

          <MyTextField

              name="type"
              select
              label="Store type"
              value={currency}
              fullWidth
              onChange={handleChange}
              helperText="Store type"
              variant="outlined"
              required
              className={classes.hover}
              margin="normal"
              size="small"
          >
            {storetype.map((option, index) => (
                <MenuItem id={`type_menuItems_${index}`} key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
            ))}
          </MyTextField>
        </AppsContent>
      </AppsContainer>
  );
};

export default Step2;