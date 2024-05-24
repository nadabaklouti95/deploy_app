import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Paper } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as React from "react";
import useStyles from "../styles";
import * as Yup from "yup";
import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import { fetchError, fetchStart } from "redux/actions";
import { useDispatch } from "react-redux";
import { errorsType } from "modules/store/EditStore";
import Alert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";
import AccessButton from "shared/components/AccessButton";
import { ActionAccessMode } from "shared/constants/AppEnums";
import AccessTextField from "shared/components/AccessTextField";

interface EditTagProps {
  handleClose: () => void;
  handleEdit:any;
  selectedid: any;
  fetchData:any;
  selectedTag: {
    description: string;
    id: number;
    name: string;
    nextTags: [string];
    storeId: number;
  };
}

const EditTag: React.FC<EditTagProps> = ({
  selectedid,
  selectedTag,
  handleClose,
  handleEdit,
  fetchData
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [changes, setchanges] = React.useState(false);
  const [apiReturn, setApiErrors] = React.useState<errorsType[]>([]);

  const [tag, setTag] = React.useState({
    name: selectedTag.name,
    description: selectedTag.description,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setchanges(true);
    setTag({ ...tag, [name]: value });
    setApiErrors([]);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={tag}
      onSubmit={async (values) => {
        let TagData = {
          name: values.name,
          description: values.description,
          id: selectedTag.id,
          deleted: true,
          nextTags: selectedTag.nextTags,
          store:{
            id :selectedid.id
          }
        };
        await jwtAxios.post(`/cs-tag/update-tag?tagId=${selectedTag.id}`, TagData).then(async (response:any)=>{
          if (response && (response.status === 200 || response.status === 201)) {
            handleClose();
            fetchData()
          }
        }).catch(function (error) {
          let notify:any
          if(error.response !== undefined){
            if (error.response && error.response.status === 500 ) {
              dispatch(fetchStart());
              dispatch(fetchError(`${error.response.data.status} occurred, please contact your administrator.` as string));
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
              dispatch(fetchError(`Erreur  ${error.request.response.status} occurred, please contact your administrator.` as string));
              notify = () => toast.success(`Erreur ${error.response.data.status} occurred, please contact your administrator!`,{autoClose: 3000,theme :"colored",type:"error" });
              toast.dismiss();
              notify();
            }
            if (error.request.response.status === 491 || error.request.response.status === 490) {
              let eror :any= error.request.response.errors;
              setApiErrors(eror)
            }
          }     
          else {
            console.log(error)
          }
        })
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(" Name is required"),
        description: Yup.string().required("Description is required"),
      })}
    >
      {({ values, isSubmitting, errors }) => {
        return (
          <Form>
            <Card>
              <CardHeader
                title="Tag"
                titleTypographyProps={{ variant: "h6" }}
              />

              <CardContent>
                <Paper
                  style={{
                    boxShadow: "none",
                    maxHeight: 315,
                    minHeight: 250,
                  }}
                >
                  <Grid item={true} container spacing={3}>
                    <Grid item={true} xs={12}>
                      <AccessTextField
                        actionType={ActionAccessMode.WRITE_MODE}
                        fullWidth={true}
                        id="name"
                        name="name"
                        variant="outlined"
                        label="Name"
                        value={tag.name}
                        handleChange={onInputChange}
                        className={classes.hover}
                        helperText={errors.name}
                        error={Boolean(errors.name)}
                      />
                    </Grid>

                    <Grid item={true} xs={12}>
                      <AccessTextField
                        actionType={ActionAccessMode.WRITE_MODE}
                        id="description"
                        name="description"
                        label="Description"
                        handleChange={onInputChange}
                        multiline
                        fullWidth={true}
                        value={tag.description}
                        rows={4}
                        placeholder="description Here..."
                        variant="outlined"
                        className={classes.hover}
                        helperText={errors.description}
                        error={Boolean(errors.description)}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </CardContent>
            </Card>
            {apiReturn.map((errApi: any, index: number) => {
              return (
                <Alert severity="error" style={{ width: "100%" }} key={index}>
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
                  onClick={() => {
                    handleClose();
                  }}
                  variant="outlined"
                  color="secondary"
                  className={classes.buttonsSize}
                >
                  Cancel
                </Button>
                <AccessButton 
                  id={`add_form`} 
                  disabled={!changes}
                  color="primary"
                  actionType={ActionAccessMode.WRITE_MODE} 
                  className={classes.buttonsSize} 
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  variant="outlined"
                >
                  Ok
                </AccessButton>
              </Box>
            </Paper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditTag;
