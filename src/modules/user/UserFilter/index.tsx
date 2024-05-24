import * as React from "react";
import useStyles from "./styles";
import { Grid, Button, CircularProgress, Box, IconButton, TextField } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Tooltip } from "@mui/material";

interface IUserFilter {
  loadingFind:any;
  findConfig:any;
  stateComponnent:any;
}  


const UserFilter: React.FC<IUserFilter> = (props) => {
  const classes = useStyles()
  const [filterName,setFilterName] = React.useState<any>("")

  const handleFilter = ()=>{
    props.findConfig(filterName)
  }

  const handleReset = () => {
    setFilterName("")
  }
 

  return (
    <div className={classes.Filter}>
      <Grid item xs={12} md={12} sm={12} style={{display:"flex",alignItems:'center',flexWrap:'wrap',justifyContent:'space-between',height:57}}>
        <div className={classes.nameContainer} >
          <TextField 
            id={`FilterLogin_Name`} 
            disabled={props.stateComponnent}
            value={filterName}  
            fullWidth={true}   
            key='FilterLogin_Name' 
            placeholder="User Login / Email"    
            variant="outlined" style={{display:"flex",alignItems:"center",width: 280}}   
            className={classes.FilterName}                                      
            onChange={(event: any)=>{
              setFilterName(event.target.value as string)
            }} 
          /> 
            
          </div>
          <div style={{padding:8}}>
            { props.loadingFind === false ?
              <div style={{display:'flex',alignItems:'center'}}>
                <Tooltip title={"Reset Filter"} arrow enterDelay={0} leaveDelay={100}>
                  <span>
                    <IconButton id={`btn_reset_filter`} disabled={props.stateComponnent} className={classes.reset}   onClick={()=>{handleReset() }} >
                      <FilterAltOffIcon fontSize='small' style={{color:'#0A8FDC'}}/>
                    </IconButton>
                  </span>

                </Tooltip>
                <Box component="div" m={0} className={`${classes.spreadBox}`} style={{  alignItems: "center",justifyContent:'flex-end', margin: 0, paddingRight: 8,}} >
                  <Button 
                    startIcon={<SearchOutlined />} 
                    disabled={props.stateComponnent} 
                    onClick={handleFilter} 
                    className={classes.buttonFind} 
                    id={`filterUser_btn`}
                  > 
                    Find
                  </Button>
                </Box>
              </div> :
              <div className={classes.progress}>
                <CircularProgress disableShrink size={18}/>   
              </div>
            }
          </div> 
      </Grid>
    </div>
  );
};

export default UserFilter;
