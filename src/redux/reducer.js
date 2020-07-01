import {
    FETCH_NATIONALTOTAL,
    FETCH_STATETOTAL,
    FETCH_NATIONALTIMELINE,
    FETCH_STATETIMELINE,
    API_ERROR
} from "./actionTypes";

const initialState = {
    totals: {},
    states: [],
    stateTimelines: [{
        state: 'lagos',
        data: []
    }],
    nationalTimelines: [],
    isLoading: true,
    errorOccurred: false
}

function reducer(state = initialState,action) {
    switch (action.type) {
        case FETCH_NATIONALTOTAL:
            state = {
                ...state,
                totals: action.data,
                isLoading: false,
                errorOccurred: false
            }
            return state

        case FETCH_STATETOTAL:
            state = {
                ...state,
                states: action.data,
                isLoading: false,
                errorOccurred: false
            }
            return state

        case FETCH_STATETIMELINE:
            state = {
                ...state,
                stateTimelines: action.data,
                isLoading: false,
                errorOccurred: false
            }
            return state

        case FETCH_NATIONALTIMELINE:
            state = {
                ...state,
                nationalTimelines: action.data,
                isLoading: false,
                errorOccurred: false
            }
            return state;

        case API_ERROR:
            state = {
                ...state,
                isLoading: true,
                errorOccurred: true

            }
            return state

        default:
            return state
    }
}


export default reducer