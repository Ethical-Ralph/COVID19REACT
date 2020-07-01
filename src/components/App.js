import React, { useEffect } from 'react';
import {
  CssBaseline,
  Container,
  makeStyles,
  useMediaQuery
} from "@material-ui/core";
import { connect } from 'react-redux'
import Home from '../pages/Home'
import ErrorAlert from '../components/ErrorAlert';
import Navbar from '../components/Navbar';
import * as serviceWorker from "../serviceWorker";



const useStyles = makeStyles({
  root: {
    display: 'flex',
  }
})



const App = ({ errorOccurred }) => {
  const classes = useStyles()
  const match = useMediaQuery("(min-width:1024px)")
  const isOffline = !navigator.onLine


  const pushservice = async () => {
    serviceWorker.getUserSubscription().then(async (subscription) => {
      if (subscription === null) {
        const sub = await serviceWorker.createNotificationSubscription()
        return serviceWorker.saveSubscription(sub)
      }
      const subId = serviceWorker.getSubscriptionId()
      if (!subId && typeof subId === 'undefined') {
        const sub = await serviceWorker.createNotificationSubscription()
        return serviceWorker.saveSubscription(sub)
      }
      return serviceWorker.updateSubscription(subId, subscription)
    })
  }

  useEffect(() => {
    if (serviceWorker.isServiceWorkerSupported() && serviceWorker.isPushNotificationSupported()) {
      pushservice()
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <Navbar />
      <ErrorAlert errorOccurred={errorOccurred} error="An internal server error occurred" />
      <ErrorAlert errorOccurred={isOffline} error="App offline falling back to cache" />
      <Container maxWidth={match && 'md'} className={classes.root}>
        <Home />
      </Container>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    errorOccurred: state.errorOccurred
  }
}

export default connect(mapStateToProps)(App)