
import * as React from "react";
import useStyles from "./styles";
import { IUserGroupeFilter } from "types/models/interface";

import { Box, Button, Checkbox, CircularProgress, IconButton, Typography } from "@material-ui/core";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { SearchOutlined } from "@material-ui/icons";
import { TextField } from "@mui/material";
import { ActionMode } from "shared/constants/AppEnums";
import { Formik } from "formik";
import { useState } from "react";

const UserGroupeFilter: React.FC<IUserGroupeFilter> = (props) => {
  const classes = useStyles();
  const [loading,setLoading] = useState<any>(false)
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
          "attachedToStore": false,
          "name": ""
      }}
      onSubmit={(values:any) => {
        setLoading(true)
        props.handleFilter(ActionMode.DISPLAY_MODE,values,setLoading)
      }}
    >
    {(formik) => {const {values,setFieldValue,handleReset} = formik;
      return (
      <div className={classes.filterContainer}>
        <div className={classes.filterContainer_form}>
          <div className={classes.filterContainer_form_element}>
            <TextField  
              size="small"
              key={`filter_name`}
              id={`input_name_filter`}
              disabled={props.stateComponnent} 
              className={classes.hover}
              value={values.name} 
              onChange={(event:any)=>{setFieldValue("name",event.target.value)}}                                     
              label="Name" 
              fullWidth   
              variant="outlined"  
            />  
          </div>
          <div className={classes.filterContainer_form_element}>
            <div className={classes.filterContainer_form_element_label}>
              <Typography>Attached to Store :</Typography>
            </div>
            <div className={classes.filterContainer_form_element_value}>
              <Checkbox 
                id={`check_attached_filter`}
                disabled={props.stateComponnent} 
                checked={values.attachedToStore} 
                value={values.attachedToStore}
                color='primary'
                size='small'
                className={classes.checkbox}
                onChange={(event: any ) => { setFieldValue("attachedToStore",event.target.checked)}} 
              />
            </div>
          </div>
        </div>
        <div className={classes.filterContainer_action}>
          {loading &&
            <div className={classes.progress}>
              <CircularProgress disableShrink size={20}/>   
          </div>
          }
          {!loading&&
          <div style={{display:'flex',alignItems:'center'}}>
            <IconButton id={`btn_reset_filter`} disabled={props.stateComponnent} className={classes.reset}   onClick={()=>{handleReset() }} >
              <FilterAltOffIcon fontSize='small' style={{color:'#0A8FDC'}}/>
            </IconButton>
            <Box component="div" m={0}  className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, paddingRight: 12,}} >
              <Button id={`btn_find_filter`} disabled={props.stateComponnent}   startIcon={<SearchOutlined />} onClick={()=>{formik.submitForm();}} className={classes.buttonFind}>Find</Button>
            </Box>
          </div>
          }
        </div>
      </div>
     )}}  
     </Formik> 
  )
};
export default UserGroupeFilter;
