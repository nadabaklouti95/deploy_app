import useStyles from './styles';
import * as React from 'react';
import { Button, Divider, Icon, IconButton } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

interface SelectMultipleProps {
  headerContent:any;
  FilterContent:any;
  onClickAction:any;
  MainContent:any,
  Action:any;
  AddForm:any;
  SecondarryAction:any;
  thirdlyAction:any
}

const MainContainer : React.FC<SelectMultipleProps>= (Props) => {
  const classes = useStyles()

  
  return (
    <div className={classes.container}>
        <div className={classes.header}>
            <div className={classes.Typography}>{Props.headerContent}</div>
        </div>
        <div className={classes.divider}/>
        
       {Props.FilterContent.state &&
          <>
            <div className={classes.Filter}>
              {Props.FilterContent.element}
            </div> 
            <Divider style={{padding:"0px 8px",width:"100%"}}/>
          </>
          
        }
        {Props.AddForm.state &&
        <>
          <div className={classes.action}  >
            <div className={classes.actionType}>
              <div style={{display:'flex',alignItems:'center',padding:8}}>
                <Button id={`add_form`} className={classes.boardStylekey} onClick={Props.onClickAction} >
                  <Icon style={{ color: green[500] }}>add_circle</Icon>
                  {Props.Action.name}
                </Button>
              </div>
              <div style={{display:'flex'}}>
                {Props.thirdlyAction !== null ? 
                  <>
                    {Props.thirdlyAction.map((row:any,index:any)=>(
                      <div key={`thirdlyAction_${index}`} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <div className={classes.devider__Vertical}/>
                        {row.map((element:any,i:any)=>(
                          <div key={`thirdlyAction_row_${i}`} className={classes.unfold} style={{display:'flex',alignItems:'center',padding:0,margin:2}}>
                            {element}
                          </div>
                        ))}
                      </div>
                    ))}
                  </>:<></>
                } 
                {Props.SecondarryAction !== null ?
                  <div style={{display:'flex'}}>

                    <IconButton id={'btn_fold'} className={classes.unfold} onClick={Props.SecondarryAction.handleAction} >
                      {Props.SecondarryAction.icon}
                    </IconButton>
                  </div>:<></>  
                }
               </div>
            </div>
           

            
          
          </div> 
          
          <Divider style={{padding:"0px 8px",width:"100%"}}/>
        </>
        }
        { Props.Action.state &&
            <div style={{padding:8,width:"100%",display:'flex'}}>
              {Props.AddForm.element}
            </div>
          }
        {Props.MainContent !== null ?
          <div className={classes.content} style={{padding:8}}>
            {Props.MainContent}
          </div> :
           <></>
          
        }
        
    </div>
  );
}
export default MainContainer


