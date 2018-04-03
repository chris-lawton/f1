import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { parseDay, parseMonth, compareDate } from '../helpers';

class Season extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seasonData: [],
            winners: []
        };
    }

    componentDidMount() {
        axios
            .get('https://ergast.com/api/f1/2018.json')
            .then(response => {
                this.setState({
                    seasonData: response.data.MRData.RaceTable.Races
                });
                return axios.get('https://ergast.com/api/f1/2018/results/1.json');
            })
            .then(res => {
                this.setState({
                    winners: res.data.MRData.RaceTable.Races[0].Results
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="grid">
                {this.state.seasonData.map(race => {
                    return (
                        <NavLink
                            to={race.round}
                            key={race.round}
                            className={`card card--${race.Circuit.Location.country.toLowerCase()} ${compareDate(race.date)}`}
                        >
                            <div className="card__header">
                                <div className="card__date">
                                    <p className="card__day">
                                        {parseDay(race.date)}
                                    </p>
                                    <p className="card__month">
                                        {parseMonth(race.date)}
                                    </p>
                                </div>
                                <div className="card__title">
                                    <p className="card__race">
                                        {race.raceName}
                                    </p>
                                    <p className="card__circuit">
                                        {race.Circuit.circuitName}
                                    </p>
                                    <p className="card__country">
                                        {race.Circuit.Location.country}
                                    </p>
                                    <div
                                        className={`card__track card__track--${race.Circuit.Location.country.toLowerCase()}`}
                                    />
                                </div>
                            </div>
                            <p className="card__round">{race.round}</p>
                            <div className="card__line" />
                        </NavLink>
                    );
                })}
            </div>
        );
    }
}

export default Season;
