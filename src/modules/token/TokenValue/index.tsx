import {
    Accordion,
    AccordionDetails,
    CircularProgress,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@material-ui/core";
import * as React from "react";
import useStyles from "./styles";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ConfirmPopup from "shared/components/ConfirmPopup";
import {Chip} from "@mui/material";
import {StyledAccordionSummary, themeDeleteButton} from "../../../shared/constants/AppConst";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {labelField} from "../../../shared/constants/AppCssCons";
import {useEffect, useState} from "react";
import AccessButton from "shared/components/AccessButton";
import { ActionAccessMode } from "shared/constants/AppEnums";

interface ITokenValue {
    token:any,
    context:any,
    deleteToken:any
    indexToken:any,
    fold:any
}


const TokenValue: React.FC<ITokenValue> = (TokenProps) => {
    const classes = useStyles();
    const [copyValue,setCopyValue] = React.useState<any>("copy")
    const [copyEnterDelay,setCopyEnterDelay] = React.useState<any>(0)
    const [copyLeaveDelay,setCopyLeaveDelay] = React.useState<any>(1000)
    const [openConfirmdialog, setOpenDialog] = React.useState(false);
    const [headerConfirmPopup,setHeaderPopup]= React.useState<string>("");
    const [contentConfirmPopup,setContentPopup] = React.useState<string>("");
    const [loading,setLoading]= React.useState<boolean>(false)
    const [accordState,setAccordState] = useState<boolean>(false)


    const handleAccordion = ()=>{
        setAccordState(!accordState)
    }
    const handleCloseConfirmPopup = () => {
        setOpenDialog(false);
    };

    const handleOpenConfirmPopup = (event:any) => {
        if(event) event.stopPropagation()
        setHeaderPopup("Delete Token")
        setContentPopup("Are u sure u want to delete Toekn")
        setOpenDialog(true);
    };

    const copy = async ()=>{
        await navigator.clipboard.writeText(TokenProps.token.token);
        setCopyValue("copied")
        setCopyLeaveDelay(1000)
        setCopyEnterDelay(0)
        setTimeout(() => {
            setCopyValue("copy")
            setCopyLeaveDelay(0)
        }, 500);
    }
    let colors = ["#bad8f3", "#f5d5ce", "#cef5e5"];
    for (var i = 0; i < 100; i++) {
        colors.push("#bad8f3", "#f5d5ce", "#cef5e5");
    }
    let colorsEvent = (element:any,key:any)=>{
        if(element === 'ALL'){
            return '#e57373'
        }else{
            if(TokenProps.context.length !== 0){
                let elementContext:any = TokenProps.context.find((elem:any)=> elem.name === key)
                if(elementContext !==undefined){
                    let elementColor:any = elementContext.values.find((val:any)=> val.value === element)
                    if(elementColor !== undefined){
                        return  elementColor.color
                    }
                }

            }
        }
    }
    const deleteToken = ()=>{
        TokenProps.deleteToken(TokenProps.token.id,setLoading)
    }


    const chipList = (row: any) => (
        <div className={classes.chipList}>
            {row.values.map((element: any, index: any) => (
                    <Chip
                        key={index}
                        id={`chips_${index}`}
                        className={classes.chips}
                        style={{fontFamily: 'Poppins,sans-serif',height:24,backgroundColor:colorsEvent(element,row.key)}}
                        label={element}
                    />
            ))}
        </div>
    );

    const truncatedLabel  = (key: any) => key.length > 20 ? `${key.slice(0, 20)}...` : key;

    useEffect(()=>{
        setAccordState(TokenProps.fold)
    },[TokenProps.fold])

    return (
        <Accordion id={`accordion_index_${TokenProps.indexToken}`} key={1} className={classes.Accordion} expanded={accordState} onChange={handleAccordion}>
            <StyledAccordionSummary
                expandIcon={<ExpandMoreIcon id={`btn_expandIcon_${TokenProps.indexToken}`} style={{margin:4}} className={classes.ExpandMoreIcon}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{marginTop:accordState?"5px":"0px"}}
                className={classes.AccordionSummary}
            >
                <div  className={classes.accordion_summary_container}>
                    {!accordState &&
                        <div className={classes.accordionSummary_container}>
                            <Grid item xs={12} md={12} sm={12} className={classes.summary}>
                                <Grid item xs={3} md={3} sm={3} className={classes.summary}>
                                    <div className={classes.accordionSummary_content}>
                                        <div className={classes.accordionSummary_content_label}>
                                            <Typography style={labelField}>Name:</Typography>
                                        </div>
                                        <div className={classes.accordionSummary_content_value} style={{lineBreak:'anywhere'}}>
                                            <Typography  >{TokenProps.token.name} </Typography>
                                        </div>
                                    </div>
                                </Grid>


                                <Grid item xs={9} md={9} sm={9} className={classes.summary}>
                                    <div className={classes.accordionSummary_content} style={{marginLeft:32}}>
                                        <div className={classes.accordionSummary_content_label}>
                                            <Typography style={labelField}>Expires On:</Typography>
                                        </div>
                                        <div className={classes.accordionSummary_content_value} style={{lineBreak:'anywhere'}}>
                                            <Typography  >{TokenProps.token.expiration}</Typography>
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>
                        </div>
                    }

                    <div className={classes.accordionSummary_content_btns}
                         style={{width:accordState?"100%":"",marginTop:accordState?"20px":""}}>

                        {!loading ?
                            <div className={classes.TokenValue__property__delete}>
                                <AccessButton 
                                    id={`delete_button_${TokenProps.indexToken}`} 
                                    disabled={false}
                                    actionType={ActionAccessMode.WRITE_MODE} 
                                    className={classes.TokenValue__property__delete__btn} 
                                    style={{padding:0}}
                                    color={"secondary"}
                                    ariaLabel={"deleteToken"}
                                    handleClick={handleOpenConfirmPopup}
                                    iconButton={true}
                                    theme={themeDeleteButton}
                                    tooltip={"Delete Token"}
                                    >
                                    <HighlightOffIcon color="secondary" />
                                </AccessButton>
                            </div> :
                            <div className={classes.progress}>
                                <CircularProgress disableShrink size={18}/>
                            </div>
                        }
                    </div>
                </div>
            </StyledAccordionSummary>


            <AccordionDetails style={{ display: "flex",width:'100%',padding:8 }}>
                <div className={classes.container_tagValue}>
                    <div className={classes.TokenValue}>
                        <div className={classes.TokenValue__property}>
                            <Grid container spacing={0}
                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Grid item xs={4} md={4} sm={4} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'
                                }}>
                                    <div className={classes.TokenValue__property__Name}>
                                        <Typography style={{fontWeight: 500}}>Name :</Typography>
                                    </div>
                                    <div
                                        className={classes.TokenValue__property__NameValue}>{TokenProps.token.name}</div>
                                </Grid>
                                <Grid item xs={8} md={8} sm={8} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <div className={classes.TokenValue__property__Date}>
                                        <div className={classes.TokenValue__property__Expiration}>
                                            <Typography style={{fontWeight: 500}}>Expires On</Typography>
                                        </div>
                                        <div
                                            className={classes.TokenValue__property__ExpirationValue}>{TokenProps.token.expiration}</div>
                                    </div>


                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.TokenValue__Scoop}>


                            <div className={classes.TokenValue__Scoop}
                                 style={{marginLeft: 13, marginBottom: 8, marginTop: 8}}>
                                {TokenProps.token.scope.map((row: any, index: any) => (


                                    <TextField
                                        key={index}
                                        id={row.key + "-" + index}
                                        name="context"
                                        size="small"
                                        label={truncatedLabel(row.key)}
                                        variant='outlined'
                                        className={classes.contextTextField}
                                        InputProps={{
                                            startAdornment: (
                                                <div> {chipList(row)} </div>
                                            ),
                                            readOnly: true,
                                            inputProps: {style: {width: "0%"}}
                                        }}

                                    />

                                ))}
                            </div>


                        </div>
                        <div className={classes.divider}/>
                        <div className={classes.TokenValue__footer}>
                            <div className={classes.TokenValue__footer__token}>
                                <Typography style={{fontWeight: 500}}>Token :</Typography>
                                <div style={{marginLeft: 4}}>{TokenProps.token.token}</div>
                            </div>
                            <div className={classes.TokenValue__footer__copy}>
                                <Tooltip title={copyValue} arrow enterDelay={copyEnterDelay}
                                         leaveDelay={copyLeaveDelay}>
                            <span>
                                <IconButton id={`copy_button_${TokenProps.indexToken}`}
                                            className={classes.TokenValue__btn} color="secondary"
                                            aria-label="cancelCreation" onClick={copy}>
                                <ContentCopyIcon/>
                            </IconButton>
                            </span>

                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <ConfirmPopup opendialog={openConfirmdialog} headerContent={headerConfirmPopup}
                              contentMessage={contentConfirmPopup} handleClose={handleCloseConfirmPopup}
                              popupMainAction={deleteToken} handleAccordion={() => {
                }}/>

            </AccordionDetails>
        </Accordion>
    );
};

export default TokenValue;
