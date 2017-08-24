import React, { Component } from 'react';
import dataService from './services/dataService';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tree: null
        }

        this.data = {
            qa: []
        };
    }

    componentDidMount() {
        dataService.loadData().then((results) => {
            // console.log('result', results);
            this.data.qa = this.data.qa.concat(results[0]);
            this.data.qa = this.data.qa.concat(results[1]);

            this.data.sections = results[2];
            this.data.states = dataService.getUniqueStateArr(results[3]);

            let tree = dataService.getTree(this.data.sections, this.data.qa);
            
            this.setState({tree});
            
            this.setEvents();
        });
    }

    setEvents() {
        jQuery('question').click(function() {
            jQuery(this).parent('.qas-wrapper').toggleClass('active');
        });
    }

    render() {
        let tree = '<div></div>';

        if (this.state.tree !== null) {
            tree = dataService.getTreeDoms(this.state.tree, this.data.states);
        }

        return (
            <div className='container'>
                <div dangerouslySetInnerHTML={{__html: tree}} className='tree-container'></div>
            </div>
        )
    }
}
