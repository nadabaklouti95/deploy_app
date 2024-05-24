import * as React from "react";
import { useState } from "react";

import {  ResultStatusEnum, RunningStatusEnum, TaskTypeEnum } from "shared/constants/AppConst";
import { ICsTaskFilter } from "types/models/interface";
import { ActionMode } from "shared/constants/AppEnums";
import useStyles from "./styles";

import { Formik } from "formik";

import { Box, Button, Checkbox, CircularProgress, IconButton, ListItemText, MenuItem, Typography } from "@material-ui/core";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { SearchOutlined } from "@material-ui/icons";
import TextField from '@mui/material/TextField';
import { FormControl, Select } from "@mui/material";


  interface MyFormValues {
    "fromDate": any,
    "toDate": any;
    "resultStatusId":string;
    "tagId":string;
    "taskTypeIds":string[];
    runningStatusId:String

  }

  const checkSelectedItem = (values:any,element:any) =>{
    if(values === undefined){
      return false
    }else{
      return values.indexOf(element) > -1
    }
  }


const CsTaskFilter: React.FC<ICsTaskFilter> = (props) => {
  const classes = useStyles();
  const [loading,setLoading] = useState<any>(false)
  
  const initialValues : MyFormValues = {
    "fromDate": null,
    "toDate": null,
    "resultStatusId":"",
    "tagId":"Latest",
    "taskTypeIds":[],
    "runningStatusId":''
}
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values:any) => {
        setLoading(true)
        props.handleFilter(ActionMode.DISPLAY_MODE,values,setLoading)
      }}
    >
    {(formik) => {const {handleReset,values,setFieldValue} = formik;
      return (
      <div className={classes.filterContainer}>
        <div className={classes.filterContainer_form}>
          <div className={classes.filterContainer_form_element}>
            <div className={classes.filterContainer_form_element_label}>
              <Typography>Tag :</Typography>
            </div>
            <div className={classes.filterContainer_form_element_value}>
              <FormControl disabled={props.stateComponnent} size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px" }} >
                <Select 
                  labelId="select-label" id="select_tag_filter" 
                  value={values.tagId} 
                  className={classes.root} 
                  onChange={(event:any)=>{
                    setFieldValue("tagId",event.target.value)
                  }} 
                  variant="outlined" 
                  inputProps={{ "aria-label": "Without label", }}
                >
                  {props.tagsLists.reverse().map((tag: any, index: number) => (
                    <MenuItem key={tag.name} id={`menuItem_tag_index_${index}`} value={tag.name}>
                      {tag.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.filterContainer_form_element}>
            <Typography variant="body1" gutterBottom className={classes.typographyStyle} >
              <span>Result :</span>
            </Typography>
            <FormControl disabled={props.stateComponnent} size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px" }}>
              <Select 
                labelId="select-label" id="select_Result_filter" 
                value={values.resultStatusId} 
                className={classes.root} 
                onChange={(event:any)=>{
                  setFieldValue('resultStatusId',event.target.value)
                }} 
                variant="outlined" inputProps={{ "aria-label": "Without label", }}
                renderValue={(selecteds:any) => {
                  if ((selecteds as string[]).length === 0) {
                    return "";
                    }
                    let element:any =  ResultStatusEnum.find((obj:any)=> obj.key === selecteds)
                    if(element !== undefined){return element.value}
                    else{ return ""}
                }}
                >
                  {ResultStatusEnum.map((res: any, index: number) => (
                    <MenuItem id={`menuItem_Result_filter${index}`}  key={res} value={res.key}>
                      {res.value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.filterContainer_form_element}>
            <Typography variant="body1" gutterBottom className={classes.typographyStyle} >
              <span>Running Status :</span>
            </Typography>
            <FormControl disabled={props.stateComponnent} size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px" }}>
              <Select 
                labelId="select-label" id={`select_runningStatus`} 
                value={values.runningStatusId} 
                className={classes.root} 
                onChange={(event:any)=>{
                  setFieldValue('runningStatusId',event.target.value)
                }} 
                variant="outlined" inputProps={{ "aria-label": "Without label", }}
                renderValue={(selecteds:any) => {
                  if ((selecteds as string[]).length === 0) {
                    return "";
                    }
                    let element:any =  RunningStatusEnum.find((obj:any)=> obj.key === selecteds)
                    if(element !== undefined){return element.value}
                    else{ return ""}
                }} 
                >
                  {RunningStatusEnum.map((res: any, index: number) => (
                    <MenuItem key={res} id={`menuItem_runningStatus_index_${index}`}  value={res.key}>
                      {res.value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.filterContainer_form_element}>
            <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
              <span>Task Type : </span>
            </Typography>
            <FormControl disabled={props.stateComponnent}  size="small" style={{  paddingLeft: "4px",minWidth: "140px", maxWidth: "140px" }} >
              <Select 
                id="select_taskType_filter"
                multiple displayEmpty 
                value={values.taskTypeIds} 
                className={classes.root} 
                onChange={(event: any)=>{
                  setFieldValue('taskTypeIds',event.target.value);
                }} 
                variant="outlined" 
                inputProps={{ "aria-label": "Without label" }}
                renderValue={(selecteds:any) => {
                  if ((selecteds as string[]).length === 0) {
                    return "";
                    }
                    let slectedData:any = selecteds.map((elementSelected:any)=>{
                      let element:any =  TaskTypeEnum.find((obj:any)=> obj.key === elementSelected)
                      return element.value
                    })
                    return (slectedData as string[]).join(", ");
                }}  
              >
                {TaskTypeEnum.map((rowTask:any,index:any) => (
                  <MenuItem id={`MenuItem_taskType_filter_index_${index}`} key={rowTask.key} value={rowTask.key}>
                    <Checkbox id={`Checkbox_taskType_filter_index_${index}`} color="primary" checked={checkSelectedItem(values.taskTypeIds,rowTask.key)} inputProps={{ "aria-label": "secondary checkbox", }} />
                    <ListItemText id={`ListItemText_taskType_filter_index_${index}`} primary={rowTask.value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.filterContainer_form_element}>
            <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center",marginRight:8}} >
              <span>From Date : </span>
            </Typography>
            <TextField
              disabled={props.stateComponnent}
              className={classes.filterDate} 
              id="datepicker_datetime_start_filter"
              label="From Date"
              type="datetime-local"
              value={values.fromDate}
              onChange={(event:any)=>{
                setFieldValue('fromDate',event.target.value)
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={classes.filterContainer_form_element}>
            <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center",marginRight:8}} >
              <span>To Date :</span>
            </Typography>
            <TextField
              disabled={props.stateComponnent}
              className={classes.filterDate} 
              id="datepicker_datetime_end_filter"
              label="End Date"
              type="datetime-local"
              value={values.toDate}
              onChange={(event:any)=>{
                setFieldValue('toDate',event.target.value)
              }}
              InputLabelProps={{
                shrink: true,
              }}
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
            <IconButton id={`btn_reset_filter`} disabled={props.stateComponnent} className={classes.reset}   onClick={()=>{handleReset() }} >
              <FilterAltOffIcon fontSize='small' style={{color:'#0A8FDC'}}/>
            </IconButton>
            <Box component="div" m={0}  className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, padding: 0,}} >
              <Button id={`btn_find_filter`} disabled={props.stateComponnent}   startIcon={<SearchOutlined />} onClick={()=>{formik.submitForm();}} className={classes.buttonFind}>Search</Button>
            </Box>
          </div>
          }
        </div>
      </div>
    )}}  
    </Formik> 
  )
};
export default CsTaskFilter;
