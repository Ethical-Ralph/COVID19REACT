import React, { useState, useEffect } from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  error: {
    padding: '10px',
    width: '100%',
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
    transition: 'all 0.5 ease'
  },
  hidden: {
    display: 'none'
  },
  visible: {
    display: 'block'
  }
})

const ErrorAlert = ({ error, errorOccurred }) => {


  const [ isOpen, setIsopen ] = useState(false)


  useEffect(() => {
    if (errorOccurred) {
      setIsopen(true)
      startTimeout()
    } else {
      setIsopen(false)
    }
  }, [ errorOccurred ])


  const startTimeout = () => {
    setTimeout(() => {
      setIsopen(false)
    }, 6000)
  }


  const classes = useStyles()

  return (
    <div className={clsx(classes.error, isOpen ? classes.visible : classes.hidden)}>
      {error}
    </div >
  )
}


export default ErrorAlert;