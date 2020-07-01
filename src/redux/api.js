import axios from 'axios'

export const API_URL = ""

export const fetchNationalTotals = async () => {
  try {
    const data = await axios.get(`${API_URL}/api/totals`)
    return data.data
  }
  catch (err) {
    return err.response
  }
}

export const fetchStateTotals = async () => {
  try {
    const data = await axios.get(`${API_URL}/api/states`)
    return data.data
  }
  catch (err) {
    return err.response
  }
}


export const fetchNationalTimelines = async () => {
  try {
    const data = await axios.get(`${API_URL}/api/timelines`)
    return data.data
  }
  catch (err) {
    return err.response
  }

}

export const fetchStateTimelines = async () => {
  try {
    const data = await axios.get(`${API_URL}/api/timelines/states`)
    return data.data
  }
  catch (err) {
    return err.response
  }

}
