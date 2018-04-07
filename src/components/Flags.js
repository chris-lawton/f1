import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Flags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seasonData: [],
            isLoading: true
        };
    }

    componentDidMount() {
        axios
            .get('https://ergast.com/api/f1/2018.json')
            .then(response => {
                this.setState({
                    seasonData: response.data.MRData.RaceTable.Races,
                    isLoading: false
                });
            })
            .catch(error => console.log(error));
    }

    render(){
        if (this.state.isLoading) {
            return null;
        }
        return (
            <div className="wrapper wrapper--flags">
                {this.state.seasonData.map(race => {
                    return (
                        <NavLink to={race.round} key={race.round}>
                            <div className={`flag flag--small flag--${race.Circuit.Location.country.toLowerCase()}`} />
                        </NavLink>
                    );
                })}
            </div>
        );
    }
}

export default Flags;
