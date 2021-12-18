import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";
import {User} from '../model/Model'
import history from '../utils/history'

interface LoginProps {
    authService: AuthService
    setUser:(user: User) => void
}

interface LoginState {
    userName: string,
    password: string,
    loginAttempted: boolean,
    loginSuccessful: boolean
}

interface CustomEvent {
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps,LoginState> {

    state: LoginState = {
        userName: '',
        password: '',
        loginAttempted: false,
        loginSuccessful: false
    }

    private setUserName(event: CustomEvent) {
        this.setState({userName: event.target.value});
        console.log('Setting username to:' + event.target.value)
    }

    private setPassword(event: CustomEvent) {
        this.setState({password: event.target.value});
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        this.setState({loginAttempted: true});
        const result = await this.props.authService.login(
            this.state.userName,
            this.state.password
        );
        if (result) {
            this.setState({loginSuccessful: true});
            this.props.setUser(result)
            history.push('/profile');
        } else {
            this.setState({loginSuccessful: false});
        }
    }

    render(): React.ReactNode {
        let loginMessage: any;
        if (this.state.loginAttempted) {
            if (this.state.loginSuccessful) {
                loginMessage = <label>Login successfull</label>
            } else {
                loginMessage = <label>Login failed</label>
            }

        }
        return (
            <div>
                <h2>Please login:</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input value={this.state.userName} onChange={e => this.setUserName(e)}/><br/>
                    <input value={this.state.password} onChange={e => this.setPassword(e)} type='password'/><br/>
                    <input type='submit' value='Login'/>
                </form>
                {loginMessage}

            </div>
        )
    }
}