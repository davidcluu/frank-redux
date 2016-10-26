import React, {Component} from 'react';
import {Link} from 'react-router';

import styles from './Footer.scss';

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render () {
    return (
      <div id={styles.footer}>
        <div className={styles.button}>
          <Link to={'/?' + 'A'}>A</Link>
        </div>
        <div className={styles.button}>
          <Link to={'/?' + 'B'}>B</Link>
        </div>
        <div className={styles.button}>
          <Link to={'/?' + 'C'}>C</Link>
        </div>
        <div className={styles.button}>
          <Link to={'/?' + 'D'}>D</Link>
        </div>
      </div>
    );
  }
}

export default Footer;
