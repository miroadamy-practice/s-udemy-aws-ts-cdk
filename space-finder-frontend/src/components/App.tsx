import React from 'react';
import {Router, Route, Switch } from 'react-router';

import {User} from '../model/Model'
import {AuthService} from '../services/AuthService'

import history from '../utils/history';
import { Home } from './Home';
import { Login } from './Login';
import { Navbar } from './Navbar';
import { Profile } from './Profile';


interface AppState {
  user: User | undefined
}

export class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined
    }
    this.setUser = this.setUser.bind(this);

  }

  private setUser(user: User) {
    this.setState({user: user});
    console.log('Setting the user: ' + user);
  }

  render() {
    return (
      <div className='wrapper'>
        <Router history={history}>
          <div>
            <Navbar user={this.state.user}/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/login'>
                <Login authService={this.authService} setUser={this.setUser}/>
              </Route>
              <Route exact path='/profile'>
                <Profile authService={this.authService} user={this.state.user} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>  
    )
  }
}
