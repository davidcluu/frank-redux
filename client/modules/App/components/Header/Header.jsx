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
          <div
            className={styles.button}
            onClick={onLogoutClick}
            dangerouslySetInnerHTML={{__html: `
              <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                  <path id="a" d="M10.483 15H0V0h10.483"/>
                  <mask id="c" x="0" y="0" width="10.483" height="15" fill="#fff">
                    <use xlink:href="#a"/>
                  </mask>
                  <path d="M9.442 5.647H5v3.41h4.442v1.147c0 .562.358.74.8.407l3.517-2.654c.446-.338.44-.874 0-1.207l-3.52-2.656c-.446-.338-.798-.152-.798.406v1.147z" id="b"/>
                  <mask id="d" x="0" y="0" width="9.092" height="6.854" fill="#fff">
                    <use xlink:href="#b"/>
                  </mask>
                </defs>
                <g stroke="#B8B8B8" fill="none" fill-rule="evenodd">
                  <use mask="url(#c)" stroke-width="4" xlink:href="#a"/>
                  <use mask="url(#d)" stroke-width="2" fill="#B8B8B8" xlink:href="#b"/>
                </g>
              </svg>
            `}}
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onLogoutClick: React.PropTypes.func.isRequired
};

export default Header;
