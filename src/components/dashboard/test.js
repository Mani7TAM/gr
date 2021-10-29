import React, { Component } from 'react'

export default class test extends Component {
    constructor() {
        super();
        this.state={
            username: null,
            password: null,
            login: false,
            store: null,
        }
    }
    login() {
        var strloginval = this.state.username + ':' + this.state.password;
        var strencloginval = btoa(strloginval);
        var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic " + strencloginval);
        fetch('http://apietrax.iflotech.in/Api/jwtauth/Token', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: myHeaders
        }).then((response) => {
            response.json().then((result) => {
                console.warn('result:', result);
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    token: result.token
                }))
            })
        })
    }

    render() {
        return (
            <div>
                <h1>JWT Auth</h1>
                <div>
                    <input placeholder="username" type="text" onChange={(event) => {this.setState({username: event.target.value})}} /> <br /> <br />
                    <input placeholder="password" type="password" onChange={(event) => {this.setState({password: event.target.value})}} /> <br /> <br />
                    <button onClick={() => {this.login()}}>Login</button>
                </div>
            </div>
        )
    }
}
