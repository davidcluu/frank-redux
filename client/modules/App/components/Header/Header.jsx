import React, {Component} from 'react';

import styles from './Header.scss';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render () {
    const {onLogoutClick} = this.props;

    return (
      <div id={styles.header}>
        <div className={styles.logo}>
          <div className={styles.image}>
            Frank
          </div>
        </div>
        <div className={styles.logout}>
          <div className={styles.button} onClick={onLogoutClick}>
            Logout
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onLogoutClick: React.PropTypes.func.isRequired
};

export default Header;
