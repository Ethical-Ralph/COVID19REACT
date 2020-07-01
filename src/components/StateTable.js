import React from 'react';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const RowLoading = ({image}) => (
    <StyledTableRow>
        <StyledTableCell component="th" scope="row">
            {image}
        </StyledTableCell>
        <StyledTableCell align="right"> {image}</StyledTableCell>
        <StyledTableCell align="right"> {image}</StyledTableCell>
        <StyledTableCell align="right"> {image}</StyledTableCell>
        <StyledTableCell align="right"> {image}</StyledTableCell>
    </StyledTableRow >
)

const useStyles = makeStyles({
    table: {
        Width: 100,
    },
    container: {
        maxHeight: 440,
    }
});

const StateTable = ({states,isLoading}) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 'bold'}}>State</TableCell>
                        <TableCell style={{color: 'blue',fontWeight: 'bold'}} align="right">Confirmed</TableCell>
                        <TableCell style={{color: 'orange',fontWeight: 'bold'}} align="right">Active</TableCell>
                        <TableCell style={{color: 'green',fontWeight: 'bold'}} align="right">Discharged</TableCell>
                        <TableCell style={{color: 'red',fontWeight: 'bold'}} align="right">Death</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        isLoading ?
                            <RowLoading
                                image={<img src={require('../assest/loading.gif')} alt="loading" />}
                            />
                            :
                            states.map((row) => (
                                <StyledTableRow key={row.state}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.state}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.confirmedCases}</StyledTableCell>
                                    <StyledTableCell align="right">{row.activeCases}</StyledTableCell>
                                    <StyledTableCell align="right">{row.discharged}</StyledTableCell>
                                    <StyledTableCell align="right">{row.death}</StyledTableCell>
                                </StyledTableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        states: state.states,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(StateTable)