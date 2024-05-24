import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
  return {
    spreadBox: {
        justifyContent: "space-between",
        alignItems: "center",
      },
    box: {
    height: 60,
    display: "flex",
    padding: 14,
    },
    buttonsSize: {
      fontSize: "12px",
    },
    custom_switch:{
      display: "flex",
      margin: "15px 0",
      alignItems: "center"
    },
    tag_options: {
      width:"100px",
    },
    dialog_content_text: {
      color: "#495057"
    }
  };
});
export default useStyles;
