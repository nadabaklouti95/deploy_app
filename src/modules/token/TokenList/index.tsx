import * as React from "react";
import useStyles from "./styles";
import 'react-toastify/dist/ReactToastify.css';
import TokenValue from "../TokenValue";
import {Pagination, Skeleton} from "@material-ui/lab";

interface ITokenList {
  token:any,
  contextColor:any,
  deleteToken:any,
  fold:any,
  stateComponent:any
} 


  const TokenList: React.FC<ITokenList> = (props) => {
    const classes = useStyles();
    
    return (
      <div style={{width:'100%',height:'100%'}}>
        {props.stateComponent &&
            <div style={{width: "100%",padding:4}}>
              <Skeleton   height={80} />
              <Skeleton  height={80} />
              <Skeleton  height={80} />
            </div>
        }
        <div className={classes.container}>
          <div className={classes.listTokens}>
            {!props.stateComponent && props.token.map((row: any, index: any) => (
                <div key={`div_token_${index}`} style={{width: '100%', padding: 4}}>
                  <TokenValue key={index} token={row} context={props.contextColor} deleteToken={props.deleteToken}
                              indexToken={index} fold={props.fold}/>
                </div>
            ))}
          </div>
          <div className={classes.pagination} style={{padding: 8}}>
            <Pagination id={`list_pagination`} count={1} page={1} variant="outlined"
                        disabled={true}
            />
          </div>

        </div>
      </div>
    )
  };
export default TokenList;


