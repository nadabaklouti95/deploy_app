import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import  InfoView  from "app/components/InfoView";
import jwtAxios from "app/services/auth/jwt-auth/jwt-api";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchError, fetchStart, loadStore } from "redux/actions";
import useStyles from "../styles";
import Alert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";
import {truncateStoreName} from "../../../shared/constants/TruncateStoreName";
import {loadWorkspace} from "../../../redux/actions/Workspace";

interface IProps {
  selectedStore: {
    name: string;
    description: string;
    type: string;
  };
  handleClose: () => void;
}

export interface errorsType {
  errors: string;
}

const EditStore: React.FC<IProps> = ({ selectedStore, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [store, setstore] = React.useState(selectedStore);
  const [changes, setchanges] = React.useState(false);
  const [apiReturn, setApiErrors] = React.useState<errorsType[]>([]);

  const storetype = [
    {
      value: "Properties",
      label: "Properties",
    },
    {
      value: "YAML",
      label: "YAML",
    },
    {
      value: "JSON",
      label: "JSON",
    },
  ];

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiErrors([]);
    const { name, value } = e.target;
    setchanges(true);
    setstore({ ...store, [name]: value });
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={store}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          try {
            await jwtAxios.post("cs-store/update-store", store).then((response:any)=>{
              if (response && (response.status === 200 || response.status === 201)) {
                const notify = (storeName : String) => toast.success("The store "+truncateStoreName(storeName)+" is now updated!",{autoClose: 3000,theme :"colored" });
                dispatch(loadStore());
                dispatch(loadWorkspace());
                handleClose()
                notify(store.name as string);
              }
            }).catch(function (error) {
              let notify:any
              if(error.response !== undefined){
                if (error.response && error.response.status === 500 ) {
                  dispatch(fetchStart());
                  dispatch(fetchError(`Erreur ${error.response.data.status} occurred, please contact your administrator.` as string));
                  notify = () => toast.success(`Erreur ${error.response.data.status} occurred, please contact your administrator!`,{autoClose: 3000,theme :"colored",type:"error" });
                  toast.dismiss();
                  notify();
                } 
                if (error.response.status === 491 || error.response.status === 490) {
                  let eror :any= error.response.data.errors;
                  setApiErrors(eror)
                }
        
              }
              if(error.response === undefined){
                if (error.request && error.request.response.status === 500 ) {
                  dispatch(fetchStart());
                  dispatch(fetchError(`Erreur ${error.request.response.status} occurred, please contact your administrator.` as string));
                  notify = () => toast.success(`Erreur ${error.request.response.status} occurred, please contact your administrator!`,{autoClose: 3000,theme :"colored",type:"error" });
                  toast.dismiss();
                  notify();
                }
                console.log(error.request.response.status)
                
                if (error.request.response.status === 491 || error.request.response.status === 490) {
                  let eror :any= error.request.response.errors;
                  setApiErrors(eror)
                }
              }     
              else {
                console.log(error)
              }
            })
           
            
          } catch (err:any) {
            console.log(err.response, "responseUpdate");
            if (
              err.response.data.status === 491 ||
              err.response.data.status === 490
            ) {
              setApiErrors(err.response.data.errors);
            } else {
              dispatch(fetchStart());
              dispatch(
                fetchError(
                  `  ${err.response.data.status} occurred, please contact your administrator.` as string
                )
              );
            }
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(" Name is required"),
          description: Yup.string().required("Description is required"),
          type: Yup.string().required("Type is required"),
        })}
      >
        {({ values, isSubmitting, errors }) => {
          return (
            <Form id={`edit_store_form`}>
              <Card>
                <CardHeader
                  title="Store"
                  titleTypographyProps={{ variant: "h6" }}
                />

                <CardContent>
                  <Paper
                    style={{
                      boxShadow: "none",
                      maxHeight: 315,
                      minHeight: 375,
                    }}
                  >
                    <Grid item={true} container spacing={3}>
                      <Grid item={true} xs={12}>
                        <TextField
                          fullWidth
                          id="store_name_update"
                          name="name"
                          variant="outlined"
                          label="Name"
                          value={store.name}
                          onChange={onInputChange}
                          className={classes.hover}
                          helperText={errors.name}
                          error={Boolean(errors.name)}
                        />
                      </Grid>

                      <Grid item={true} xs={12}>
                        <TextField
                          id="store_description_update"
                          name="description"
                          label="Description"
                          value={store.description}
                          onChange={onInputChange}
                          multiline
                          fullWidth
                          rows={4}
                          placeholder="description Here..."
                          variant="outlined"
                          className={classes.hover}
                          helperText={errors.description}
                          error={Boolean(errors.description)}
                        />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <TextField
                          id="store_type_update"
                          name="store_type_update"
                          select
                          label="Store type"
                          value={store.type}
                          fullWidth
                          onChange={onInputChange}
                          variant="outlined"
                          className={classes.hover}
                          helperText={errors.type}
                          error={Boolean(errors.type)}
                        >
                          {storetype.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Paper>
                </CardContent>
              </Card>

              {apiReturn.map((errApi: any, index: number) => {
                return (
                  <Alert key={index} severity="error" style={{ width: "100%" }}>
                    {errApi}
                  </Alert>
                );
              })}

              <Paper>
                <Box
                  component="span"
                  m={1}
                  className={`${classes.spreadBox} ${classes.box}`}
                >
                  <Button
                    id="store_cancel_update"
                    onClick={handleClose}
                    variant="outlined"
                    color="secondary"
                    className={classes.buttonsSize}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    id="store_confirm_update"
                    variant="outlined"
                    color="primary"
                    className={classes.buttonsSize}
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={!changes}
                  >
                    Save
                  </Button>
                </Box>
              </Paper>
            </Form>
          );
        }}
      </Formik>
      <InfoView />
    </>
  );
};

export default EditStore;
