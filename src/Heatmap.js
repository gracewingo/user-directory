import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

export default class Heatmap extends React.Component{

    getValues(props){

    }


    render(){
        console.log(this.props)
        let values = this.getValues(this.props);
        return (
            <div></div>
        )
    }
}

