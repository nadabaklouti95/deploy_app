import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ITagValueStats } from 'types/models/interface';
import { useEffect, useState } from "react";
import { handleErrors } from 'shared/constants/HandleErrors';
import { CircularProgress } from '@material-ui/core';
import useStyles, { StyledTableCell, StyledTableRow } from '../styles';
import { getTagsStatistics } from 'shared/services/tagsService';


const createData = (name: any, nbr: any, published: any, draft: any) => {
  return { name, nbr, published, draft };
}

const TagValueStats: React.FC<ITagValueStats> = (props) => {
  const classes = useStyles();

  const [rows, setRows] = useState<any>([])
  const [loading,setLoading] = useState<boolean>(false)

    useEffect(() => {
      setLoading(true)
      getTagsStatistics(props.tag.id).then(result => {
        setRows([
          createData('Properties', 
            result.propertyKeyStatistics?.totalPropertyKey, 
            result.propertyKeyStatistics?.totalOnlinePropertyKey, 
            result.propertyKeyStatistics?.totalDraftPropertyKey
          ),
          createData('Values', 
            result.propertyValueStatistics?.totalPropertyValue, 
            result.propertyValueStatistics?.totalOnlinePropertyValue, 
            result.propertyValueStatistics?.totalDraftPropertyValue
          )
        ])  
        setTimeout(() => {
          setLoading(false)
      }, 100);

  
      }).catch(function (error) {
        handleErrors(error, true, null)
        setLoading(false)
  
      })
      }, [props.tag?.id]);

    return (
      <div>
        {loading?
        <div className={classes.progressStats}>
          <CircularProgress disableShrink size={30} />
        </div>
        :
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell ></StyledTableCell>
                  <StyledTableCell align="center">Number of items</StyledTableCell>
                  <StyledTableCell align="center">Published</StyledTableCell>
                  <StyledTableCell align="center">Draft</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row:any) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row" style={{paddingLeft:10, fontWeight:"bold"}}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.nbr} </StyledTableCell>
                    <StyledTableCell align="center">{row.published}</StyledTableCell>
                    <StyledTableCell align="center">{row.draft}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        
      </div>
    
        
    )
}

export default TagValueStats;
