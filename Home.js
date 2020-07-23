import React, { Component, useEffect } from 'react'
import './App.css'
import { withRouter } from 'react-router-dom';

let pathname = "/"

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            search: "",
            data: [],
            repos: []
        }
    }

    componentDidMount() {
        if(this.props.history.location.state !== undefined){
            fetch('https://api.github.com/users/' + this.props.history.location.state.userId)
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log("result = ", result);
                        this.setUserInfo(result);
                    },
                    (error) => {
                        // console.log("repos error = ", error);
                    })           
        } else if(this.props.history.location.pathname !== "/"){
            let pathname = this.props.history.location.pathname.toString();
            let search = pathname.slice(pathname.lastIndexOf("/"));
            fetch('https://api.github.com/users' + search)
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log("result = ", result);
                        this.setUserInfo(result);
                    },
                    (error) => {
                        // console.log("repos error = ", error);
                    })           
        } else {
            fetch('https://api.github.com/users/example')
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log("result = ", result);
                        this.setUserInfo(result);
                    },
                    (error) => {
                        // console.log("repos error = ", error);
                    }) 
        }
    }

    componentDidUpdate() {
        if(this.props.location.pathname !== pathname){
            pathname = this.props.location.pathname;
            if(this.props.history.location.state !== undefined){
                
                this.setState({
                    search: ""
                })

                fetch('https://api.github.com/users/' + this.props.history.location.state.userId)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            // console.log("result = ", result);
                            this.setUserInfo(result);
                        },
                        (error) => {
                            // console.log("repos error = ", error);
                        }) 
                            
            } else if (this.props.history.location.state === undefined) {
                
                this.setState({
                    search: ""
                })

                fetch('https://api.github.com/users/example')
                    .then(res => res.json())
                    .then(
                        (result) => {
                            // console.log("result = ", result);
                            if(result.message === undefined){
                                this.setUserInfo(result);
                            } else {
                                // console.log("ERROR");
                                userInfo = "An Error occured. Please try again."
                            }
                        },
                        (error) => {
                            // console.log("repos error = ", error);
                        }) 
            }
        }
    }

    getRepos(repos) {
        this.setState({
            repos: repos
        })
    }

    setUserInfo(userInfo){
        this.setState({
            data: userInfo
        })
            
        if(userInfo.repos_url !== undefined){
            fetch(userInfo.repos_url)
                .then(res => res.json())
                .then(
                (result) => {
                    // console.log("repos result = ", result);
                    if(result.message === "Not Found"){
                        
                    } else {
                        this.getRepos(result);
                    }
                },
                (error) => {
                    // console.log("repos error = ", error);
                }) 
        } else if (result.message === "API rate limit exceeded for 176.62.6.130. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"){
            userInfo = "An Error occured. Please try again."
            this.forceUpdate();
        }
    }

    search = () => {
        fetch('https://api.github.com/users/' + this.state.search)
            .then(res => res.json())
            .then(
            (result) => {
                // console.log("result = ", result);
                if(result.message === "Not Found"){
                    this.setState({
                        data: []
                    })
                    this.props.history.push({
                        pathname: "/404",
                        state: {...this.props.history.location.state}
                    });
                } else {
                    this.setUserInfo(result);
                    this.props.history.push({
                        pathname: "/user/" + this.state.search,
                        state: {...this.props.history.location.state, userId: this.state.search}
                    });
                
                    this.setState({
                        search: ""
                    })
                }
              },
              (error) => {
                // console.log("error = ", error);
              }) 
    }

    onSearchChange(event) {
        this.setState(prevState => ({
            ...prevState,
            search: event
        }))
    }

    render() {

        let userInfo = null;
        let repos = [];
        let repoList = null;
        let repoTable = null;
        let email = null;

        if(this.state.repos.length > 0){
            this.state.repos.map(r => {
                Object.assign(repos, this.state.repos)
            });
            let counter = 0;
            repoList = repos.map(r => {
                counter++;
                return (
                <tr>
                    <td className='tableDataCounter'><div key={r}>{counter}</div></td>
                    <td className='tableData'><div key={r}>{r.name}</div></td>
                    <td className='tableData'><div key={r}>{r.description}</div></td>
                    <td className='tableData'><div className='repoLink' key={r}><a href={r.html_url} target="_blank">{r.name}</a></div></td>
                </tr>
                )
            })
            repoTable = (
            <table className='repoTable'>
                <tr className='tableHeader'>
                    <th className='tableDataCounter'></th>
                    <th className='tableData'>Name</th>
                    <th className='tableData'>Description</th>
                    <th className='tableData'>Link</th>
                </tr>
                {repoList}
            </table>
            )
        } else {
            repoTable = <div>No repositories found.</div>
        }

        if (this.state.data.email !== null){
            email = (<a href={this.state.data.email}>{this.state.data.email}</a>);
        } else {
            email = <span>No email found.</span>
        }

        if(this.state.data.length === 0){
            userInfo = (
                <div className='noUser'>No user found</div>
            )
        } else {
            userInfo = (
                <div className='userInfo'>
                    <div className='userTile'>
                        <div className='profilePic'>
                            <img src={this.state.data.avatar_url} className='profilePicImg' />
                        </div>
                        <div className='userDetail'>
                            <div className='username'>{this.state.data.login}</div>
                            <div className='email'>Email: {email}</div>
                            <div className='githubLink'>GitHub: <a href={this.state.data.html_url} target="_blank">{this.state.data.html_url}</a></div>
                        </div>
                    </div>
                    <div className='repos'><b>Repositories:</b>
                        {repoTable}
                    </div>
                </div>
            )
        }

        return (
            <div>
                <form
                    onSubmit={this.search}
                    id='search'
                    className='searchForm'
                    onKeyDown={
                        (e) => {
                            if(e.key === "Enter"){
                                this.search();
                                e.preventDefault();
                            }
                        }
                    }>
                    <input type='text'
                        id='searchInput'
                        name='searchInput'
                        placeholder='Enter GitHub account name'
                        className='searchInput'
                        value={this.state.search}
                        onChange={e => this.onSearchChange(e.target.value)}
                    />
                    <button type='button'
                        id='submit'
                        value='submit'
                        className='searchButton'
                        onClick={this.search}>Search</button>
                </form>

                {userInfo}
            </div>
        )
    }
}

export default withRouter(Home);