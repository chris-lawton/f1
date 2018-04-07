import React from 'react';
import axios from 'axios';
import PrevRace from './PrevRace';
import FutureRace from './FutureRace';
import RaceHeader from './RaceHeader';
import { isDateBeforeToday } from './../helpers';

class Race extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            race: [],
            circuit: [],
            results: [],
            isLoading: true
        };
    }

    componentDidMount() {
        axios
            .get(`https://ergast.com/api/f1/2018/${this.props.match.params.race}.json`)
            .then(response => {
                this.setState({
                    race: response.data.MRData.RaceTable.Races[0],
                    circuit: response.data.MRData.RaceTable.Races[0].Circuit,
                    isLoading: false
                });
                return axios.get(`https://ergast.com/api/f1/2018/${
                    this.props.match.params.race
                }/results.json`);
            })
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }
        if (isDateBeforeToday(this.state.race.date)) {
            return (
                <div>
                    <RaceHeader race={this.state.race} circuit={this.state.circuit} />
                    <PrevRace raceNumber={this.state.race.round} />
                </div>
            );
        } else {
            return(
                <div>
                    <RaceHeader race={this.state.race} circuit={this.state.circuit} />
                    <FutureRace raceDate={this.state.race.date} />
                </div>
            )
        }
    }
}

export default Race;
