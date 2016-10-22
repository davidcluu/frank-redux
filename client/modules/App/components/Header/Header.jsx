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
    return (
      <div>
        I am the header
      </div>
    )
  }
}

export default Header;
