
import * as React from "react";
import useStyles from "./styles";
import { ITagFilter } from "types/models/interface";

import { Box, Button, CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { SearchOutlined } from "@material-ui/icons";
import { TextField } from "@mui/material";
import { ActionMode } from "shared/constants/AppEnums";
import { Formik } from "formik";
import { useState } from "react";



const TagFilter: React.FC<ITagFilter> = (props) => {
  const classes = useStyles();
  const [loading,setLoading] = useState<any>(false)
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
          "name": "",
      }}
      onSubmit={(values:any) => {
        setLoading(true)
        props.handleFilter(ActionMode.DISPLAY_MODE,values,setLoading,null)
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
              disabled={props.stateComponnent || props.disabled} 
              className={classes.hover}
              value={values.name} 
              onChange={(event:any)=>{setFieldValue("name",event.target.value)}}                                     
              label="Name" 
              fullWidth   
              variant="outlined"  
            />  
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
            <Tooltip title={"Reset Filter"} arrow enterDelay={0} leaveDelay={100}>
              <span>
                  <IconButton id={`btn_reset_filter`} disabled={props.stateComponnent || props.disabled} className={classes.reset}   onClick={()=>{handleReset() }} >
                      <FilterAltOffIcon fontSize='small' style={{color:'#0A8FDC'}}/>
                  </IconButton>
              </span>

            </Tooltip>
            <Box component="div" m={0}  className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, paddingRight: 8,}} >
              <Button id={`btn_find_filter`} disabled={props.stateComponnent || props.disabled }   startIcon={<SearchOutlined />} onClick={()=>{formik.submitForm();}} className={classes.buttonFind}>Find</Button>
            </Box>
          </div>
          }
        </div>
      </div>
     )}}  
     </Formik> 
  )
};
export default TagFilter;
