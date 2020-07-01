import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { connect } from 'react-redux'
import { getStateTimelines } from '../redux/action'
import { formatDate, capitialize } from '../utils'


const StateChart = ({ stateTimelines, getStateTimelines, statelist, isLoading }) => {
  const [ selectedState, setSelectedstate ] = useState('lagos')

  const findSelectedStatesData = () => {
    const stateData = stateTimelines.find(s => s.state === selectedState)
    return stateData
  }

  const touchData = () => {
    const stateData = findSelectedStatesData()
    const newData = stateData.data.map(data => {
      const newDate = formatDate(data.date)
      return {
        ...data, date: newDate
      }
    })
    return newData
  }


  useEffect(() => {
    getStateTimelines()
  }, [ getStateTimelines ])



  const selectState = (state) => {
    setSelectedstate(state)
  }

  return (
    isLoading ?
      <img src={require('../assest/loading.gif')} alt="loading" />
      :
      <>
        <div style={{ paddingLeft: '30px', paddingBottom: '10px', fontWeight: 'bold' }}>{capitialize(selectedState)}</div>
        <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div>Daily Timeline</div>
          <ResponsiveContainer>
            <BarChart
              data={touchData()}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="confirmed" stackId="a" fill="red" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <hr />
        <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div>Total Timelines</div>
          <ResponsiveContainer>
            <BarChart
              data={touchData()}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalConfirmed" stackId="a" fill="blue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <center>
          {
            statelist.map(state => (
              <button key={state} style={{ backgroundColor: 'white', borderRadius: '30px', borderColor: 'black', borderWidth: '1px', }} onClick={() => selectState(state)}>{capitialize(state)}</button>
            ))
          }
        </center>
      </>
  );
}

const mapStateToProps = (state) => {
  return {
    stateTimelines: state.stateTimelines,
    statelist: state.stateTimelines.map(val => val.state),
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, { getStateTimelines })(StateChart)