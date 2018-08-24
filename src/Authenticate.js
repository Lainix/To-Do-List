import React from 'react';
// import 'authenticate.css';
import firebase from 'firebase';

class Authenticate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    handleCreateUser() {
        // console.log('algo');
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error => {
                // console.log(error);
                this.setState({
                    error: error.message
                })
            });
    }
    handleLogin() {
        // console.log('algo');
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error => {
                // console.log(error);
                this.setState({
                    error: error.message
                })
            });
    }
    render() {
        return (
            <form>
                <div>{this.state.error}</div>
                <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                <br />
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                <br />
                <button type="button" onClick={this.handleCreateUser}>New User</button>
                <button type="button" onClick={this.handleLogin}>Login</button>
            </form>
        )
    }
}

export default Authenticate;