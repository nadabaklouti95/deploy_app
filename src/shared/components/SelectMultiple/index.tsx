import * as React from 'react';
import Box from '@mui/material/Box';
import useStyles from "./styles"
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';
import { contextAllEnum } from 'shared/constants/AppConst';
import { ActionAccessMode } from 'shared/constants/AppEnums';
import AccessSelect from '../AccessSelect';
import { Tooltip } from '@material-ui/core';

interface SelectMultipleProps {
  name:any,
  selectedItem:any,
  context:any,
  disabled:any,
  callback:any,
  updateSelectState:any,
  selectState:any,
  resetState:any,
  selectId:any
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const getElementName = (contextList:any,element:any) => {
  let foundElement:any = contextList.find((obj:any)=> obj.id === element)
  if(foundElement !== undefined){
    return foundElement.value
  }
  return ""
}


const SelectMultiple : React.FC<SelectMultipleProps>= ({name,selectedItem,context,disabled,callback,updateSelectState,selectState,resetState,selectId}) => {
  const [contextValue, setContextValue] = React.useState<any>(selectedItem);
  const [jsonData,setJsonData] = React.useState<any>({key:name,values :selectedItem})
  const [initailList] = React.useReducer(()=>selectedItem,selectedItem)
  const classes = useStyles();

  let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];

  for (var i = 0; i < 100; i++) {

    colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
  }
  let colorsEvent = (contextList:any,element:any)=>{
    if(element === 0 ){
      return "#e57373"
    }else{
      let result:any = context.find((obj:any) => obj.id === element);
      if(result === undefined){
        return "#cef5e5"
      }else{
        return result.color
      }

    }
  }
  const handleChange = async (event: any) => {
    event.preventDefault()
    const {target: {value}} = event;
    let index = value.findIndex((element:any)=> element === contextAllEnum)
    let indexINitial = contextValue.findIndex((element:any)=>element === contextAllEnum)
    let lengthInit = contextValue.length
    let lengthSelect = value.length
    if((index === (-1))&&(indexINitial === (-1))){
      await setJsonData({...jsonData,key:name,values :typeof value === 'string' ? value.split(',') : value})
      await setContextValue(typeof value === 'string' ? value.split(',') : value)
      await updateSelectState(true)
    }
    if((index !== (-1))&&(indexINitial === (-1))){
      await setJsonData({...jsonData,key:name,values :[contextAllEnum]})
      await setContextValue([contextAllEnum])
      await updateSelectState(true)
    }
    if((index !== (-1))&&(indexINitial !== (-1)) &&(lengthSelect>lengthInit)){
      let result = value.filter((element:any)=> element !== contextAllEnum)
      await setJsonData({...jsonData,key:name,values :result})
      await setContextValue(result)
      await updateSelectState(true)
    }

    if(value.length===0){
      await setJsonData({...jsonData,key:name,values :typeof value === 'string' ? value.split(',') : value})
      await setContextValue(typeof value === 'string' ? value.split(',') : value)
      await updateSelectState(true)
    }
  };

  useEffect(() => {
    setContextValue(initailList)
  }, [resetState,initailList]);

  useEffect(() => {
    callback(jsonData)
  }, [jsonData,callback]);

  useEffect(() => {
    if(selectState===false){

    }
  }, [selectState]);

  return (
      <FormControl className={classes.FormControl} size="small" disabled={disabled}>
        <InputLabel id='demo-multiple-checkbox-label'>{name}</InputLabel>
        <AccessSelect 
            actionType={ActionAccessMode.WRITE_MODE}
            className={classes.root}
            labelId='demo-multiple-checkbox-label'
            id={`select_${selectId}`}
            multiple
            value={contextValue}
            handleChange={handleChange}
            input={<OutlinedInput id={`selected_input_${name}`} label='Tag' />}
            renderValue={(selected:any) => (
                <Box className={classes.chipList}>
                  {selected.map((element:any,index:any) => (
                      <Chip  id={`selected_chips_${name}_index_${index}`} className={classes.chips}  style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:colorsEvent(context,element)}} key={index} label={getElementName(context,element)} />
                  ))}
                </Box>
            )}
            MenuProps={MenuProps}
            children={context.map((element:any,index:any) => (
              <MenuItem  id={`selected_MenuItem_${selectId}_index_${index}`}  key={index} value={element.id}>
                <Checkbox id={`selected_Checkbox_${selectId}_index_${index}`} checked={contextValue.indexOf(element.id) > -1} />
                {element.value.length>11 ?
                <Tooltip title={element.value} arrow enterDelay={0} key={`tooltip${element.id}_index_${i}`}>
                  <ListItemText id={`selected_ListItemText_${selectId}_index_${index}`} primary={`${element.value.slice(0, 11)}...`} />
                </Tooltip>
                :
                <ListItemText id={`selected_ListItemText_${selectId}_index_${index}`} primary={element.value} />
                }                
              </MenuItem>
          ))}
        />
          
      </FormControl>
  );
}
export default SelectMultiple
