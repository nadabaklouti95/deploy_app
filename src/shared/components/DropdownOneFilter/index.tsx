
import * as React from "react";
import { IDropdownfilter } from "types/models/interface";

import { useEffect, useRef, useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, TextField } from "@material-ui/core";
import useStyles from "./styles";

const checkSelectedItems = (context:any,ContextName:any,listValue:any,element:any) => {
  let result =false;
  if(context){
    if(listValue.length !== 0 ){
      let indexKeyElement:any = listValue.findIndex((obj:any) => obj.key === ContextName)
      if(indexKeyElement !== (-1)){
        let searchValueElement:any = listValue[indexKeyElement].values.find((obj:any) => obj === element) 
        if(searchValueElement !== undefined){
          result = true;
        }
      }
    }
  }
  if(!context){
    if(listValue.length !== 0 ){
      let valueElement:any = listValue.find((obj:any) => obj === element)
      if(valueElement !== undefined){
        result = true;
      }
    }
  }
  return result
}
const handleValueState = (context:any,ContextName:any,listValue:any,element:any,checked:any) => {
  let prevState = [...listValue];
    if(context){
      if(listValue.length === 0){
        prevState = [{'key':ContextName,'values':[element]}]
      }else{
        let elementIndex = listValue.findIndex((item:any) => item.key === ContextName)
        if(elementIndex !== (-1)){
          let dataset = listValue
          let elementValue = listValue[elementIndex].values.find((item:any) => item === element);
          
          if(elementValue === undefined){
            dataset[elementIndex].values.push(element)
          }else{
            dataset[elementIndex].values = dataset[elementIndex].values.filter((obj:any)=> obj !== element)
          }
          
          prevState =dataset
        }else{
          prevState.push({'key':ContextName,'values':[element]})
        }
      }
    }else{
      if(listValue.length === 0){
        prevState = [element]
      }else{
      
        let dataset = listValue
        let elementValue = dataset.find((item:any) => item === element);
        
        if(elementValue === undefined){
          dataset.push(element)
        }else{
          dataset = dataset.filter((obj:any)=> obj !== element)
        }
        prevState =dataset 
      }
    }
  return prevState
}

const DropdownOneFilter: React.FC<IDropdownfilter> = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [search,setSearch] = useState<any>("")
    const [valuesList,setValuesList] = useState<any>(props.values)
    let menuRef:any = useRef();

    const handleSearch = (context:any,values:any) => {
      setSearch(values)
        let dataList = JSON.parse(JSON.stringify(props.values))
        let result = dataList.filter((obj:any)=> obj.value.includes(values))
        setValuesList(result)
    }


  useEffect(() => {
    let handler = (e:any)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  useEffect(() => {
    let handler = (e:any)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div style={{display:'block',paddingLeft:8,paddingRight:8}} ref={menuRef}>
        <div className={classes.menu_trigger} onClick={()=>{setOpen(!open)}}>
          <div >{props.label}</div>
            <div className={classes.dropdownIcon}>
              {!open && <KeyboardArrowDownIcon/>}
              {open && <KeyboardArrowUpIcon/>}
            </div>
          </div>

            <div className={open ? classes.dropdown_menu_active : classes.dropdown_menu_inactive} >
              <div className={classes.dropdown_container}>
                <div className={classes.dropdown_container_mainInfo}>
                  <div className={classes.dropdown_container_mainInfo_data}>
                    {props.label}
                  </div>
                </div>
                {props.search &&
                  <div className={classes.dropdown_container_mainInfo}>
                    <TextField value={search} fullWidth={true} 
                      key='searchFilter' placeholder="Search" variant="outlined" style={{display:"flex",alignItems:"center"}}   
                      className={classes.FilterName}                                      
                      onChange={(event: any)=>{
                        handleSearch(false,event.target.value)
                        
                      }} 
                    /> 
                  </div>
                }
                <div className={classes.dropdown_container_mainInfo} style={{marginTop:8}}>
                    {(props.context !== null && props.context !== 157 ) &&
                        <TreeView className={classes.treeView} aria-label="file system navigator" defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />} sx={{  flexGrow: 1, maxWidth: 400 }} >
                            {props.context.map((context: any, indexContext: number) => (
                                <TreeItem nodeId={`${indexContext}`} label={context.name} key={`tree_item_${indexContext}`}>
                                    {context.values.map((contextKey:any,indexContextKey:any)=>(
                                        
                                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}} key={indexContextKey}>
                                                <div style={{display:'flex',alignItems:'center'}}>
                                                    <Checkbox  
                                                      color="primary" 
                                                      checked={checkSelectedItems(true,context.name,props.selectedValues,contextKey.value)}  
                                                      value={checkSelectedItems(true,context.name,props.selectedValues,contextKey.value)}  size='small' 
                                                      className={classes.checkbox} 
                                                      onChange={(event: any ) => {
                                                        let data:any = handleValueState(true,context.name,props.selectedValues,contextKey.value,event.target.checked)
                                                        props.handleValue(`${props.name}`,data)
                                                      }} 
                                                    />
                                                </div>
                                                <div  style={{width:'100%',padding:4}}>
                                                    {contextKey.value}
                                                </div>
                                            </div>
                                        
                                    ))}
                                </TreeItem>
                            ))}
                        </TreeView>
                    }
                    {props.context === null &&
                        <div>
                            {valuesList.map((elementFilter: any, indexContext: number) => (
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}} key={indexContext}>
                                  <div style={{display:'flex',alignItems:'center'}}>
                                      <Checkbox  
                                        color="primary" 
                                        checked={checkSelectedItems(false,null,props.selectedValues,elementFilter.value)}  
                                        value={checkSelectedItems(false,null,props.selectedValues,elementFilter.value)} 
                                        className={classes.checkbox} size='small' 
                                        onChange={(event: any ) => {
                                          let data:any = handleValueState(false,null,props.selectedValues,elementFilter.value,event.target.checked)
                                          props.handleValue(`${props.name}`,data)
                                        }} 
                                      />
                                  </div>
                                  <div  style={{width:'100%',padding:4}}>
                                      {elementFilter.value}
                                  </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
              </div>
              
            </div>
    </div>
        
  )
};





export default DropdownOneFilter;
