/* eslint-disable no-dupe-keys */
import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles({
    navbar: {
        background: '#52c234', /* fallback for old browsers */
        background: '-webkit-linear-gradient(to right, #6caf5a, #2d7115)', /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to right, #6caf5a, #2d7115)',
        alignItems: 'center',
        textAlign: 'center',
    },
    'navbar-text': {
        fontSize: '1.5em',
        fontWeight: 'bold'
    },
    'nav-img': {
        marginRight: '1rem'
    }
})



const Navbar = () => {

    const classes = useStyles()

    return (
        <Box component="nav" style={{marginBottom: '1rem'}}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <img src={require('../assest/virus.png')} height='35rem' className={classes["nav-img"]} alt="logo" />
                    <Typography variant="h4" className={classes["navbar-text"]}>
                        COVID-19 NIGERIA
                        </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default Navbar;