import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import { logoutUser } from '../../globalReducers/AuthActions';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import styles from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    const { dispatch, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      dispatch(push('/login'));
    }

    this.setState({ isMounted: true });  
  }

  render () {
    const { dispatch } = this.props;

    return (
      <div id={styles.app}>
        <Header
          onLogoutClick={ () => dispatch(logoutUser()) }
        />
        <div className={styles.container}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated } = auth;

  return {
    isAuthenticated
  };
}

export default connect(mapStateToProps)(App);
