import { withStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: 'white',
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#52d869',
        borderColor: '#52d869',
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid none`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#e57373",
  },
  checked: {},
}))(Switch);


export default CustomSwitch