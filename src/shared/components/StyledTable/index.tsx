import {
  createStyles,
  TableCell,
  TableRow,
  Theme,
  withStyles,
} from "@material-ui/core";

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#e3f2fd",
      },
      "&:nth-of-type(even)": {
        backgroundColor: "white",
      },
    },
  })
)(TableRow);

export const ContextTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "white",
      },
      "&:nth-of-type(even)": {
        backgroundColor: "white",
      },
    },
  })
)(TableRow);

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#313541",
      color: theme.palette.common.white,

      textAlign: "center",
    },
    body: { fontSize: 14 },
  })
)(TableCell);
