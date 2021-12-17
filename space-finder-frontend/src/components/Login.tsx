import React from "react";
import { AuthService } from "../services/AuthService";

interface LoginProps {
    authService: AuthService
}

interface LoginState {
    userName: string,
    password: string,
    loginAttempted: boolean,
    loginSuccessful: boolean
}

export class Login extends React.Component<LoginProps,LoginState> {

    state: LoginState = {
        userName: '',
        password: '',
        loginAttempted: false,
        loginSuccessful: false
    }

    render(): React.ReactNode {
        return (
            <div>
                <h2>Please login:</h2>
                <form>
                    <input value={this.state.userName}/><br/>
                    <input value={this.state.password}/><br/>
                    <input type='submit' value='Login'/>

                </form>

            </div>
        )
    }
}