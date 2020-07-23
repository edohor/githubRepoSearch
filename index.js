import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';

class Application extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('root'));