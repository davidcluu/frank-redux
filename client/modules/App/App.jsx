import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {initAuth, logoutUser} from '../../globalReducers/AuthActions';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import styles from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(initAuth()).then(() => {
      const {isAuthenticated} = this.props;

      if (!isAuthenticated) {
        dispatch(push('/login'));
      }
    });

    this.setState({isMounted: true});
  }

  render () {
    const {dispatch, children, location} = this.props;
    const {pathname} = location;

    return (
      <div id={styles.app}>
        <Header
          onLogoutClick={() => dispatch(logoutUser())}
        />
        <div className={styles.container}>
          {children}
        </div>
        <Footer
          pathname={pathname}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  children: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {auth} = state;
  const {isAuthenticated} = auth;

  return {
    isAuthenticated
  };
}

export default connect(mapStateToProps)(App);
