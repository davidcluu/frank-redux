import React, { Component, PropTypes } from 'react';

//import styles from './Login.scss';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render () {
    return (
      <div>
        <div>I am the login page</div>
      </div>
    );
  }
}

export default Login;
