import React, { Component } from 'react';
import dataService from './services/dataService';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.data = {
            qa: []
        };
    }

    componentDidMount() {
        dataService.loadData().then((results) => {
            // console.log('result', results);
            this.data.qa.push(results[0]);
            this.data.qa.push(results[1]);

            this.data.sections = results[2];
            this.data.staets = data[3];
        });
    }

    render() {
        return (
            <h1>Hello, world.</h1>
        )
    }
}
