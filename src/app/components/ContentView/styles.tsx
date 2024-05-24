import {makeStyles} from '@material-ui/core/styles';
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    appBar: {
        [theme.breakpoints.up("sm")]: {},
        background: theme.palette.background.default,
        position: "sticky",
        top: "-60px",
        boxShadow: "none",
        paddingBottom: "0px",
        paddingTop: "0px",
        marginTop:"25px"
      },
  };
});
export default useStyles;
