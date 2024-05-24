import * as React from "react";
import { useEffect, useRef, useState } from "react";
import DropdownFilter from "shared/components/DropdownFilter";
import { ICsTaskAdminFilter } from "types/models/interface";
import useStyles from "./styles";
import { Formik } from "formik";
import { Box, Button, CircularProgress, IconButton, Tooltip,TextField, Typography, Checkbox  } from "@material-ui/core";

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { filterTypeEnum } from "shared/constants/AppEnums";
import { SearchOutlined } from "@material-ui/icons";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getTags } from "shared/services/tagsService";

const CsTaskAdminFilter: React.FC<ICsTaskAdminFilter> = (props) => {
    const classes = useStyles()
    const [loading,setLoading] = useState<any>(false)
    const [tagList,setTagList] = useState<any>([])
    const [open, setOpen] = useState(false);
    const [search,setSearch] = useState<any>("")
    const [valuesList,setValuesList] = useState<any>([])
    let menuRef:any = useRef();


  const handleTagList = (storeId:any) => {
    try {
        
      getTags(storeId.id).then((items:any)=>{
        setTagList(items)
      })
    } catch (error) {
        setTagList([])
    }
  }
  const handleValueState = (listValue:any,values:any) => {
    let prevState = [...listValue];

        if(listValue.length === 0){
          prevState = [values]
        }else{
        
          let dataset = listValue
          let elementValue = dataset.find((item:any) => item === values);
          
          if(elementValue === undefined){
            dataset = [values]
          }else{
            dataset = dataset.filter((obj:any)=> obj !== values)
          }
          prevState = dataset 
        }
      
    
    return prevState
  }

    const checkSelectedItems = (listValue:any,values:any) => {
        let result =false;
            if(listValue.length !== 0 ){
            let valueElement:any = listValue.find((obj:any) => obj === values)
            if(valueElement !== undefined){
                result = true;
            }
            }
        return result
    }
    const handleSearch = (listElement:any,values:any) => {
        setSearch(values)
        let dataList = JSON.parse(JSON.stringify(props.storeList))
            let result = dataList.filter((obj:any)=> obj.name.toUpperCase().includes(values.toUpperCase()))
            setValuesList(result)  
    }

    const getNumberSelectedItem = (selectedValue:any) => {
        if(selectedValue !== undefined && selectedValue !== null ){
            if(selectedValue.length !== 0 ){
                let result = selectedValue.length;        
                return result === 0 ? 0 : result
            }else{
                return 0
            }
        }else{
            return 0
        }
        
    }

    const handleOpen = () => {
        if(props.disabled){
          setOpen(false)
        }else{
          setOpen(!open)
        }  
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
    

    useEffect(()=>{
        if(props.tagList !== undefined && props.tagList.length !== 0){
            setTagList(props.tagList)
        }
      },[props.tagList])

      useEffect(()=>{
        if(props.storeList !== undefined && props.storeList.length !== 0){
            setValuesList(props.storeList)
        }
      },[props.storeList])
  return (
      <Formik
          enableReinitialize={true}
          initialValues={{...props.stateFilter}}
          onSubmit={(values )=> {
                setLoading(true)
                let interVal:any = JSON.parse(JSON.stringify(values))
                let foundTag = tagList.find((item:any)=> item.name === values['tagId'][0])
                if(foundTag !== undefined){
                    interVal['tagId'] = [foundTag.id]
                }
                props.handleSearch(interVal,setLoading)
              
          }}
      >
          {(formik) => {const {values,setFieldValue,setValues} = formik;
              return (
                  <div className={classes.filterContainer}>
                        <div className={classes.filterContainer_form_element}>
                        <div style={{display:"flex",alignItems:'center',paddingRight:8,paddingBottom:4}}>
                            <div style={{display:'block'}} ref={menuRef}>
                                <div id={`menu_filter_store`} className={open ? classes.menu_trigger_active : classes.menu_trigger } onClick={handleOpen}>
                                <div className={classes.dropdownLabel}>
                                    <div className={classes.dropdownLabel_value}>
                                     Store
                                    </div>
                                    {getNumberSelectedItem(values[`storeId`]) !== 0 &&
                                    <div className={classes.dropdown_nbr_selectedItem}>
                                    <Typography style={{display:'flex',alignItems:'center',fontWeight:300,fontSize:"0.75rem"}}> {getNumberSelectedItem(values[`storeId`])} </Typography>
                                    </div>
                                    }
                                    
                                </div>
                                    <div className={classes.dropdownIcon}>
                                    {!open && <KeyboardArrowDownIcon/>}
                                    {open && <KeyboardArrowUpIcon/>}
                                    </div>
                                </div>
                                <div style={{width :'240px'}} className={open ? classes.dropdown_menu_active : classes.dropdown_menu_inactive} >
                                    <div className={classes.dropdown_container}>   
                                        <div className={classes.dropdown_container_mainInfo}>
                                            <TextField value={search} fullWidth={true}  id={`menu_filter_search_store`} 
                                            key='searchFilter' placeholder="Search" variant="outlined" style={{display:"flex",alignItems:"center",minWidth:160}}   
                                            className={classes.FilterName}                                      
                                            onChange={(event: any)=>{ handleSearch(false,event.target.value) }} 
                                            /> 
                                        </div>
                                        <div className={classes.dropdown_container_mainInfo} style={{marginTop:8}}>
                                            <div>
                                                {valuesList.map((elementFilter: any, indexContext: number) => (
                                                <div key={`div_checkbox_${indexContext}`} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                                    <div style={{display:'flex',alignItems:'center'}}>
                                                        <Checkbox  
                                                        id={`menu_filter_store_index_${indexContext}`} 
                                                        color="primary" 
                                                        checked={checkSelectedItems(values['storeId'],elementFilter.id)}  
                                                        value={checkSelectedItems(values['storeId'],elementFilter.id)} 
                                                        className={classes.checkbox} size='small' 
                                                        onChange={(event: any ) => {
                                                            handleTagList(elementFilter)
                                                            let data:any = handleValueState(values['storeId'],elementFilter.id)
                                                            setFieldValue(`storeId`,data)
                                                            setFieldValue(`tagId`,[])
                                                        }} 
                                                        />
                                                    </div>
                                                    <div  style={{width:'100%',padding:4}}>
                                                        {elementFilter.name}
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>                      
                                </div>
                            </div>
                          </div>
                        <div style={{display:"flex",alignItems:'center',paddingRight:8,paddingBottom:4}}>
                            <DropdownFilter 
                                key={'tag-filter'}
                                name={'tagId'} 
                                label={'Tag'} 
                                handleValue={setFieldValue} 
                                values={tagList} 
                                selectedValues={values[`tagId`]} 
                                type={filterTypeEnum.SELECT_ONE}    
                                search={true}   
                                context={null}  
                                typeFilter={filterTypeEnum.SELECT_ONE}   
                                disabled={false}                                    
                            />
                        </div>
                              {props.filterData.map((elementFilter:any,indexElement:any)=>(
                                  <div key={`div_dropdown_filter${indexElement}`} style={{display:"flex",alignItems:'center',paddingRight:8,paddingBottom:4}}>
                                      {(elementFilter.type === filterTypeEnum.SELECT_MULTI ) &&
                                              <DropdownFilter 
                                                  key={indexElement}
                                                  name={elementFilter.name} 
                                                  label={elementFilter.label} 
                                                  handleValue={setFieldValue} 
                                                  values={elementFilter.values} 
                                                  selectedValues={values[`${elementFilter.name}`]} 
                                                  type={elementFilter.type}    
                                                  search={elementFilter.search}   
                                                  context={elementFilter.context}     
                                                  typeFilter={'select-multi'}  
                                                  disabled={elementFilter.disabled}                                
                                              />
                                        
                                      }
                                      {(elementFilter.type === filterTypeEnum.DATE_RANGE ) &&
                                              <DropdownFilter 
                                                  key={indexElement}
                                                  name={elementFilter.name} 
                                                  label={elementFilter.label} 
                                                  handleValue={setFieldValue} 
                                                  values={[values[`fromDate`],values[`toDate`]]} 
                                                  selectedValues={[values[`fromDate`],values[`toDate`]]} 
                                                  type={elementFilter.type}    
                                                  search={elementFilter.search}   
                                                  context={elementFilter.context}     
                                                  typeFilter={'select-multi'}  
                                                  disabled={elementFilter.disabled}                                
                                              />
                                        
                                      }
                                       {( elementFilter.type === filterTypeEnum.SELECT_ONLY_ONE  || elementFilter.type === filterTypeEnum.SELECT_ONE) &&
                                              <DropdownFilter 
                                                  key={indexElement}
                                                  name={elementFilter.name} 
                                                  label={elementFilter.label} 
                                                  handleValue={setFieldValue} 
                                                  values={elementFilter.values} 
                                                  selectedValues={values[`${elementFilter.name}`]} 
                                                  type={elementFilter.type}    
                                                  search={elementFilter.search}   
                                                  context={elementFilter.context}  
                                                  typeFilter={elementFilter.type}   
                                                  disabled={elementFilter.disabled}                                    
                                              />
                                        
                                      }
                                      
                                  </div>
                              ))}
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
                                      <IconButton id={`btn_reset_filter`} disabled={props.stateComponent || props.disabled} className={classes.reset}   onClick={()=>{setValues(props.resetForm) }} >
                                      <FilterAltOffIcon fontSize='small' style={{color:'#0A8FDC'}}/>
                                  </IconButton>
                                  </span>

                              </Tooltip>
                              <Box component="div" m={0}  className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, padding: 0,}} >
                                  <Button id={`btn_find_filter`} disabled={props.stateComponent || props.disabled }   startIcon={<SearchOutlined />} onClick={()=>{formik.submitForm();}} className={classes.buttonFind}>Find</Button>
                              </Box>
                          </div>
                          }
                      </div>
                  </div>
              )
          }}  
      </Formik> 
  );
};
export default CsTaskAdminFilter;
