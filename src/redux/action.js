import {
    FETCH_NATIONALTOTAL,
    FETCH_STATETOTAL,
    FETCH_NATIONALTIMELINE,
    FETCH_STATETIMELINE,
    API_ERROR
} from "./actionTypes";
import {
    fetchNationalTotals,
    fetchStateTotals,
    fetchStateTimelines,
    fetchNationalTimelines
} from "./api";

import {capitialize,formatDate} from "../utils";

const apiError = () => {
    return {
        type: API_ERROR
    }
}

const nationalTotals = (data) => {
    return {
        type: FETCH_NATIONALTOTAL,
        data
    }
}

const stateTotals = (data) => {
    data = data.map(val => {
        return {
            ...val,
            state: capitialize(val.state)
        }
    })
    return {
        type: FETCH_STATETOTAL,
        data
    }
}

const stateTimelines = (data) => {
    return {
        type: FETCH_STATETIMELINE,
        data
    }
}

const nationalTimelines = (data) => {
    data = data.map(val => {
        return {
            ...val,
            date: formatDate(val.date)
        }
    })
    return {
        type: FETCH_NATIONALTIMELINE,
        data
    }
}

export const getNationalTotals = () => {
    return async (dispatch) => {
        try {
            const data = await fetchNationalTotals();
            dispatch(nationalTotals(data.data));
        } catch {
            dispatch(apiError())
        }
    }
}

export const getStateTotals = () => {
    return async (dispatch) => {
        try {
            const data = await fetchStateTotals();
            dispatch(stateTotals(data.data));
        } catch{
            dispatch(apiError())
        }

    }
}

export const getStateTimelines = () => {
    return async (dispatch) => {
        try {
            const data = await fetchStateTimelines();
            dispatch(stateTimelines(data.data));
        } catch {
            dispatch(apiError())
        }

    }
}

export const getNationalTimelines = () => {
    return async (dispatch) => {
        try {
            const data = await fetchNationalTimelines();
            dispatch(nationalTimelines(data.data));
        } catch {
            dispatch(apiError())
        }

    }
}