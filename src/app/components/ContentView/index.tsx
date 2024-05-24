import React, { useContext } from "react";
import { renderRoutes } from "react-router-config";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { AppSuspense } from "../../index";
import routes from "../../../modules";
import Scrollbar from "../Scrollbar";
import AppContext from "../../utility/AppContext";
import AppFooter from "../AppLayout/AppFooter";
import Box from "@material-ui/core/Box";
import { RouteTransition } from "../../../shared/constants/AppEnums";
import AppErrorBoundary from "../AppErrorBoundary";
import AppContextPropsType from "../../../types/AppContextPropsType";
import { AppBar, makeStyles } from "@material-ui/core";
import useStyles from "./styles";
import ComboBox from "modules/store/StoreList/comboBox";
import { ComboBoxRoutes } from "shared/constants/AppConst";

interface TransitionWrapperProps {
  children: any;
}

const findPath =(pathName:string)=> {
  let result = false
  let pathInList = ComboBoxRoutes.find((Element:any)=> pathName.includes(Element))
  if (pathInList !== undefined){
    result = true
  }
  return result
}
const useStyle = makeStyles(() => ({
  app: {
    
    "& .main-content-view": {
      padding: 2,
    }
  },
}));


const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  
  const classes = useStyles();
  const { rtAnim } = useContext<AppContextPropsType>(AppContext);
  const location = useLocation();
  const statusPath = findPath(location.pathname)
  if (rtAnim === RouteTransition.NONE) {
    return <>
    {statusPath &&
      <AppBar className={classes.appBar}>
        <ComboBox props={""} />
      </AppBar>
    }
    
    {children}
    </>;
  }
  return (
    <TransitionGroup appear enter exit>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames={rtAnim}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

const ContentView = () => {
  const classes = useStyle();

  return (
    <Scrollbar>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        className={classes.app}
        style={{padding:2}}
      >
        <AppSuspense>
          <AppErrorBoundary>
          
            <TransitionWrapper >{renderRoutes(routes)}</TransitionWrapper>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </Scrollbar>
  );
};

export default ContentView;
