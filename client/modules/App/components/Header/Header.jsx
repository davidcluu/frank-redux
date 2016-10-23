import React, { Component, PropTypes } from 'react';

import styles from './Header.scss';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true });  
  }

  render () {
    const { onLogoutClick } = this.props;

    return (
      <div id={styles.header}>
        I am the header
        <div onClick={onLogoutClick}>Logout</div>
      </div>
    )
  }
}

export default Header;
