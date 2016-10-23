import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './LoginForm.scss';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div id={styles.loginForm}>
        <input
          type="text"
          ref="username"
          placeholder="USERNAME"
          autoComplete="off"
        />
        <input
          type="password"
          ref="password"
          placeholder="PASSWORD"
          autoComplete="off"
        />
        { errorMessage && <div className={styles.errorMessage}>{errorMessage}</div> }
        <button onClick={(event) => this.handleClick(event)}>
          LOGIN
        </button>
      </div>
    );
  }

  handleClick(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    }
    this.props.onLoginClick(creds);
  }
}

LoginForm.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default connect()(LoginForm);
