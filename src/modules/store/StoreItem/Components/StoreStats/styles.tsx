import { makeStyles } from "@material-ui/core";
import { AppTheme } from "types/AppContextPropsType";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';


const useStyles = makeStyles((theme: AppTheme) => {
  return {
   
    progress:{
      display:'flex',
      height: '204px',
      alignItems:'center',
      width:'100%',
      justifyContent:'center'
  },
  
  };
});
export default useStyles;


export const StyledTableCell:any = styled(TableCell)(({ theme }) => ({
  width:80,
  [`&.${tableCellClasses.head}`]: {
    fontWeight:"bold",
    padding: '7px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '10px 0px',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    //backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
