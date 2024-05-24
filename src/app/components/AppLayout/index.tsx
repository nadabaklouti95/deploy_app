import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../utility/AppContext";
import Layouts from "./Layouts";
import { ContentView } from "../../index";
import useStyles from "../../../shared/jss/common/common.style";
import { AppState } from "../../../redux/store";
import AppContextPropsType from "../../../types/AppContextPropsType";

const useStyle = makeStyles(() => ({
  appAuth: {
    flex: 1,
    display: "flex",
    position: "relative",
    height: "100vh",
    background: "url(/assets/images/loginImg/bg1.jpg) no-repeat center center",
    backgroundColor:"rgb(49, 53, 65)",
    backgroundSize: "cover",
    "& .scrollbar-container": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding:2
    },
    "& .main-content-view": {
      padding: 20,
    },
    "& .footer": {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  loginBg: {
    width:"100%",
    height:"100%",
    position:"absolute",
    top:0,left:0,
    backgroundColor:"rgb(49, 53, 65)",
    opacity:0.8
  }
}));

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  useStyles();
  const { navStyle } = useContext<AppContextPropsType>(AppContext);
  const { user } = useSelector<AppState, AppState["auth"]>(({ auth }) => auth);
  const AppLayout = Layouts[navStyle];

  const classes = useStyle();
  return (
    <>
      {user ? (
        <AppLayout />
      ) : (
        <Box className={classes.appAuth}>
          <div className={classes.loginBg}></div>
          <ContentView />
        </Box>
      )}
    </>
  );
};

export default React.memo(AppLayout);
