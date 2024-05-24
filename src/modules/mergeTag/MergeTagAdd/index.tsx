import * as React from "react";
import useStyles from "./styles";
import CustomSwitch from "shared/components/ReadyToSwitch";

import { Formik } from "formik";
import * as Yup from "yup";

import { Grid, MenuItem, Select,CircularProgress,IconButton,ThemeProvider, createTheme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { green } from "@material-ui/core/colors";
import { labelField } from "shared/constants/AppCssCons";
import { IMergeTagAdd } from "types/models/interface";


const theme = createTheme({
    palette: {
    primary: green
    }
  });

const ValidationForm = Yup.object({
});


const MergeTagAdd: React.FC<IMergeTagAdd> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.addContainer}>
        <Formik
            initialValues={{
                tagSource: "",
                tagTarget: "",
                force:false
                }}
            validationSchema={ValidationForm}
            onSubmit={values => {    
                props.handleMerge(values)
            }}
        >
            {(formik) => {const {values,setFieldValue} = formik;
            return (
                <>
                    <div style={{display:"flex",alignItems:'center',width:'100%',justifyContent:'flex-start'}}>
                            <div style={{display:"flex",alignItems:'center',width:'100%',justifyContent:'space-between',flexWrap:'wrap'}}>
                                <div className={classes.tag__container} style={{display:"flex",alignItems:'center',justifyContent:'flex-start',flexWrap:'wrap'}}>
                                    <div className={classes.tag__container}>
                                        <div className={classes.tag} style={labelField}>Source Tag :</div>
                                        <div className={classes.tag__select}>
                                            <Select 
                                                labelId="select-tag-source" id="select_tag_source" 
                                                value={values.tagSource} 
                                                className={classes.root} 
                                                onChange={(newValue) => {
                                                    setFieldValue('tagSource',newValue.target.value)
                                                    props.errorAction.action(null)
                                                }}
                                                variant="outlined" inputProps={{ "aria-label": "Without label", }}>
                                                    {props.tagList.filter((tag:any) => tag.name !== "Latest").map((tag: any, index: number) => (
                                                    <MenuItem key={tag.name} id={`MenuItem_tag_source_index_${index}`} value={tag.name}>
                                                        {tag.name}
                                                    </MenuItem>
                                                    ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className={classes.tag__container}>
                                        <div className={classes.tag} style={labelField}>Target Tag :</div>
                                        <div className={classes.tag__select}>
                                            <Select 
                                                labelId="select_tag_target" id="select_tag_target" 
                                                value={values.tagTarget} 
                                                className={classes.root} 
                                                onChange={(newValue) => {
                                                    setFieldValue('tagTarget',newValue.target.value)
                                                    props.errorAction.action(null)
                                                }}
                                                variant="outlined" inputProps={{ "aria-label": "Without label", }}
                                            >
                                                {props.tagList.map((tag: any, index: number) => (
                                                    <MenuItem key={tag.name} id={`MenuItem_tag_target_index_${index}`} value={tag.name}>
                                                        {tag.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className={classes.publishProperties__container}>
                                            <div className={classes.publishProperties} style={labelField}>{values.force ? "Force Source":"Keep Latest"}</div>
                                            <div className={classes.publishProperties__switch}>
                                                <CustomSwitch 
                                                    checked={values.force} 
                                                    id={`customSwitch_force`} 
                                                    onChange={(event: any ) => { 
                                                        event.preventDefault() 
                                                        setFieldValue('force',event.target.checked)
                                                        props.errorAction.action(null)
                                                    }} 
                                                    name="checkedT" 
                                                    value={values.force}
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className={classes.publish__ations}>
                                    { props.loading === false ?
                                        <div className={classes.publish__ations}>
                                            <IconButton 
                                                id={`addPublish_cancel`} 
                                                className={classes.Add__btn} 
                                                color="secondary" 
                                                aria-label="cancelCreation" 
                                                onClick={()=>{
                                                    props.cancelPublish(false)
                                                    props.errorAction.action(null)
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <ThemeProvider theme={theme}>
                                                <IconButton id={`add_merge_confirm`} className={classes.Add__btn} style={{marginRight:4}} color="primary" aria-label="confirmCreation" onClick={()=>{ formik.submitForm(); }} >
                                                <CheckIcon />
                                                </IconButton>
                                            </ThemeProvider> 
                                            </div> :
                                            <div className={classes.progress}>
                                            <CircularProgress disableShrink size={20}/>   
                                        </div>
                                    }
                                </div>  
                            </div>
                    </div>
                    <Grid item xs={12} md={12} sm={12} style={{width:"100%"}}>
                        {(props.errorAction.value !== null) && props.errorAction.value.map((row:any,index:any)=>
                            (<Alert severity="error" key={index} className={classes.alert}>
                                {row}
                            </Alert>)
                        )}
                    </Grid>
                </>
            )}}  
        </Formik>
    </div>
    );
};

export default MergeTagAdd;
