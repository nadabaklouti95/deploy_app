import * as React from "react";
import useStyles from "./styles";
import { IPropertiesFilter } from "types/models/interface";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Box, Button, Checkbox, CircularProgress, FormControl, IconButton, ListItemText, MenuItem,Select, Tooltip, Typography} from "@material-ui/core";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { SearchOutlined } from "@material-ui/icons";
import { StatusEnum, TypeListEnum } from "shared/constants/AppConst";



const checkSelectedItem = (values:any,element:any) =>{
  if(values === undefined){
    return false
  }else{
    return values.indexOf(element) > -1
  }
}

const PropertiesFilter : React.FC<IPropertiesFilter>= (props) => {    
  const classes = useStyles()
  const handleFind = () =>{
    props.FindProperty(null)
  }
  const handleReset = ()=>{
    if(!props.modeView){
      props.resetFilter()
    }  
  }
  return (
    <div style={{ display: "flex",flexDirection: "row",width:'100%',padding:8,justifyContent:'space-between'}} >
      <div className={classes.filterContainer_form}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", flexDirection: "row", alignContent: "space-between"}} >
            <div style={{  display: "flex", alignItems: "center", flexDirection: "row",paddingRight: "8px",paddingBottom:8 }} >
              <Typography variant="body1" gutterBottom className={classes.typographyStyle} >
                <span>Tag</span>
              </Typography>
              <FormControl  size="small" style={{ minWidth: "140px", maxWidth: "140px",paddingLeft: "4px"}} >
                <Select labelId="select-label" id="select_tag_filter" value={props.TagFilter} className={classes.root} onChange={props.handleChangeTag} variant="outlined" inputProps={{ "aria-label": "Without label", }}>
                  {props.tagsLists.map((tag: any, index: number) => (
                    <MenuItem id={`MenuItem_tagFilter_index_${index}`} key={tag.name} value={tag.name}>
                      {tag.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "row",paddingRight: "8px",paddingBottom:8}} >
              <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
                <span>Type </span>
              </Typography>
              <FormControl   size="small" style={{  paddingLeft: "4px",minWidth: "140px", maxWidth: "140px" }} >
                <Select multiple displayEmpty value={props.Type} className={classes.root} onChange={props.handleChangeType} variant="outlined" inputProps={{ "aria-label": "Without label" }}
                  id={'select_type_filter'}
                  renderValue={(selecteds:any) => {
                    if(selecteds === undefined){ return ""}
                    else{
                    if ((selecteds as string[]).length === 0) {
                      return "";
                    }
                    let slectedData:any = selecteds.map((elementSelected:any)=>{
                      let element:any =  TypeListEnum.find((obj)=> obj.key === elementSelected)
                      return element.value
                    })
                    let data = (slectedData as string[]).join(", ");
                    return data
                  }
                  }}  >
                    {TypeListEnum.map((typeRow:any,index:any) => (
                      <MenuItem id={`MenuItem_typeFilter_index_${index}`} key={typeRow.key} value={typeRow.key}>
                        <Checkbox id={`Checkbox_typeFilter_index_${index}`} color="primary" checked={checkSelectedItem(props.Type,typeRow.key)} inputProps={{ "aria-label": "secondary checkbox", }} />
                        <ListItemText id={`ListItemText_typeFilter_index_${index}`} primary={typeRow.value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ display: "flex", alignItems: "center", flexDirection: "row",paddingRight: "8px",paddingBottom:8}} >
              <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
                <span>Status </span>
              </Typography>
              <FormControl  size="small" style={{  paddingLeft: "4px",minWidth: "140px", maxWidth: "140px" }} >
                <Select multiple displayEmpty value={props.status} className={classes.root} onChange={props.handleStatus} variant="outlined" inputProps={{ "aria-label": "Without label" }}
                  id={'select_status_filter'}
                  renderValue={(selecteds:any) => {
                    if(selecteds === undefined){ return ""}
                    else{
                    if ((selecteds as string[]).length === 0) {
                      return "";
                    }
                    let slectedData:any = selecteds.map((elementSelected:any)=>{
                      let element:any =  StatusEnum.find((obj)=> obj.key === elementSelected)
                      return element.value
                    })
                    let data = (slectedData as string[]).join(", ");
                    return data
                    }
                  }}  
                >
                    {StatusEnum.map((statusEnum:any,index:any) => (
                      <MenuItem id={`MenuItem_statusFilter_index_${index}`} key={statusEnum.key} value={statusEnum.key}>
                        <Checkbox id={`Checkbox_statusFilter_index_${index}`} color="primary" checked={checkSelectedItem(props.status,statusEnum.key)} inputProps={{ "aria-label": "secondary checkbox", }} />
                        <ListItemText id={`ListItemText_statusFilter_index_${index}`} primary={statusEnum.value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {props.ContextData.map((context: any, index: number) => (
                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", minHeight:"36px",maxHeight:"36px",paddingRight: "8px",paddingBottom:8}} key={index} >
                  <Typography variant="body1" gutterBottom style={{display: "flex", alignItems: "center"}} >
                    <span>{context.name} </span>
                  </Typography>
                  <FormControl  style={{minWidth: "140px", maxWidth: "140px",maxHeight:"36px",minHeight:"36px", paddingLeft: "4px" }} size="small"  >
                    <Select
                      id={`select_context_filter_index_${index}`}
                      name={context.name}
                      className={classes.root}
                      key={index}
                      multiple
                      displayEmpty
                      value={props.contextValues[index]}
                      renderValue={(vals) => {
                        let valsStr = vals as string[];
                        return valsStr.join(",");
                      }}
                      onChange={function (e) {
                        props.handleChangeContext(e,context.name,index)
                      }}
                      variant="outlined"
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {context.values.map((contextValue: any,indexVal:any) => (
                        <MenuItem id={`MenuItem_context_filter_index_${index}_indexItem_${indexVal}`} key={index} value={contextValue.value}>
                          <Checkbox  id={`Checkbox_context_filter_index_${index}_indexItem_${indexVal}`}  color="primary" checked={ props.contextValues[index].indexOf( contextValue.value ) > -1  } inputProps={{ "aria-label": "secondary checkbox"}} />
                          <ListItemText id={`ListItemText_context_filter_index_${index}_indexItem_${indexVal}`}  primary={contextValue.value} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ))}
          </div>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:0,width:"100%"}} >
                <div style={{ display: "flex", width:"100%",padding: "0px" }}>
                  <Autocomplete disabled={props.modeView} value={props.autoCompleteValue} size="small" style={{display:"flex",alignItems:"center",width: "100%"}} freeSolo id="autoComplete_filter" disableClearable 
                    onChange={(event, newValue:any) => {
                      props.setAutoCompleteValue(newValue);
                    }}
                    inputValue={props.autoCompleteValue}
                    onInputChange={(event, newInputValue) => {                 
                        props.handleChangeSearch(newInputValue); 
                    }}
                    options={props.propertyKeys}
                    renderInput={(params) =><TextField {...params} size="small" variant="outlined" label="Search text" InputProps={{ ...params.InputProps, type: "search",  endAdornment: <SearchOutlined />, style: {display:"flex",alignItems:"center", fontSize: 14,height:36}}} InputLabelProps={{ style: { display:"flex",alignItems:"center",fontSize: 14 } }}  />}
                  />
                </div>
          </div>
      </div>
      <div className={classes.filterContainer_action}>
        {props.loadingFind.state === null &&
          <div style={{display:'flex',alignItems:'flex-end'}}>
            <Tooltip title={"Reset Filter"} arrow enterDelay={0} leaveDelay={100}>
              <span>
                 <IconButton id={`btn_reset_filter`}  className={classes.reset} style={{margin:'0px 4px 0px 4px'}}   onClick={()=>{handleReset() }} >
                <FilterAltOffIcon fontSize='small' style={{color:'#0A8FDC'}}/>
              </IconButton>
              </span>

            </Tooltip>
            <Box component="div" m={0}  className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, padding: 0,}} >
              <Button id={`btn_find_filter`}    startIcon={<SearchOutlined />} onClick={handleFind} className={classes.buttonFind}>Find</Button>
            </Box>
          </div>
        }
        {props.loadingFind.state !== null &&  
          <div className={classes.progress}>
            <CircularProgress disableShrink size={24}/>   
          </div>
        }
      </div>
    </div> 
  );
}

export default PropertiesFilter
