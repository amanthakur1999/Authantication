import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import NoMatch from './NoMatch';
import LogIn from './LogIn';
import SignUp from './SignUp';

import React from 'react';
import { localStorageKey, userVerifyURL } from '../utils/constant';
import FullPageSpiner from './FullPageSpiner';
import Admin from './Admin';
import User from './User';
import LogOut from './LogOut';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };
  //   handleLogout = () => {
  //     localStorage.clear();
  //     this.props.history.push('/');
  //   };

  componentDidMount() {
    let storageKey = localStorage[localStorageKey];
    if (storageKey) {
      fetch(userVerifyURL, {
        Method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ isVerifying: false });
    }
  }
  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem(localStorageKey, user.token);
  };
  render() {
    if (this.state.isVerifying) {
      return <FullPageSpiner />;
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp
            user={this.state.user}
            updateUser={this.updateUser}
          />
        ) : (
          <UnauthenticatedApp
            updateUser={this.updateUser}
            user={this.state.user}
          />
        )}
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Admin user={props.user} />
      </Route>
      <Route exact path="/logout">
        <LogOut />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

function UnauthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <User />
      </Route>
      <Route path="/login">
        <LogIn updateUser={props.updateUser} />
      </Route>
      <Route path="/signup">
        <SignUp updateUser={props.updateUser} />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
