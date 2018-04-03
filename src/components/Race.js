import React from 'react';
import axios from 'axios';

class Race extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            circuit: [],
            results: [],
            isLoading: true
        };
    }
    componentDidMount() {
        axios
            .get(
                `https://ergast.com/api/f1/2018/${
                    this.props.match.params.race
                }/results.json`
            )
            .then(response => {
                this.setState({
                    circuit: response.data.MRData.RaceTable.Races[0].Circuit,
                    results: response.data.MRData.RaceTable.Races[0].Results,
                    isLoading: false
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }
        return (
            <div>
                <div className="wrapper wrapper--race-header">
                    <div className={`flag flag--${this.state.circuit.Location.country.toLowerCase()}`} />
                    <div>
                        <h2>{this.state.circuit.circuitName}</h2>
                        <h3>{this.state.circuit.Location.country}</h3>
                        <h4>{this.state.circuit.Location.locality}</h4>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Pos.</th>
                            <th></th>
                            <th>Name</th>
                            <th>Num.</th>
                            <th>Team</th>
                            <th>Laps</th>
                            <th>Time</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results.map(driver => {
                            return (
                                <tr
                                    key={driver.position}
                                    className={`${driver.Constructor.constructorId} ${driver.Time ? '' : 'dnf'}`}
                                >
                                    <td>{driver.position}.</td>
                                    <td className={driver.Constructor.name.toLowerCase()}></td>
                                    <td>
                                        {driver.Driver.givenName}{' '}
                                        {driver.Driver.familyName}
                                    </td>
                                    <td>{driver.Driver.permanentNumber}</td>
                                    <td>{driver.Constructor.name}</td>
                                    <td>{driver.laps}</td>
                                    <td>
                                        {driver.Time ? driver.Time.time : 'DNF'}
                                    </td>
                                    <td>{driver.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Race;
