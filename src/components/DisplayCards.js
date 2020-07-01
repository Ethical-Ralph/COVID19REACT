import React,{useEffect} from 'react'
import {
    Grid,
    makeStyles
} from '@material-ui/core'
import {connect} from 'react-redux'
import Card from './Card'
import {getNationalTotals} from '../redux/action'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',

    },
    Paper: {
        padding: '30px',
        margin: '10px'
    },
    confirmed: {
        color: "#202090"
    },
    discharged: {
        color: "green"
    },
    active: {
        color: "orange"
    },
    death: {
        color: "red"
    }
})


const DisplayCards = ({totals,getNationalTotals}) => {

    const classes = useStyles()

    useEffect(() => {
        getNationalTotals()
    },[getNationalTotals])



    return (
        <Grid
            item
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={6} md={3}>
                <Card
                    title="Confirmed"
                    classes={classes.confirmed}
                    number={totals.confirmedCases}
                />
            </Grid>
            <Grid item xs={6} md={3}>
                <Card
                    title="Active"
                    classes={classes.active}
                    number={totals.activeCases}
                />
            </Grid>
            <Grid item xs={6} md={3}>
                <Card
                    title="Discharged"
                    classes={classes.discharged}
                    number={totals.discharged}
                />
            </Grid>
            <Grid item xs={6} md={3}>
                <Card
                    title="Death"
                    classes={classes.death}
                    number={totals.death}
                />
            </Grid>
        </Grid>
    )
}

const mapStatetoProps = (state) => {
    return {
        totals: state.totals,
    }
}

export default connect(mapStatetoProps,{getNationalTotals})(DisplayCards)

