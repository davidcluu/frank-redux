import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {loginUser} from '../../globalReducers/AuthActions';

import LoginForm from './components/LoginForm/LoginForm';

import styles from './Login.scss';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render () {
    const {dispatch, errorMessage} = this.props;

    return (
      <div id={styles.login}>
        <div className={styles.container}>
          <LoginForm
            onLoginClick={ creds => dispatch(loginUser(creds)) }
            errorMessage={errorMessage}
          />
        </div>
        <div className={styles.signup}>First time here? <Link to={'/login'}>Create an Account!</Link></div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const {auth} = state;
  const {errorMessage} = auth;

  return {
    errorMessage
  };
}

export default connect(mapStateToProps)(Login);
