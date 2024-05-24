import InfoView from "app/components/InfoView";

import {
  CircularProgress,
  createTheme,
  Grid,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as React from "react";

import useStyles from "../styles";
import { TagProps } from "../TagGraph";

import * as Yup from "yup";
import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import { fetchError, fetchStart } from "redux/actions";
import { useDispatch } from "react-redux";
import { errorsType } from "modules/store/EditStore";
import Alert from "@material-ui/lab/Alert";
import { defaultTag } from "shared/constants/AppConst";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { green } from "@material-ui/core/colors";
import { toast } from "react-toastify";
import AccessButton from "shared/components/AccessButton";
import { ActionAccessMode } from "shared/constants/AppEnums";
import AccessTextField from "shared/components/AccessTextField";

interface CreationTagProps {
  openCreation: any;
  tagsLists: TagProps[];
  selectedid: number;
  maxofTags: number;
  stateCreate:any;
  changeStateCreate:any;
  loadData:any;
  handleStateComponent:any;
  
}
const CreateTag: React.FC<CreationTagProps> = ({
  loadData,
  stateCreate,
  changeStateCreate,
  openCreation,
  tagsLists,
  selectedid,
  maxofTags,
  handleStateComponent
}) => {
  const classes = useStyles();
  const [nexttaglist, setNextTaglist] = React.useState<TagProps[]>([]);
  const [apiReturn, setApiErrors] = React.useState<errorsType[]>([]);
  const [hidden, setHidden] = React.useState(true); 
  const [loading,setLoading]= React.useState<boolean>(false)

  const [vlues, setVlues] = React.useState({
    name: "",
    description: "",
    source: tagsLists[0]?.name,
    next: "",
  });

  const [sourceValue, setSourceValue] = React.useState<string>(
    tagsLists[tagsLists.length-1]?.name
  );
  const theme = createTheme({
    palette: {
    primary: green
    }
  });
  const dispatch = useDispatch();

  const loadnext = async (id: number) => {
    try {
      const res = await jwtAxios.get<any>(`/cs-tag/get-next-tags?tagId=${id}`);

      if (res && res.status === 200) {
        setNextTaglist(res.data);
      }
    } catch (err:any) {
      if (
        err.response.data.status !== 491 &&
        err.response.data.status !== 490
      ) {
        dispatch(fetchStart());
        dispatch(
          fetchError(
            `  ${err.response.data.status} occurred, please contact your administrator.` as string
          )
        );
      }
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVlues({ ...vlues, [name]: value });
    setApiErrors([]);
  };
  const onChangeSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const Next = tagsLists.find(
      (element: any) => element.name === e.target.value
    );

    setSourceValue(e.target.value);
    setVlues({ ...vlues, [name]: value });
    setNextTaglist([]) 
    if(value !== defaultTag){
      loadnext(Next?.id as number);
      setHidden(false);
    }
    else{
      setHidden(true);
    }

        setApiErrors([]);
  };

  return (

        <div className={classes.tagsCreation__container}>
          <Formik
            enableReinitialize
            initialValues={vlues}
            onSubmit={async (values) => {
              let SourceTag:any = [];
              let NextTag:any = [];

              if (values.source === "") {
                SourceTag.push(tagsLists[0]);
              }
              if (values.source !== "") {
                const found = tagsLists.find(
                  (element) => element.name === values.source
                );

                SourceTag.push(found);
              }
              

              if (SourceTag[0]?.name === "Latest") {
                NextTag.push(null);
              }
              if (SourceTag[0]?.name !== "Latest") {
                const found = nexttaglist.find(
                  (element) => element.name === values.next
                );

                NextTag.push(found);
              }



              let sourceTag:any = SourceTag[0]
                sourceTag.deleted = false
              let TagData:any = {
                tagDTO: {
                  id: null,
                  name: values.name,
                  description: values.description,
                  store: {
                    id: selectedid},
                },
                sourceTagId: sourceTag.id,
                nextTagId: NextTag[0] === null ? NextTag[0] : NextTag[0].id,
              };


              try {
                const res = await jwtAxios.post(`/cs-tag/create-tag?storeId=${selectedid}`, TagData);
                let notify:any
                if (res && (res.status === 200 || res.status === 201)) {
                  notify = (value : String) => toast.success(value+" is now created!",{autoClose: 3000,theme :"colored" });
                  handleStateComponent(true)
                  setLoading(false)  
                  openCreation(false); 
                    notify(TagData.tagDTO.name as string);
                    loadData() 
                }
              } catch (err:any) {
                setLoading(false)
                setTimeout(() => {  
                  setLoading(false)  
                }, 1000);
                if (err.response.data.status === 491 ||err.response.data.status === 490 ||err.response.data.status === 492) {
                  setApiErrors(err.response.data.errors);
                }else {
                  dispatch(fetchError(`Oups ! Unexpected error with code : ${err.response.data.status} occurred, please contact your administrator.` as string));
                }
                if (err.response.data.status === 500) {
                  let notify:any
                  dispatch(fetchStart());
                  dispatch(fetchError(`Oups ! Unexpected error with code : ${err.response.data.status} occurred, please contact your administrator.` as string ));
                  notify = (value : String) => toast.success("occurred, please contact your administrator!",{autoClose: 3000,theme :"colored",type:"error" });
                  toast.dismiss();
                  notify(err.response.data.status as string);
                }
              }
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(" Name is required"),
              description: Yup.string().required("Description is required"),
              next: Yup.string().when("source", {
                is:defaultTag,
                then: Yup.string(),
                otherwise :Yup.string().required("Next Field is required"),
              })
            })}
          >
            {({ values, isSubmitting, errors }) => {
              return (
                <Form style={{width:'100%',display:'flex',flexDirection:'column',}}>
                  {maxofTags <= tagsLists.length ? (
                    <div style={{display:"flex",width:"100%",padding:8}}>
                      <Alert style={{width:"100%"}} severity="error" className={classes.alert}>
                        You are not allowed to create more than {maxofTags} tags
                      </Alert>
                    </div>
                  ) : (
                      <div>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <Grid item={true} container spacing={3} style={{padding:0}}>
                            <Grid item={true} xs={12} sm={6} style={{padding:0}}>
                              <div style={{padding:"12px 12px 0px 12px"}}>
                                <AccessTextField
                                  fullWidth={true}
                                  id="textfield_name_add"
                                  name="name"
                                  variant="outlined"
                                  label="Name"
                                  handleChange={onInputChange} 
                                  className={classes.tagCreation__textField}
                                  helperText={errors.name}
                                  error={Boolean(errors.name)}
                                  actionType={ActionAccessMode.WRITE_MODE}
                                />
                              </div>
                              
                            </Grid>
                            <Grid item={true} xs={12} sm={6} style={{padding:0}}>
                              <div style={{padding:"12px 12px 0px 12px"}}>
                                <AccessTextField
                                  actionType={ActionAccessMode.WRITE_MODE}
                                  fullWidth={true}
                                  name="source"
                                  label="Source"
                                  variant="outlined"
                                  id={`select_tag_source`}
                                  handleChange={onChangeSource}
                                  value={vlues.source}
                                  className={classes.tagCreation__textField}
                                  helperText={errors.source}
                                  error={Boolean(errors.source)}
                                  select={true}
                                  children={tagsLists.reverse().map((option:any,index:any) => (
                                    <MenuItem key={option.id} id={`select_tag_source_menuItem_index${index}`} value={option.name}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                />
                              </div>
                            </Grid>
                            <Grid item={true} xs={12} sm={6} style={{padding:0}}>
                              <div style={{padding:"12px 12px 12px 12px"}}>
                                <AccessTextField
                                  actionType={ActionAccessMode.WRITE_MODE}
                                  name="description"
                                  label="Description"
                                  handleChange={onInputChange}
                                  multiline
                                  fullWidth={true}
                                  rows={3}
                                  placeholder="description Here..."
                                  variant="outlined"
                                  className={classes.tagCreation__textField}
                                  helperText={errors.description}
                                  error={Boolean(errors.description)}
                                />
                            </div>
                              
                            </Grid>
                            <Grid item={true} xs={12} hidden={hidden} sm={6} style={{padding:0}}>
                              <div style={{padding:"12px 12px 0px 12px"}}>
                                <AccessTextField
                                  actionType={ActionAccessMode.WRITE_MODE}
                                  id={`select_tag_next`}
                                  name="next"
                                  select={true}
                                  label="Next"
                                  fullWidth={true}
                                  value={vlues.next}
                                  handleChange={onInputChange}
                                  variant="outlined"
                                  className={classes.tagCreation__textField}
                                  disabled={sourceValue === "Latest"}
                                  helperText={errors.next}
                                  error={Boolean(errors.next)}
                                  children={nexttaglist.reverse().map((option,index) => (
                                    <MenuItem key={option.id} id={`select_tag_next_menuItem_index${index}`} value={option.name}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                  )}

                  {apiReturn.map((errApi: any, index: number) => {
                    return (
                      <Alert severity="error" style={{ width: "100%" }} key={index}>
                        {errApi}
                      </Alert>
                    );
                  })}
                   <div style={{ display:'flex', border:'0.5px solid #0000001f', width: '100%'}} />

                  <div className={classes.tagsAction}>
                  {maxofTags <= tagsLists.length ? 
                    <IconButton className={classes.tag__btn} color="secondary" aria-label="cancelCreation" onClick={()=>{openCreation(false);}}>
                      < CloseIcon />
                    </IconButton>
                    :
                    <>
                      { loading === false ?
                        <>
                        <IconButton id='cancel_add' className={classes.tag__btn} color="secondary" aria-label="cancelCreation" onClick={()=>{openCreation(false);}}>
                          <CloseIcon />
                        </IconButton>
                        <AccessButton 
                          id={`confirm_add`}
                          className={classes.tag__btn}
                          actionType={ActionAccessMode.WRITE_MODE} 
                          style={{marginRight:4}}
                          color="primary"
                          ariaLabel={"confirmCreation"}
                          iconButton={true}
                          theme={theme}
                          tooltip={"Confirm"}
                          type="submit"
                        >
                          <CheckIcon />
                        </AccessButton>
                      </>
                        :
                      <div className={classes.progress}>
                        <CircularProgress disableShrink size={20}/>   
                      </div>

                      }   
                    </> 
                }    
                  </div>
                </Form>
              );
            }}
          </Formik>

          <InfoView />
        </div>
  );
};

export default CreateTag;
