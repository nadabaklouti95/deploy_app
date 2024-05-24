import {Box,Button,Chip,Dialog,DialogContent,DialogTitle,IconButton,Paper,} from "@material-ui/core";
import * as React from "react";
import useStyles from "../styles";
import EditTag from "../TagsEdition";
import Xarrow from "react-xarrows";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import { ActionMode } from "shared/constants/AppEnums";
import InfoView from "app/components/InfoView"

export type TagProps = {
  id: number;
  name: string;
  description: string;
  storeId: number;
  nextTags: [];
}
export interface droppable {
  stateZoom:any;
  tags: any;
  id: any;
  openEdit: (data: any) => () => void;
  openDelete: (data: any) => () => void;
  widthContainer:any;
  leftChips:any;
}
interface ITagGraph {
  DeleteTagAction:any;
  tags:any;
  nextTags:any;
  loading:any;
  selectedId:any;
  refZoom:any;
  scaleZoom:any;
  handleScaleZoom:any;
  handleZoomState:any;
  handleEdit:any;
  stateComponnent:any
  fetchData:any;
} 

  const getWidthChips = (widthContainer:any,widthList:any) => {
    if(widthContainer >= widthList){
      return 100
    }else{     
      //let number:any = 110 * widthContainer
      //let result:any = Math.floor(number / widthList )
      return 80    
    }
  }

  const getLeftArrow = (widthContainer:any,widthList:any) =>{
    if(widthContainer >= widthList){
      return 140
    }else{
      return 150  
    }
  }

  const getGridBreak = (listTag:any,fromTag:any,toTag:any) =>{
    let elementFrom:any = listTag.find((obj:any)=>obj.name === fromTag)
    let elementTo:any = listTag.find((obj:any)=>obj.name === toTag)
    let differ = elementTo.levelX - elementFrom.levelX 
    if(elementFrom.levelY !== elementTo.levelY && differ > 1 ){
      return "95%"
    }else{
      return "60%"
    }
  }

  const DraggableBox = ({ stateZoom,tags, id, openEdit, openDelete ,widthContainer,leftChips}: droppable) => {
    const classes = useStyles();
    return (
      <div style={{position:"relative",width:20}} title={tags.description} onClick={openEdit(tags)}>
        {tags.name === "Latest" ? 
        <Chip
        id={tags.name}
        className={
          `${classes.hover}` && tags.name === "Latest"
            ? classes.lastestStyle
            : classes.boxStyle
        }
        style={{
          width:100,
          marginLeft: `${(tags.levelX) * leftChips}px`,
          marginTop: `${tags.levelY * 100}px`,
        }}
        label={tags.name}
        variant="outlined"
      /> :
      <Chip
          id={tags.name}
          className={
            `${classes.hover}` && tags.name === "Latest"
              ? classes.lastestStyle
              : classes.boxStyle
          }
          style={{
            width:100,
            marginLeft: `${(tags.levelX) * leftChips}px`,
            marginTop: `${tags.levelY * 100}px`,
          }}
          label={tags.name}
          onDelete={openDelete(tags)}
          variant="outlined"
          deleteIcon={<div style={{display:'flex',margin:0}}>
            <IconButton style={{padding:'0px'}}>
              <HighlightOffIcon color="secondary" />
            </IconButton>
          </div>
          }
        />
        }
      </div>
    );
  };

  const getWidth = (maxTags:any)=>{
    if(maxTags !== undefined){
      return (((maxTags.levelX) * 140) +140)
    } 
  }




const TagGraph: React.FC<ITagGraph> = (props) => {
  const classes = useStyles();
  const [openEditdialog, setOpenEditDialog] = useState(false);
  const [openDeletedialog, setOpenDeleteDialog] = useState(false);
  const [selectedTag, SetSelectedTag] = useState<any>();
  const [tagToDelete, setTagtoDelete] = useState<TagProps>();
  const [nextTags,setNextTags] = useState<any>(props.nextTags)
  const [widthTransformWrapper,setWidthTransformWrapper] = useState<any>(getWidth(props.tags[props.tags.length - 1]))

  const openEdit = (data: any) => () => {
    setNextTags(props.nextTags)
     
    if(data.name !== "Latest"){
      setOpenEditDialog(true);
      SetSelectedTag(data);
    }
  };
  const openDelete = (data: any) => () => {
    setOpenDeleteDialog(true);
    setTagtoDelete(data);
    SetSelectedTag(data);
  };
  const handleClose = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };

  
  useEffect(()=>{
    setNextTags(props.nextTags)
    setWidthTransformWrapper(getWidth(props.tags[props.tags.length - 1]))
},[props.nextTags,props.tags])

 
  return (
    <React.Fragment  >
        <main key={"content_tagList"} className={classes.content} >
          { !props.stateComponnent &&
            <div className={classes.tagsBlock}>
              {props.tags.map((tags: any, index: number) => {
                return (
                  <div style={{zIndex:3}} key={index}>
                    <DraggableBox
                      stateZoom={false}
                      key={index}
                      tags={tags}
                      id={index}
                      openEdit={openEdit}
                      openDelete={openDelete}
                      widthContainer={getWidthChips(0,widthTransformWrapper)}
                      leftChips={getLeftArrow(0,widthTransformWrapper)}
                    />                  
                  </div>
                );
              })}
              {nextTags.reverse().map((tag: any, i: number) => (
                <div style={{position:'relative',zIndex:2}} key={i}>
                  <Xarrow
                        key={""+i+""}
                        start={tag.nameFrom}
                        end={tag.nameTo}
                        startAnchor="right"
                        endAnchor="left"
                        color="black"
                        gridBreak={getGridBreak(props.tags,tag.nameFrom,tag.nameTo)}
                        strokeWidth={0.8}
                        path="grid"
                      />
                </div>            
              ))}
            </div>
          }
          { props.stateComponnent &&
            <div style={{width: "100%",padding:4}}>
              <Skeleton   height={400} />
            </div>
          }
          
         
          <Dialog
            open={openEditdialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title">Edit Tag</DialogTitle>
            <DialogContent>
              <EditTag
                selectedid={props.selectedId}
                selectedTag={selectedTag}
                handleEdit={props.handleEdit}
                handleClose={handleClose}
                fetchData={props.fetchData}
              />
              <InfoView />
            </DialogContent>
          </Dialog>

          <Dialog
            open={openDeletedialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title">Delete Tag</DialogTitle>
            <DialogContent>
              Please confirm that you want to delete the {tagToDelete?.name}{" "}
              tag.
              <InfoView />
            </DialogContent>
            <Paper>
              <Box
                component="span"
                m={1}
                className={`${classes.spreadBox} ${classes.box}`}
              >
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  color="secondary"
                  className={classes.buttonsSize}
                >
                  Cancel
                </Button>

                <Button
                  onClick={()=>{
                    props.DeleteTagAction(ActionMode.DELETE_MODE,tagToDelete?.id as number,null,null)
                    setOpenEditDialog(false)
                    setOpenDeleteDialog(false)
                  }
                  
                  }
                  color="primary"
                  variant="outlined"
                  autoFocus
                  className={classes.buttonsSize}
                >
                  Ok
                </Button>
              </Box>
            </Paper>
          </Dialog>
          <InfoView />
        </main>
      
      
    </React.Fragment>
  );
};

export default TagGraph;