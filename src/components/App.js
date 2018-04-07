import React, { Component } from 'react';
import Season from './Season';
import Flags from './Flags';
import './../sass/main.css';

class App extends Component {
    render() {
        return (
            <div>
                <Flags />
                <Season />
            </div>
        );
    }
}

export default App;
