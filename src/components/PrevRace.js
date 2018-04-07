import React from 'react';
import axios from 'axios';

class PrevRace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            isLoading: true
        };
    }

    componentDidMount() {
        axios
            .get(`https://ergast.com/api/f1/2018/${this.props.raceNumber }/results.json`)
            .then(response => {
                    this.setState({
                    results: response.data.MRData.RaceTable.Races[0].Results,
                    isLoading: false
                });
            })
            .catch(error => console.log(error));
    }

    render(){
        if (this.state.isLoading) {
            return null;
        }

        return(
            <div>
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

export default PrevRace;
