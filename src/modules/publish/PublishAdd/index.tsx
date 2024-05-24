import * as React from "react";
import useStyles from "./styles";
import { IPublishAdd } from "types/models/interface";

import { Formik } from "formik";
import * as Yup from "yup";

import { Grid, MenuItem, CircularProgress,IconButton, createTheme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { green } from "@material-ui/core/colors";
import { ActionAccessMode, ETask, TaskTypeId } from "shared/constants/AppEnums";
import { labelField } from "shared/constants/AppCssCons";
import AccessButton from "shared/components/AccessButton";
import AccessSwitch from "shared/components/AccessSwitch";
import AccessSelect from "shared/components/AccessSelect";


const theme = createTheme({
    palette: {
    primary: green
    }
  });

const ValidationForm = Yup.object({
});


const PublishAdd: React.FC<IPublishAdd> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.addContainer}>
        <Formik
            initialValues={{
                publishEmptyProperties: false,
                updateGroupAccessRules: false,
                tag:"Latest"
                }}
            validationSchema={ValidationForm}
            onSubmit={values => {    
                let requestData={
                    "typeId":TaskTypeId.PUBLICATION,
                    "publishPropertyTaskDTO":{
                        "publishEmptyProperties":values.publishEmptyProperties,
                        "updateGroupAccessRules":values.updateGroupAccessRules
                    }
                
                }
                
                    props.handlePublish(requestData,values.tag)
            }}
         >
            {(formik) => {const {values,setFieldValue} = formik;
            return (
              <>
                    <div style={{display:"flex",alignItems:'center',width:'100%',justifyContent:'flex-start'}}>
                        <div style={{display:"flex",alignItems:'center',width:'100%',justifyContent:'flex-start',flexWrap:'wrap'}}>
                        <div className={classes.tag__container}>
                                <div className={classes.tag} style={labelField}>Tag :</div>
                                <div className={classes.tag__select}>
                                    <AccessSelect 
                                        actionType={ActionAccessMode.EXECUTE_MODE}
                                        labelId="select-label" id="select_tag" 
                                        value={values.tag} 
                                        className={classes.root} 
                                        handleChange={(newValue:any) => {
                                            setFieldValue('tag',newValue.target.value)
                                            props.errorAction.action(null)
                                        }}
                                        variant="outlined" inputProps={{ "aria-label": "Without label", }}
                                        children={props.tagList.map((tag: any, index: number) => (
                                            <MenuItem key={tag.name} id={`MenuItem_tag_index_${index}`} value={tag.name}>
                                                {tag.name}
                                            </MenuItem>
                                            ))
                                        }
                                    />
                                        
                                </div>
                            </div>
                                <div className={classes.publishProperties__container}>
                                    <div className={classes.publishProperties} style={labelField}>Publish Empty Properties :</div>
                                    <div className={classes.publishProperties__switch}>
                                        <AccessSwitch
                                            actionType={ActionAccessMode.EXECUTE_MODE}
                                            checked={values.publishEmptyProperties} 
                                            id={`addPublish_Empty_Properties`} 
                                            handleChange={(event: any ) => { 
                                                event.preventDefault() 
                                                setFieldValue('publishEmptyProperties',event.target.checked)
                                                props.errorAction.action(null)
                                            }} 
                                            name="checkedT" 
                                            value={values.publishEmptyProperties}
                                        />
                                    </div>
                                </div>
                            <div className={classes.accesRules_container}>
                            <div className={classes.accesRules} style={labelField}>Update Group Access Rules :</div>
                                <div className={classes.accesRules_switch}>
                                    <AccessSwitch
                                        actionType={ActionAccessMode.EXECUTE_MODE}
                                        id={`addPublish_Group_Access`}
                                        checked={values.updateGroupAccessRules} 
                                        handleChange={(event: any ) => { 
                                        event.preventDefault() 
                                        setFieldValue('updateGroupAccessRules',event.target.checked)
                                        props.errorAction.action(null)
                                        }} 
                                        name="checkedT" 
                                        value={values.updateGroupAccessRules}
                                    />
                                </div>
                            </div>
                        </div>
                            

                            <div className={classes.publish__ations}>
                                { props.loading === false ?
                                    <div className={classes.publish__ations}>
                                        <IconButton id={`addPublish_cancel`} className={classes.Add__btn} color="secondary" aria-label="cancelCreation" onClick={()=>{props.cancelPublish(false)}}>
                                            <CloseIcon />
                                        </IconButton>
                                        <AccessButton 
                                            taskName={ETask.PUBLISH}
                                            id={`addPublish_confirm`}
                                            className={classes.Add__btn}
                                            actionType={ActionAccessMode.EXECUTE_MODE} 
                                            style={{marginRight:4}}
                                            color="primary"
                                            ariaLabel={"confirmCreation"}
                                            handleClick={()=>{ formik.submitForm(); }}
                                            iconButton={true}
                                            theme={theme}
                                            tooltip={"Confirm"}
                                        >
                                            <CheckIcon />
                                        </AccessButton>
                                        </div> :
                                        <div className={classes.progress}>
                                        <CircularProgress disableShrink size={20}/>   
                                    </div>
                                }
                            </div>  
                        </div>


                <Grid item xs={12} md={12} sm={12}>
                  {(props.errorAction.value !== null) &&
                    props.errorAction.value.map((row:any,index:any)=>
                      (<Alert severity="error" key={index} className={classes.alert}>
                        {row}
                        </Alert>)
                      )
                    }
                    </Grid>
              </>
            )}}  
        </Formik>
      </div>
    );
};

export default PublishAdd;
