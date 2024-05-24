import * as React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { IExportFilter } from "types/models/interface";
import useStyles from "./styles";

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {  Box,  Button,  CircularProgress,  IconButton, MenuItem, Typography } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { ResultStatusEnum } from "shared/constants/AppConst";
import { FormControl, Select } from "@mui/material";

const filterDataReset = {
    "resultStatusId": "",
    "tagId": 'Latest'
}


const ExportFilter:React.FC<IExportFilter> = (props) => {
    const classes = useStyles()
    const [loadingFilter,setLoadingFilter] = useState<any>(false)
    return (
        <Formik
                enableReinitialize={true}
                initialValues={{
                    tagId: props.mainValues.tagId,
                    resultStatusId:props.mainValues.resultStatusId
                }}
                onSubmit={(values ,actions)=> {
                    let data = values
                    setLoadingFilter(true)
                    props.handleFilter(data,setLoadingFilter)
                }}
            >
            {(formik) => {const {values,setFieldValue,setValues} = formik;
                return (
                <div className={classes.FilterContainer}>
                    <div className={classes.mainFilter}>
                        <div className={classes.mainFilter_filter}>
                            <div className={classes.mainFilter_filter_element}  >
                            <Typography variant="body1" gutterBottom className={classes.typographyStyle} >
                                <span>Tag :</span>
                            </Typography>
                            <FormControl size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px" }}>
                                <Select 
                                    disabled={props.disabled}
                                    labelId="select-label" id="select_tag" 
                                    value={values.tagId} 
                                    className={classes.root} 
                                    onChange={(event:any)=>{setFieldValue('tagId',event.target.value)}} 
                                    variant="outlined" inputProps={{ "aria-label": "Without label", }}>
                                    {props.tags.map((res: any, index: number) => (
                                        <MenuItem id={`select_tag_index_${index}`}  key={res.name} value={res.name}>
                                        {res.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </div>
                            <div className={classes.mainFilter_filter_element}  >
                                <Typography variant="body1" gutterBottom className={classes.typographyStyle} >
                                    <span>Result :</span>
                                </Typography>
                                <FormControl size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px" }}>
                                    <Select 
                                        disabled={props.disabled}
                                        labelId="select-label" id="select_result" 
                                        value={values.resultStatusId} 
                                        className={classes.root} 
                                        onChange={(event:any)=>{setFieldValue('resultStatusId',event.target.value)}} 
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
                                            <MenuItem id={`select_result_index_${index}`}  key={res.key} value={res.key}>
                                            {res.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className={classes.action}>
                        {!loadingFilter &&
                            <div style={{display:'flex',alignItems:'center'}}>    
                                <IconButton id={`btn_reset`} disabled={props.disabled} className={classes.expand} onClick={()=>{setValues(filterDataReset)}}>
                                        <FilterAltOffIcon fontSize='small' style={{color:'#0A8FDC'}}/>
                                </IconButton>
                                <Box  component="div" m={0}  className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, padding: 0,}} >
                                    <Button  disabled={props.disabled} id={`find_btn`} startIcon={<SearchOutlined />} onClick={()=>{formik.submitForm();}} className={classes.buttonFind}>Find</Button>
                                </Box>
                            </div>
                        }
                        {loadingFilter &&
                            <div className={classes.progress}>
                                <CircularProgress disableShrink size={20}/>   
                            </div>
                        }
                    </div>
                </div>
          );}}  
          </Formik> 
    );
};

export default ExportFilter;


