import {FormControl, Grid, MenuItem, Tooltip,} from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  LoadCombo} from "redux/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppState } from "redux/store";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import useStyles from "./styles";
import {TextField} from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';
import {useState, useEffect} from "react";
import {truncateStoreName} from "../../../shared/constants/TruncateStoreName";
import {LoadComboWS} from "../../../redux/actions/ComboWS";


interface ParentProps {
  props: string;
}

export default function ComboBox(props: ParentProps) {
  const dispatch = useDispatch();
  //const cards = useSelector((state: AppState) => state.stores.storeslist.reverse());

  const cookieName = "selectedStore";
  const initialValue = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === cookieName ? `${acc}${cur.split("=")[1]}` : acc,"");
  const [comboValue, SetComboValue] = useState<any>(initialValue);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const notify = (storeName : String) => toast.success("The store "+truncateStoreName(storeName)+" is now selected!",{autoClose: 3000,theme :"colored" });
  const listWS = useSelector((state: AppState) => state.workspaces.workspaceslist);
  const cookieNameWS = "selectedWorkspace";
  const initialValueWS = document.cookie.split("; ").reduce((acc, cur) => cur.split("=")[0] === cookieNameWS ? `${acc}${cur.split("=")[1]}` : acc,"");
  const [comboValueWS, SetComboValueWS] = useState<any>(initialValueWS);
  const [selectedWS, setSelectedWS] = useState<any>(null);
  const notifyWS = (name : String) => toast.success("The workspace "+truncateStoreName(name)+" is now selected!",{autoClose: 3000,theme :"colored" });
  const classes = useStyles()

  const handleChange = (storeValue:any) => {
      if(storeValue){
          setSelectedStore(storeValue);
          SetComboValue(storeValue.name);
          dispatch(LoadCombo(storeValue.name));
          toast.dismiss();
          notify(storeValue.name);
      }
  };

  const handleChangeWS = (workspaceValue:any) => {
    if(workspaceValue){
      setSelectedWS(workspaceValue);
      SetComboValueWS(workspaceValue.workSpaceDTO.name);
      dispatch(LoadComboWS(workspaceValue.workSpaceDTO.name));
      toast.dismiss();
      notifyWS(workspaceValue.workSpaceDTO.name);

      let storeSelected = selectedWS.storeList[0]
      if(storeSelected) {
        setSelectedStore(storeSelected);
        SetComboValue(storeSelected.name);
        dispatch(LoadCombo(storeSelected.name));
      }
    }
  };

  useEffect(() => {
    if(listWS.length === 0){
      setSelectedStore(null)
      setSelectedWS(null)
    }

  }, [listWS]);

  useEffect(() => {
    if(!initialValueWS){
      var d = new Date();
      d.setMonth(d.getMonth() + 3);
      document.cookie = `selectedWorkspace=;expires=${d.toUTCString()};Path=/`;
      document.cookie = `selectedStore=;expires=${d.toUTCString()};Path=/`;
    }
    if(listWS.length > 0){
      let foundElementWS:any = listWS.find((obj:any)=> obj.workSpaceDTO.name === initialValueWS);
      if(foundElementWS === undefined || comboValueWS === ""){
          dispatch(LoadComboWS(listWS[listWS.length-1].workSpaceDTO.name));
          SetComboValueWS(listWS[0].workSpaceDTO.name);
          setSelectedWS(listWS[0]);
      } else {
        setSelectedWS(foundElementWS)
        SetComboValueWS(initialValueWS);
        let storeList = foundElementWS.storeList ;
        if(storeList.length > 0){
          let foundElement:any = storeList.find((obj:any)=> obj.name === initialValue);
          if(foundElement === undefined || comboValue === ""){    
            dispatch(LoadCombo(storeList[storeList.length-1].name));
            SetComboValue(storeList[0].name);
            setSelectedStore(storeList[0]);
          } else {    
            setSelectedStore(foundElement)
            SetComboValue(initialValue);
          }   
        }
      }  
    }
    
  }, [comboValueWS, dispatch, listWS, initialValueWS, initialValue, comboValue]);


  return (
    <>
      <Grid container style={{marginLeft:10}}>
        <ToastContainer />
        <div className={classes.comboContainer}>
          <FormControl >
            <div className={classes.formControlContainer}>
              <div  className={classes.comboLabel} >Workspaces: </div>
              <Autocomplete
                  fullWidth
                  id="comboBox_workspace"
                  options={listWS}
                  getOptionLabel={(option) => option.workSpaceDTO.name}
                  value={selectedWS}
                  onChange={(event, newValue) => handleChangeWS(newValue)}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          name="workspace"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            style: {padding: '0px'}
                          }}

                      />
                  )}
                  renderOption={(props, option, item) => (
                      <MenuItem key={option.id} {...props} value={option} id={`workspace_menu_item_index_${item.index}`}>
                         
                        {option.workSpaceDTO.name}
                      </MenuItem>
                  )}
              />
            </div>
          </FormControl>
        </div>

        <div className={classes.comboContainer}>
          <FormControl>
            <div className={classes.formControlContainer}>
              <div className={classes.comboLabel}  style={{marginLeft:"20px"}}>Stores: </div>
                <Autocomplete
                    fullWidth
                    id="comboBox_store"
                    options={selectedWS?.storeList?selectedWS?.storeList:[]}
                    getOptionLabel={(option) => option?option.name:"" }
                    value={selectedWS?.storeList?.length >0 ?selectedStore: ""}
                    onChange={(event, storeValue) => handleChange(storeValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="store"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                style: {padding: '0px'}
                            }}
                        />
                    )}
                    renderOption={(props, option, item) => (
                        <MenuItem key={option.id} {...props} value={option} id={`store_menu_item_index_${item.index}`}>
                            <div className={classes.menuItem}>
                                {option.dirtyContext &&
                                    <div style={{display:'flex',width:26}}>
                                        <Tooltip title={"This store is dirty. you have update context"} arrow enterDelay={0} leaveDelay={200}>
                                            <ReportProblemIcon style={{color:'#ef5350'}} />
                                        </Tooltip>
                                    </div>
                                }
                                <div style={{display:'flex',alignItems:'center'}}>
                                    {option.name}
                                </div>

                            </div>
                        </MenuItem>
                    )}
                />
            </div>
          </FormControl>

        </div>

      </Grid>
    </>
  );
}