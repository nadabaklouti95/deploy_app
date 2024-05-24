import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import {  toast } from 'react-toastify';
import {Avatar,Box,CardActionArea,DialogContent,DialogContentText,DialogTitle,Paper,} from "@material-ui/core";
import {LoadCombo,loadStore,  } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/store";
import { useHistory } from "react-router-dom";
import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import  InfoView  from "app/components/InfoView";
import EditStore from "../EditStore";
import { Icombo } from "types/models/Combo";
import { Fonts } from "shared/constants/AppEnums";
import {handleErrors} from "../../../shared/constants/HandleErrors";
import {truncateStoreName} from "../../../shared/constants/TruncateStoreName";

interface IStoreList {}

let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];

for (var i = 0; i < 100; i++) {
  colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
}

 const StoreList : React.FC<IStoreList> = (props) =>{
  const classes = useStyles();
  const [opendialog, setOpenDialog] = React.useState(false);
  const [openeditdialog, setOpenEditDialog] = React.useState(false);
  const [IDtoDel, SetIdtodel] = React.useState<number>(0);
  const [selectedStore, SetSelectedStore] = React.useState<any>();
  const [stateAction,setStateAction] = React.useState<any>(false)
  const dispatch = useDispatch();
  const Data: Icombo = useSelector((state: AppState) => state.combo);
  const cards = useSelector((state: AppState) => state.stores.storeslist);
  const notify = (storeName : String) => toast.success("The store "+truncateStoreName(storeName)+" is now selected!",{autoClose: 3000,theme :"colored" });

  //add useEffect for action delete
  useEffect(() => {
    dispatch(loadStore());
  }, [dispatch, Data]);

  let history = useHistory();
  const handleClickOpen = () => {
    history.push("/storeCreation");
  };
  const DeleteStore = (Id: number) => async () => {
    await jwtAxios.delete(`cs-store/delete-store?storeId=${Id}`).then((response:any)=>{
        if (response && response.status === 204) {
          if (Id === cards[cards.length - 1].id) {
            dispatch(LoadCombo(cards[0].name));
            setStateAction(!stateAction)
            setOpenDialog(false);
            setOpenEditDialog(false);
          }
        }
      }).catch(function (error) {
          handleErrors(error,true,null)

      }) 
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenEditDialog(false);
  };

  const openDialog = (data: any) => () => {
    setOpenDialog(true);
    SetIdtodel(data.id);
  };

  const openEditdialog = (data: any) => () => {
    setOpenEditDialog(true);
    SetSelectedStore(data);
  };

  const changeCombo = (value: any) => {
    dispatch(LoadCombo(value));
    toast.dismiss();
    notify(value as string);
  };

  return (
    <React.Fragment>
      <main className={classes.content__Context}>
        <div className={classes.heroContent} style={{ paddingBottom: "15%" }} id="content" >
          <Container className={classes.cardGrid}>
            <Grid container >
              {cards.map((card: any, index: number) => (
                <Grid item key={card.id} xs={12} sm={3} style={{padding:5}}>
                  <Card className={classes.root} style={{ backgroundColor: colors[index], }} >
                    <Button style={{width:"100%"}} onClick={() => { changeCombo(card.name);}} >
                      <CardActionArea>
                        <CardContent style={{padding:5}}>
                          <Box display="flex" mt={1} mb={1}>
                            <p style={{ textIndent: 0, textAlign: "left" }}>
                              <strong>Name:</strong> {card.name}
                            </p>
                          </Box>
                          <Box display="flex" mt={1} mb={1}>
                            <p style={{ textIndent: 0, textAlign: "left" }}>
                              <strong>Description:</strong> {card.description}
                            </p>
                          </Box>
                          <Box display="flex" mt={1} mb={1}>
                            <p style={{ textIndent: 0, textAlign: "left" }}>
                              <strong>Type:</strong> {card.type}
                            </p>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Button>
                    <CardActions style={{display:'flex',justifyContent:'center',alignItems:'flex-end',height:"100%"}}>
                      <Button id={`store_edit_${index}`} size="small" color="primary"  onClick={openEditdialog(card)} >
                        Edit
                      </Button>
                      <Button id={`store_delete_${index}`} size="small" color="primary" onClick={openDialog(card)} >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12} sm={3}>
                <Card id="store_add" className={classes.boardStyleCard} onClick={handleClickOpen}>
                  <Avatar className={classes.avatar}>
                    <AddIcon className={classes.addIcon} />
                  </Avatar>
                  <Box fontWeight={Fonts.MEDIUM} fontSize={14}>
                    Add new Store
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>

        <Dialog
          open={opendialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">Delete Store</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this Store?
            </DialogContentText>
          </DialogContent>
          <Paper>
            <Box component="span" m={1} className={`${classes.spreadBox} ${classes.box}`}>
              <Button id="store_cancel_delete" onClick={handleClose} variant="outlined" color="secondary" className={classes.buttonsSize}>
                Cancel
              </Button>
              <Button id="store_confirm_delete" onClick={DeleteStore(IDtoDel)} color="primary" variant="outlined" autoFocus className={classes.buttonsSize}>
                Ok
              </Button>
            </Box>
          </Paper>
        </Dialog>
        <Dialog
          open={openeditdialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">Edit Store</DialogTitle>
          <DialogContent>
            <EditStore selectedStore={selectedStore} handleClose={handleClose}/>
          </DialogContent>
        </Dialog>
        <InfoView />
      </main>
    </React.Fragment>
  );
}

export default StoreList
