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
        I am the header
        <div onClick={onLogoutClick}>Logout</div>
      </div>
    );
  }
}

Header.propTypes = {
  onLogoutClick: React.PropTypes.func.isRequired
};

export default Header;
