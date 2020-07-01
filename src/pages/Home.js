import React from 'react';
import Map from '../components/Map/index';
import {
  Typography,
  Grid,
  makeStyles
} from "@material-ui/core";

import DisplayCards from '../components/DisplayCards';
import StateTable from "../components/StateTable";
import NationalChart from '../components/NationalChart';
import StateChart from '../components/StateChart';


const useStyles = makeStyles({
  roundwhite: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5%'
  },
  icon: {
    width: "1.5rem",
    height: "1.5rem",
    marginLeft: '10px',
    transition: 'all 0.5s ease',
    '&:hover': {
      transform: 'scale(1.5)'
    }
  }
})

const Home = () => {
  const classes = useStyles()

  return (
    <>
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
      >
        <DisplayCards />

        <Grid
          container
          item
          xs={12}
          justify="center"
        >
          <Grid item xs={12}>
            <Map />
          </Grid>

        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <StateTable />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <div className={classes.roundwhite}>
              <Typography style={{ color: 'green' }}>National Timeline Charts</Typography>
              <NationalChart />
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <div className={classes.roundwhite}>
              <Typography style={{ color: 'green' }}>State Timeline Charts</Typography>
              <StateChart />
            </div>
          </Grid>

        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <Typography style={{ color: 'green' }}>
                Made with <span style={{ color: 'red' }}>&hearts;</span> by
                              <a href="https://github.com/Ethical-Ralph" style={{ color: 'green', textDecoration: 'none' }}>
                  <b> Ethical Ralph</b>
                </a>
              </Typography>
              <div >
                <a href="https://github.com/Ethical-Ralph" >
                  <img src={require('../assest/github-brands.svg')} className={classes.icon} alt="github" />
                </a>
                <a href="https://twitter.com/EthicalRalph" >
                  <img src={require('../assest/twitter-brands.svg')} className={classes.icon} alt="twitter" />
                </a>
                <a href="mailto:rakinola90@gmail.com">
                  <img src={require('../assest/envelope-solid.svg')} className={classes.icon} alt="mail" />
                </a>
              </div>
            </div>
          </Grid>

        </Grid>
      </Grid>
    </ >
  );
}



export default Home;
