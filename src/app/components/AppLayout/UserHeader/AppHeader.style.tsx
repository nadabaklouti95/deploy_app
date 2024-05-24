import {alpha, makeStyles} from '@material-ui/core/styles';
import {AppTheme} from '../../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: AppTheme) => ({
  appToolbar: {
    paddingLeft: 20,
    paddingRight: 20,
    height:55,
    minHeight: "55px !important",
    [theme.breakpoints.up('sm')]: {
      //minHeight: 70,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    width: 35,
    height: 35,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    minHeight: 58,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    [theme.breakpoints.up('xl')]: {
      minHeight: 65,
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    width: '100%',
    //boxShadow: '4px 3px 4px 0px rgba(0,0,0,0.12)',

    /*backgroundColor:"rgb(49, 53, 65)",
    color:"#f9f9f9", */
    backgroundColor:"#f9f9f9",
    color:"rgb(49, 53, 65)",
    fontWeight:"bold",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)"
  },
  menuItemRoot: {
    padding: 0,
  },
  pointer: {
    cursor: 'pointer',
  },
  logoRoot: {
    verticalAlign: 'middle',
    display: 'inline-block',
    height: 30,
  },
  menuItem: {
    padding:"16px 0px", 
    width:200, 
    fontWeight:"bold",
    '&.Mui-disabled': {
      opacity: 1,
  },
  },
  logout:{
    borderRadius:"6px",
    paddingRight:"27px",
    paddingLeft:"15px",
    display:"flex", 
    alignItems:"center", 
    height:"44px", 
    justifyContent:"center", 
    width:"100%", 
    transition: "background-color 0.3s", 

    cursor:"pointer",
    '&:hover': {
      backgroundColor: '#0A8FDC',
      color:"#f9f9f9",
    },
  },
  logoutIcon:{
    //color:"#f9f9f9",
    marginRight:"16px"
  },
  exitIcon:{
    color:"#74788d",
    margin:"0px 16px"
  },
  accountIcon:{
    margin:"0px 16px"
  },
  menuItems:{
    display:"flex", 
    alignItems:"center", 

  },
  menuUserItem:{
    display:"flex", 
    alignItems:"center", 
    height:"100%", 
    justifyContent:"center", 
    width:"100%"
  },
  usernameItem:{
    width:144,
    whiteSpace: "pre-wrap", 
    overflowWrap: "break-word"
  },
  divider_Vertical:{
    width:'1px',
    height:'42px',
    background:"#c9b7b7",
    marginLeft:20,
    marginRight:10,
  },
}));
export default useStyles;
