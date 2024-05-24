import * as React from "react";
import { useState } from "react";
import useStyles from "./styles";

import { Formik } from "formik";
import { IStoreFilter } from "types/models/interface";
import { Box, Button, Checkbox, CircularProgress, IconButton, ListItemText, MenuItem, TextField, Typography } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { ActionMode } from "shared/constants/AppEnums";
import { FormControl, Select } from "@mui/material";





const status = [
  {key:1,value:"PROPERTIES"},
  {key:2,value:"YAML"},
  {key:3,value:"JSON"},
  
]
interface MyFormValues {
  storeName:any;
  storeTypeIds:any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const checkSelectedItem = (values:any,element:any) =>{
  if(values === undefined){
    return false
  }else{
    return values.indexOf(element) > -1
  }
}


const StoreFilter: React.FC<IStoreFilter> = (props) => {
  const [loading,setLoading] = useState<any>(false)
  const classes = useStyles();
  let intitialData : MyFormValues ={
    "storeName": "",
    "storeTypeIds": []
  }
 
  return(
    <Formik
      enableReinitialize={true}
      initialValues={intitialData}
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
              key={`filter_storeName`}
              id={`input_storeName_filter`}
              disabled={props.stateComponnent} 
              className={classes.hover}
              value={values.storeName} 
              onChange={(event:any)=>{setFieldValue("storeName",event.target.value)}}                                     
              label="Name" 
              fullWidth   
              variant="outlined"  
            />  
          </div>
          <div style={{marginTop:4, display: "flex", alignItems: "center", flexDirection: "row",paddingRight: "8px"}} >
            <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
              <span>store Type:</span>
            </Typography>
            <FormControl disabled={props.stateComponnent} size="small" style={{  paddingLeft: "4px",minWidth: "173px", width: "auto" }} >
              <Select multiple displayEmpty 
              id={`storeType_Filter_Select`} 
              value={values.storeTypeIds} 
              className={classes.root} 
              onChange={(event:any)=>{setFieldValue('storeTypeIds',event.target.value)}} 
              variant="outlined" 
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
                renderValue={(selecteds:any) => {
                  if ((selecteds as string[]).length === 0) {
                    return "";
                    }
                    let slectedData:any = selecteds.map((elementSelected:any)=>{
                      let element:any =  status.find((obj:any)=> obj.key === elementSelected)
                      return element.value
                    })
                    return (slectedData as string[]).join(", ");
                }} 
              >

                {status.map((statusItem:any,indexType:any) => (
                  <MenuItem id={`storeType_Filter_MenuItem_index_${indexType}`}  key={`storeType_Filter_MenuItem_index${indexType}`} value={statusItem.key}>
                    <Checkbox id={`storeType_Filter_Checkbox_index_${indexType}`} color="primary" checked={checkSelectedItem(values.storeTypeIds,statusItem.key)} inputProps={{ "aria-label": "secondary checkbox", }} />
                    <ListItemText id={`storeType_Filter_ListItemText_index_${indexType}`}  primary={statusItem.value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <IconButton id={`btn_reset_filter`} disabled={props.stateComponnent} className={classes.reset} onClick={()=>{handleReset() }} >
              <FilterAltOffIcon fontSize='small' style={{color:'#0A8FDC'}}/>
            </IconButton>
            <Box component="div" m={0}  className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, padding: 0,}} >
              <Button id={`btn_find_filter`} disabled={props.stateComponnent}   startIcon={<SearchOutlined />} onClick={()=>{formik.submitForm();}} className={classes.buttonFind}>Find</Button>
            </Box>
          </div>
          }
        </div>
      </div>
    )}}  
   </Formik> 
  );
};
export default StoreFilter;
