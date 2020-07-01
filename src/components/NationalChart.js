import React,{useEffect} from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import {connect} from "react-redux";
import {getNationalTimelines} from "../redux/action";


const NationalCharts = ({nationalTimelines,getNationalTimelines,isLoading}) => {




    useEffect(() => {
        getNationalTimelines()
    },[getNationalTimelines])



    return (
        isLoading ?
            <img src={require('../assest/loading.gif')} alt="loading" />
            :
            <>
                <div style={{display: 'flex',alignItems: 'center',flexDirection: 'column',width: '100%',height: 300}}>
                    <div>Daily Timeline</div>
                    <ResponsiveContainer>
                        <BarChart
                            width={100}
                            height={300}
                            data={nationalTimelines}

                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar type="monotone" dataKey="total" fill="red" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <hr />
                <div style={{display: 'flex',alignItems: 'center',flexDirection: 'column',width: '100%',height: 300}}>
                    <div>Total Timeline</div>
                    <ResponsiveContainer>
                        <BarChart
                            data={nationalTimelines}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar type="monotone" dataKey="totalConfirmed" fill="blue" />

                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </>
    );
}


const mapStateToProps = (state) => {
    return {
        nationalTimelines: state.nationalTimelines,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps,{getNationalTimelines})(NationalCharts)


