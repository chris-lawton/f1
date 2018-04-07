import React from 'react';
import { daysUntilLightsOut } from './../helpers';

class FutureRace extends React.Component {
    constructor(){
        super();

        this.state = {
            daysUntilRace: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({
            daysUntilRace: daysUntilLightsOut(this.props.raceDate),
            isLoading: false
        })
    }

    render(){
        if (this.state.isLoading) {
            return null;
        }

        return(
            <div>
                <h1>{this.state.daysUntilRace} days until lights out!</h1>
            </div>
        );
    }
}

export default FutureRace;
