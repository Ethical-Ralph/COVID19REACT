import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import Topograpy from './Map';


const Map = () => {
  const [ data, setData ] = useState({})


  return (
    <>
      <Topograpy setData={setData} />
      <ReactTooltip>
        {
          data ? (
            <>
              <span>State: {data.state}</span><br />
              <span>Confirmed: {data.confirmedCases}</span><br />
              <span>Discharged: {data.discharged}</span><br />
              <span>Deaths: {data.death}</span>
            </>
          ) : (
              <div>No data for the selected region</div>
            )
        }</ ReactTooltip>
    </>
  )
}

export default Map