import React, { Component } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Home from './Home.js';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount() {

    }

    render() {
        return (
            <div className='App-div'>
                <div className='title'>Edo Horvat - GitHub repository React App</div>
                <div className='content'>
                    <Switch>
                        <Route exact path={""} render={Home} />
                        <Route exact path={"/user/:userId"} render={({match, history}) => <Home match={match} history={history} />} />
                        <Route exact path={"/404"} render={({match, history}) => <Home match={match} history={history} />} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(App);