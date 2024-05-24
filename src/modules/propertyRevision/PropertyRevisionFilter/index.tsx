import * as React from "react";
import { useState } from "react";
import { IPropertyRevisionFilter } from "types/models/interface";

import { Formik } from "formik";
import { SearchOutlined } from "@material-ui/icons";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Box, Button, Checkbox, CircularProgress, IconButton, ListItemText, MenuItem,  Typography } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { FormControl, Select } from "@mui/material";
import useStyles from "./styles";


const status = [
  {key:1,value:"DRAFT"},
  {key:2,value:"ONLINE"}
]
const operationType = [
  {key:1,value:"INSERT"}, 
  {key:2,value:"UPDATE"}, 
  {key:3,value:"DELETE"},
  {key:4,value:"PUBLISH"},
  {key:5,value:"PUBLISH DELETE"}
]


const checkSelectedItem = (values:any,element:any) =>{
  if(values === undefined){
    return false
  }else{
    return values.indexOf(element) > -1
  }
}

const createContextData = (contextData :any)=>{
  let result = []
  if(contextData !== undefined){
    for (let index = 0; index < contextData.length; index++) {
      const element = contextData[index];
      result.push({key:element.name,values:[]})
    }
  }
  return result
}




const PropertyRevisionFilter: React.FC<IPropertyRevisionFilter> = (props) => {
  const [loading,setLoading] = useState<any>(false)
  const classes = useStyles();

  /*const handleChange = (event:any,handleVal:any) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      handleVal("version",event.target.value);
    }
  };*/

  const handleChangeContext=( contextFilter:any,event: React.ChangeEvent<{ value: unknown }>,name:any,index:any) =>{
    let value: string[] = event.target.value as string[];
    let prevState = [...props.context];
    let data:any = {'key':name,'values':value}
    prevState[index] = value;
    if(contextFilter.length === 0){
      return [data]
  }
  else{
      if(contextFilter.find((item:any) => item.key === name)!==undefined){
          let dataset = contextFilter
          let elementndex = contextFilter.findIndex(((item:any) => item.key === name));
          dataset[elementndex].values = value
          return dataset
      }else{
          let dataset:any = contextFilter
          dataset.push(data)
          return dataset
      }
  }
  }
  
    return(
      <Formik
        enableReinitialize={true}
        initialValues={{
          csContextsDTOList: (props.context !== undefined && props.context.length !== 0) ? createContextData(props.context) : [],
          fromDate: props.filterData.fromDate !== undefined ? props.filterData.fromDate : null,
          operationTypeList: props.filterData.operationTypeList !== undefined ? props.filterData.operationTypeList : [],
          propertyKey: props.filterData.propertyKey !== undefined ? props.filterData.propertyKey : "", 
          statusList: props.filterData.statusList !== undefined ? props.filterData.statusList : [],
          storeId: props.filterData.storeId !== undefined ? props.filterData.storeId : null, 
          tagIdList: props.filterData.tagIdList !== undefined ? props.filterData.tagIdList : [],
          toDate: props.filterData.toDate !== undefined ? props.filterData.toDate : [],
          userLogin:props.filterData.userLogin !== undefined ? props.filterData.userLogin : "",
          version:(props.filterData.version !== undefined && props.filterData.version !== null )? props.filterData.version : ""
        }}
        onSubmit={(values:any) => {
          setLoading(true)
          props.handleFilter(values,setLoading)
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
                value={values.userLogin} 
                onChange={(event:any)=>{setFieldValue("userLogin",event.target.value)}}                                     
                label="User Name" 
                style={{width:200}}   
                variant="outlined"  
              />  
            </div>
            <div className={classes.filterContainer_form_element}>
              <TextField  
                size="small"
                key={`filter_key`}
                id={`input_key_filter`}
                disabled={props.stateComponnent} 
                className={classes.hover}
                value={values.propertyKey} 
                onChange={(event:any)=>{setFieldValue("propertyKey",event.target.value)}}                                     
                label="Key" 
                 style={{width:300}}  
                variant="outlined"  
              />  
            </div>
            <div className={classes.filterContainer_form_element} style={{display:'none'}}>
              <TextField  
                size="small"
                key={`filter_key`} 
                disabled={true}
                id={`input_source_filter`}
                className={classes.hover}
                value={props.sourceId === null ? '' : props.sourceId} 
                onChange={(event:any)=>{setFieldValue("userLogin",event.target.value)}}                                     
                label="Source" 
                style={{width:80}}    
                variant="outlined"  
              />  
            </div>
            <div className={classes.filterContainer_form_element}>
              <TextField  
                size="small"
                key={`filter_key`} 
                disabled={props.stateComponnent}
                id={`input_version_filter`}
                className={classes.hover}
                value={values.version} 
                
                onChange={(event:any)=>{
                    let versionValue:any = event.target.value
                    if((!isNaN(versionValue)&& parseInt(versionValue)>0) || versionValue.length === 0){
                      setFieldValue("version",event.target.value)
                    }
                 }
                }                                  
                label="Version" 
                style={{width:80}}    
                variant="outlined"  
              />  
            </div>
            <div style={{marginTop:4,display: "flex", alignItems: "center"}} className={classes.filterContainer_form_element}>
              <TextField
                disabled={props.stateComponnent}
                className={classes.filterDate} 
                id="datePicker_startDate"
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
            <div style={{marginTop:4,display: "flex", alignItems: "center"}} className={classes.filterContainer_form_element}>
              <TextField
                disabled={props.stateComponnent}
                className={classes.filterDate} 
                id="datePicker_endDate"
                label="To Date"
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
            
            <div style={{ marginTop:4,display: "flex", alignItems: "center", flexDirection: "row",paddingRight: "8px"}} >
              <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
                <span>Tag : </span>
              </Typography>
              <FormControl disabled={props.stateComponnent} size="small" style={{  paddingLeft: "4px",minWidth: "140px", maxWidth: "140px" }} >
                <Select multiple displayEmpty value={values.tagIdList} className={classes.root} onChange={(event:any)=>{setFieldValue('tagIdList',event.target.value)}} variant="outlined" inputProps={{ "aria-label": "Without label" }}
                  id='select_tag_filter'
                  renderValue={(selecteds) => {
                    if(selecteds === undefined){ return ""}
                    else{
                    if ((selecteds as string[]).length === 0) {
                      return "";
                    }
                    return (selecteds as string[]).join(",");
                  } 
                  }} 
                >
                  {props.tags.map((tag:any,index:any) => (
                    <MenuItem id={`MenuItem_tag_filter_index_${index}`} key={tag.id} value={tag.name}>
                      <Checkbox id={`Checkbox_tag_filter_index_${index}`}  color="primary" checked={checkSelectedItem(values.tagIdList,tag.name)} inputProps={{ "aria-label": "secondary checkbox", }} />
                      <ListItemText id={`ListItemText_tag_filter_index_${index}`}  primary={tag.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop:4,display: "flex", alignItems: "center", flexDirection: "row",paddingRight: "8px"}} >
              <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
                <span>Status </span>
              </Typography>
              <FormControl disabled={props.stateComponnent} size="small" style={{  paddingLeft: "4px",minWidth: "140px", maxWidth: "140px" }} >
                <Select multiple displayEmpty value={values.statusList} className={classes.root} onChange={(event:any)=>{setFieldValue('statusList',event.target.value)}} variant="outlined" inputProps={{ "aria-label": "Without label" }}
                  id={`select_Status_filter`}  
                  renderValue={(selecteds) => {
                    if(selecteds === undefined){ return ""}
                    else{
                    if ((selecteds as string[]).length === 0) {
                      return "";
                    }
                    let slectedData:any = selecteds.map((elementSelected:any)=>{
                      let element:any =  status.find((obj)=> obj.key === elementSelected)
                      return element.value
                    })
                    let data = (slectedData as string[]).join(", ");
                    return data
                  }
                  }} 
                >
                  {status.map((statusItem:any,index:any) => (
                    <MenuItem id={`MenuItem_status_filter_index_${index}`} key={statusItem} value={statusItem.key}>
                      <Checkbox id={`Checkbox_status_filter_index_${index}`} color="primary" checked={checkSelectedItem(values.statusList,statusItem.key)} inputProps={{ "aria-label": "secondary checkbox", }} />
                      <ListItemText id={`ListItemText_status_filter_index_${index}`} primary={statusItem.value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{marginTop:4, display: "flex", alignItems: "center", flexDirection: "row",paddingRight: "8px"}} >
              <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
                <span>Operation Type </span>
              </Typography>
              <FormControl disabled={props.stateComponnent} size="small" style={{  paddingLeft: "4px",minWidth: "140px", maxWidth: "140px" }} >
                <Select multiple displayEmpty 
                value={values.operationTypeList === undefined ? [] : values.operationTypeList } 
                className={classes.root} 
                onChange={(event:any)=>{setFieldValue('operationTypeList',event.target.value)}} 
                variant="outlined" inputProps={{ "aria-label": "Without label" }}
                  id={`select_operationType_filter`} 
                  renderValue={(selecteds) => {
                    if(selecteds === undefined){ return ""}
                    else{
                      if ((selecteds as string[]).length === 0) {
                      return "";
                      }
                      let slectedData:any = selecteds.map((elementSelected:any)=>{
                        let element:any =  operationType.find((obj)=> obj.key === elementSelected)
                        return element.value
                      })
                      return (slectedData as string[]).join(", ");
                    }
                  }} 
                >
                  {operationType.map((operationTypeItem:any,index:any) => (
                    <MenuItem id={`MenuItem_operationType_filter_index_${index}`}key={operationTypeItem} value={operationTypeItem.key}>
                      <Checkbox id={`Checkbox_operationType_filter_index_${index}`} color="primary" checked={checkSelectedItem(values.operationTypeList,operationTypeItem.key)} inputProps={{ "aria-label": "secondary checkbox", }} />
                      <ListItemText id={`ListItemText_operationType_filter_index_${index}`} primary={operationTypeItem.value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            
            {(!props.stateComponnent && values.csContextsDTOList.length !== 0 ) && values.csContextsDTOList.map((context: any, indexCS: number) => {
                return(
              <div style={{ marginTop:4,display: "flex", alignItems: "center", flexDirection: "row", minHeight:"36px",maxHeight:"36px",paddingRight: "8px"}} key={indexCS} >
                <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
                  <span>{context.key} </span>
                </Typography>
                <FormControl disabled={props.stateComponnent} style={{minWidth: "140px", maxWidth: "140px",maxHeight:"36px",minHeight:"36px", paddingLeft: "4px" }} size="small"  >
                  <Select
                    id={`select_context_filter_index_${indexCS}`}
                    name={context.key}
                    className={classes.root}
                    key={indexCS}
                    multiple
                    displayEmpty
                    value={ context.values === undefined ? [] : context.values}
                    renderValue={(vals) => {
                      if(vals !== undefined){
                        let valsStr = vals as string[];
                        return valsStr.join(",");
                      }
                    }}
                    onChange={function (event:any) {
                        let data = handleChangeContext(values.csContextsDTOList,event,context.key,indexCS)
                        setFieldValue('csContextsDTOList',data)
                    }}
                    variant="outlined"
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {props.context[indexCS].values !== undefined && props.context[indexCS].values.map((contextValue: any,indexVal:any) => (
                      <MenuItem id={`MenuItem_context_filter_index_${indexCS}_indexItem_${indexVal}`} key={indexCS} value={contextValue.value}>
                        <Checkbox id={`Checkbox_context_filter_index_${indexCS}_indexItem_${indexVal}`} color="primary" checked={ values.csContextsDTOList[indexCS].values === undefined ? false : checkSelectedItem(values.csContextsDTOList[indexCS].values,contextValue.value)} inputProps={{ "aria-label": "secondary checkbox", }} />
                        <ListItemText id={`ListItemText_context_filter_index_${indexCS}_indexItem_${indexVal}`} primary={contextValue.value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>)
            })}

          </div>
          <div className={classes.filterContainer_action}>
            {loading &&
              <div className={classes.progress}>
                <CircularProgress disableShrink size={20}/>   
            </div>
            }
            {!loading&&
            <div style={{display:'flex',alignItems:'center'}}>
              <IconButton id={`btn_reset_filter`} disabled={props.stateComponnent} className={classes.reset}   
                onClick={()=>{
                  handleReset() 
                  setFieldValue("fromDate",'')
                  setFieldValue("toDate",'')
                  setFieldValue("version",'')
                  if(props.sourceId !== null){
                    //props.history.push('/revision/property') 
                  }
                  props.handleSource(null)
                  }} >
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
export default PropertyRevisionFilter;
