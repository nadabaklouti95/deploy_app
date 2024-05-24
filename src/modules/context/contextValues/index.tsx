import React, { useState } from "react";
import { Box,Button,CardContent,createTheme,Divider,Icon,IconButton,ThemeProvider,Tooltip,Typography,} from "@material-ui/core";
import clsx from "clsx";
import _ from "lodash";
import Chips from "./Chip";
import AddNewTag from "./AddNewTag";
import useStyles from "./styles";
import  GridContainer  from "app/components/GridContainer";
import { green, grey } from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

interface TagsList {
  id: any;
  value: string;
  keyid: any;
}

interface AddTagsPorps {
  data: TagsList[];
  reference: any;
  apiReturn: any;
  items: any;
  isvisible: boolean;
  onloaddata: (id: any) => void;
  setisvisible: (data: boolean) => void;
  selectedid: any;
  isSubmitting: any;
  push: (data: any) => void;
  form: any;
  stateContextKeys:any;
  stateErreur:any;
}
const theme = createTheme({
  palette: {
  primary: green
  }
});

const AddTags: React.FC<AddTagsPorps> = ({stateContextKeys,data,reference,isvisible,setisvisible,onloaddata,items,selectedid,isSubmitting,apiReturn,push,form,stateErreur}) => {
  const classes = useStyles();
  const [modtags, setModTags] = useState(false);
  const [empty, setempty] = React.useState(false);
  const [modtagss, setModTagss] = useState(true);
  const [tags, setTags] = useState(data);
  const onAddNewTag = (newTag: string) => {
    let tag: TagsList = {
      value: newTag,
      id: null,
      keyid: null,
    };
    setTags((tags) => tags.concat(tag));
    setModTagss(true);
    console.log(tags);
  };

 

  function reverse() {
    if (empty) {
      return "button";
    }
  }

  const modTags = (YN: string) => {
    if (YN === "close") {
      setModTags(false);
      setModTagss(false);
    } else {
      setModTags(true);
      setModTagss(true);
    }
  };
  
  React.useEffect(() => {
    
      setModTags(false);
      setModTagss(true);
    
  }, [isvisible]);
  
  React.useEffect(() => {
    if(stateContextKeys){
      setModTagss(false);
    }
    
  
}, [stateContextKeys]);

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:"100%"}}>
    <div style={{display:'flex',flexDirection:'column',height:'auto'}}>
      <Button id={`add_new_key_button`} fullWidth className={classes.boardStylekey} type={reverse()}
        disabled={
          (form.errors &&
            _.isArray(form.errors.contextKeys) &&
            items.length > 0) ||
          modtags
        }
        onClick={() => {
          if (
            form.errors &&
            _.isArray(form.errors.contextKeys) &&
            items.length > 0
          ) {
            setempty(true);
          } else {
            push({
              id: null,
              name: "",
              description: "",
              values: [],
              storeId: selectedid?.id,
            });
            setempty(false);
            setisvisible(true);
          }
        }}
      >
        <Icon style={
            (form.errors &&
              _.isArray(form.errors.contextKeys) &&
              items.length > 0) ||
            modtags
              ? { color: grey[300] }
              : { color: green[500] }
          }
        >
          add_circle
        </Icon>
        Add new Key
      </Button>
      <Divider variant="fullWidth" style={{height: "1px",boxShadow: "-moz-initial",position: "relative",marginRight: 0, marginLeft: 0,marginTop: 18,marginBottom: 6,}}/>
      <Box style={{ paddingBottom: 16 }}>
        <Typography variant="subtitle2" component="h2" style={{padding:8,fontWeight:400}}>
          Context values
        </Typography>
      </Box>
      {reference.current?.values?.contextKeys.map((el: any, idx: number) => {
        return (
          <>
            <CardContent style={{ paddingTop: 0 }}>
              <Box p={2} alignItems="flex-start" className={clsx(classes.roundedXl)} style={{display: "flex",paddingBottom: 0,paddingTop: 0, }}>
                <GridContainer>
                  <Box p={2} pr={0} alignItems="flex-start" style={{ display: "flex", }} >
                    {el.name} &nbsp;&nbsp;{" "}
                  </Box>
                  {el.values !== undefined &&
                    el.values.map((item: any, index: number) => {
                      return (
                        <Chips onAddNewTag={onAddNewTag} index={index} idx={idx} item={item} reference={reference} modTags={modTags} modtags={modtags} />
                      );
                    })}
                    <Tooltip title={"Add New Context Value"} arrow enterDelay={0} leaveDelay={500}>
                  <AddNewTag onAddNewTag={onAddNewTag} index={idx} id={el.id} reference={reference} modtags={modtags}  modTags={modTags} />
                  </Tooltip>
                </GridContainer>
              </Box>
              <Box p={4} alignItems="flex-start">
                <Divider variant="middle" />
              </Box>
            </CardContent>
          </>
        );
      })}

      {apiReturn.map((errApi: any, index: number) => {
        return (
          <Alert severity="error" style={{ width: "100%" }}>
            {errApi}
          </Alert>
        );
      })}
      </div>
      <div style={{display:'flex', alignItems:'center'}}>
        {stateErreur.length !== 0 &&
          <div className={classes.container__alert}>
            <Alert severity="error" style={{ width:'100%'}} className={classes.alert}>
              {stateErreur}
            </Alert>
          </div>
        }
        <div id={`cancel_update_Button`} style={{width:stateErreur.length !== 0 ? 'auto' : '100%' }} className={classes.actionContainer}>
          <Tooltip title={" Cancel Update Context "} arrow enterDelay={0} leaveDelay={400}>
          <span>
            <IconButton disabled={modtagss} type="reset" className={classes.contextValue__btn} color="secondary" aria-label="cancelCreation" onClick={async () => {
              try {
              } catch (err) {}
              setModTagss(true);
              setisvisible(false);
            }}>
            <CloseIcon />
          </IconButton>
          </span>

          </Tooltip>
          <ThemeProvider theme={theme}>
            <Tooltip title={" Confirm Update Context "} arrow enterDelay={0} leaveDelay={400}>
            <span>
              <IconButton id={`confirm_update_Button`} type="submit"  disabled={modtagss} className={classes.contextValue__btn} color="primary" aria-label="confirmCreation"  >
              <CheckIcon />
            </IconButton>

            </span>



            </Tooltip>
          </ThemeProvider>
         
        </div>
      </div>
    </div>
  );
};

export default AddTags;
