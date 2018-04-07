import React from 'react';

class RaceHeader extends React.Component {
    render() {
        return (
            <div>
                <div className="wrapper wrapper--race-header">
                    <div className={`flag flag--${this.props.circuit.Location.country.toLowerCase()}`} />
                    <div>
                        <h2>{this.props.circuit.circuitName}</h2>
                        <h3>{this.props.circuit.Location.country}</h3>
                        <h4>{this.props.circuit.Location.locality}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default RaceHeader;
