import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";

import rootReducer from './redux/reducer'

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)


// store.subscribe(() => {console.log(store.getState())})


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

serviceWorker.registerServiceWorker()

