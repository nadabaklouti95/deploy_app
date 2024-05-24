import * as React from "react";
import useStyles from "./styles";
import TextField from '@mui/material/TextField';
import { Grid ,MenuItem, Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { ResultStatusEnum, RunningStatusEnum } from "shared/constants/AppConst";
import { FormControl, Select } from "@mui/material";

interface IUploadFilter {
  loadingFind:any;
  FindConfig:any;
  Tag:any;
  handleTagFilter:any;
} 



const UploadFilter: React.FC<IUploadFilter> = (props) => {
  const classes = useStyles()
  const [filterName,setFilterName] = React.useState<any>("")
  const [resultFilter,setResultFilter] = React.useState<any>("")
  const [runningStatus,setRunningStatus] = React.useState<any>("")
  const handleResultFilter = (event: any) => {setResultFilter(event.target.value);};
  const handleRunningStatus = (event: any) => {setRunningStatus(event.target.value);};
  const handleFilterName = (event: any) => {setFilterName(event.target.value);};
  const handeTag = (event:any)=> {props.handleTagFilter.action(event.target.value)}
  const handleFilter = ()=>{
    let tagId:any = props.Tag.find((element:any)=>element.name === props.handleTagFilter.state)
    props.FindConfig({filterName:filterName,resultFilter:resultFilter,runningStatus:runningStatus,tagId:tagId.id})
  }



  return (
    <div className={classes.Filter}>
      <Grid item xs={12} md={12} sm={12} style={{display:"flex",alignItems:'center',flexWrap:'wrap',minHeight:57}}>
          <div className={classes.nameContainer} >
            <TextField  style={{width:280}} value={filterName} onChange={handleFilterName} key='upload_Filter' label="Name" fullWidth   id="upload_Filter" variant="outlined"  className={classes.FilterName} /> 
          </div>
          <div style={{  display: "flex", alignItems: "center", flexDirection: "row",padding: "4px 10px" }}>
            <Typography variant="body1" gutterBottom className={classes.typographyStyle} >
              <span>Tag :</span>
            </Typography>
            <FormControl size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px" }}>
              <Select 
                labelId="select-label" id={`select_tag_filter`}  
                value={props.handleTagFilter.state} 
                className={classes.root} 
                onChange={handeTag} 
                variant="outlined" inputProps={{ "aria-label": "Without label", }}>
                  {props.Tag.map((res: any, index: number) => (
                    <MenuItem id={`MenuItem_tag_filter_index_${index}`} key={res.name} value={res.name}>
                      {res.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div style={{  display: "flex", alignItems: "center", flexDirection: "row",padding: "4px 10px" }}>
            <Typography variant="body1" gutterBottom className={classes.typographyStyle} >
              <span>Result :</span>
            </Typography>
            <FormControl size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px" }}>
              <Select 
                labelId="select-label" id={`select_result_filter`} 
                value={resultFilter} 
                className={classes.root} 
                onChange={handleResultFilter} 
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
                    <MenuItem id={`MenuItem_result_index_${index}`} key={res.key} value={res.key}>
                      {res.value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div  style={{  display: "flex", alignItems: "center", flexDirection: "row",padding: "4px 10px" }}>
            <Typography variant="body1" gutterBottom className={classes.typographyStyle} >
              <span>Running Status :</span>
            </Typography>
            <FormControl size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px" }}>
              <Select 
                labelId="select-label" id={`select_runningStatus`} 
                value={runningStatus} 
                className={classes.root} 
                onChange={handleRunningStatus} 
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
                  {RunningStatusEnum.map((status: any, index: number) => (
                    <MenuItem id={`MenuItem_runningStatus_filter_index_${index}`} key={status.key} value={status.key}>
                      {status.value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          
          <div style={{marginLeft:8,paddingBottom:4}}>
            { props.loadingFind === false ?
              <Box component="div" m={0} className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, padding: 0,}} >
                <Button id={`find_btn`} startIcon={<SearchOutlined />} onClick={handleFilter} className={classes.buttonFind}> 
                  Find
                </Button>
              </Box> :
              <div className={classes.progress}>
                <CircularProgress disableShrink size={18}/>   
              </div>
            }
          </div> 
      </Grid>
    </div>
  );
  
};
export default UploadFilter;
