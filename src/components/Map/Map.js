import React, { memo, useEffect, useState } from 'react'
import { connect } from "react-redux";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { getStateTotals } from "../../redux/action";
import { scaleSequential } from "d3-scale";
import { interpolateGreens, interpolateReds, interpolateBlues, interpolateOranges } from 'd3'
import {
  Typography,
  makeStyles,
} from '@material-ui/core'
import { capitialize } from '../../utils'

const mapTopology = require('../../mapdata.json')


const useStyles = makeStyles({
  button: {
    padding: '9px',
    margin: '2px',
    borderRadius: '5rem',
    border: '1px',
    color: 'white',
    boxShadow: '0px 1px 5px 0px rgb(123, 53, 53)',
    fontWeight: 'bold',
    transition: 'all 0.5s ease',
    '&:hover': {
      transform: "translateY(5px)"
    }
  },
  buttongroup: {
    display: "flex",
    justifyContent: "center",
    padding: '10px',
  }
})


const Map = ({ getStateTotals, setData, states, isLoading }) => {
  const [ datakey, setDatakey ] = useState('confirmedCases')
  const classes = useStyles()

  const getInterpolator = (t) => {

    switch (datakey) {
      case 'confirmedCases':
        return interpolateBlues(t * 5)
      case 'activeCases':
        return interpolateOranges(t * 3)
      case 'discharged':
        return interpolateGreens(t * 8)
      case 'death':
        return interpolateReds(t * 30)
      default:
        return interpolateReds(t * 3)
    }
  }


  const changeDatakey = (key) => {
    setDatakey(key)
  }

  const ii = (t) => {
    return getInterpolator(t)
  }
  const colourScale = scaleSequential(ii).domain([ 1, 5000 ])

  useEffect(() => {
    getStateTotals()
  }, [ getStateTotals ])

  const findStateData = (id) => {
    return states.find(s => capitialize(s.state.toLowerCase()) === capitialize(id.toLowerCase()))
  }


  const onMouseEnter = (geo) => {
    const stateData = findStateData(geo.properties.ID)
    setData(stateData)
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5%', }}>
      <Typography style={{ color: 'green' }} variant="h5">
        Map
            </Typography>
      {
        isLoading &&
        <img src={require('../../assest/loading.gif')} alt="loading" />
      }
      <>
        <ComposableMap
          projection='geoAzimuthalEqualArea'
          projectionConfig={{
            scale: 3000,
            center: [ 8.49, 9.15 ]

          }}
        >
          <Geographies data-tip="map" geography={mapTopology}>
            {
              ({ geographies }) =>
                geographies.map(geo => {

                  const d = findStateData(geo.properties.ID)

                  const colour = d ? colourScale(d[ datakey ]) : "#F5F4F9"
                  return (
                    < Geography
                      key={geo.rsmKey}
                      geography={geo}
                      stroke="rgb(209, 33, 32)"
                      onMouseEnter={() => onMouseEnter(geo)}
                      onMouseLeave={() => setData({})}
                      fill={colour}
                    />
                  )
                })
            }
          </Geographies>
        </ComposableMap>
        <div className={classes.buttongroup}>
          <button className={classes.button} style={{ backgroundColor: "blue" }} onClick={() => changeDatakey('confirmedCases')}>Confirmed</button>
          <button className={classes.button} style={{ backgroundColor: "orange" }} onClick={() => changeDatakey('activeCases')}>Active</button>
          <button className={classes.button} style={{ backgroundColor: "green" }} onClick={() => changeDatakey('discharged')}>Discharged</button><br />
          <button className={classes.button} style={{ backgroundColor: "red" }} onClick={() => changeDatakey('death')}>Death</button>
        </div>
      </>

    </div>

  )
}




const mapStateToProps = (state) => {
  return {
    states: state.states,
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, { getStateTotals })(memo(Map))