import React from 'react'
import {
    Typography,
} from '@material-ui/core'
import Countup from 'react-countup'



const DisplayCard = ({title,number,classes}) => {

    return (
        <>
            <div style={{backgroundColor: 'white',padding: '10px',borderRadius: '10%'}}>
                <div className={classes} style={{textAlign: 'center'}}>
                    <Typography>
                        <b>{title}</b>
                    </Typography>
                    <Typography>
                        {
                            number ?
                                <b style={{fontSize: "30px"}}>
                                    <Countup
                                        start={0}
                                        end={number}
                                        duration={2.75}
                                        separator=","
                                    />
                                </b> :
                                <img src={require('../assest/loading.gif')} alt="loading" />
                        }
                    </Typography>
                </div>
            </div >

        </>
    )
}

export default DisplayCard