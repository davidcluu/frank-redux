import React, { Component, PropTypes } from 'react';

import styles from './Footer.scss';

export class Footer extends Component {
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
        I am the footer
      </div>
    )
  }
}

export default Footer;
