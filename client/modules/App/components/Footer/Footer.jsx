/* eslint max-len: 0 */

import React, {Component} from 'react';

import NavButton from './components/NavButton/NavButton';

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
    const {pathname} = this.props;

    return (
      <div id={styles.footer}>
        <NavButton
          defaultClasses={`${styles.button} ${styles.home}`}
          selectedClass={styles.selected}
          currPath={pathname}
          path={'/'}
          svg={`
            <svg viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.93 8h.083c1.103 0 1.34-.614.53-1.37L8.744.284c-.416-.388-1.067-.38-1.473 0L.474 6.63C-.346 7.394-.1 8 1.004 8h.08v6.003c0 .545.447.997.997.997h11.856c.55 0 .995-.446.995-.997V8zm-9 2.1h4.155V15H5.93v-4.9z" fill-rule="evenodd"/>
            </svg>
          `}
        />
        <NavButton
          defaultClasses={`${styles.button} ${styles.submit}`}
          selectedClass={styles.selected}
          currPath={pathname}
          path={'/submit'}
          svg={`
            <svg viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
              <g fill-rule="evenodd">
                <path d="M4.745 1.176h-2.75C.894 1.176 0 2.07 0 3.172v9.833C0 14.115.893 15 1.994 15h12.012c1.1 0 1.994-.893 1.994-1.995V3.172c0-1.11-.893-1.996-1.994-1.996h-2.75C11.1.5 10.49 0 9.765 0H6.234c-.73 0-1.334.502-1.49 1.176z"/>
                <ellipse cx="8" cy="8" rx="4" ry="4"/>
                <circle stroke-width=".5" cx="13.387" cy="3.387" r=".387"/>
              </g>
            </svg>
          `}
        />
        <NavButton
          defaultClasses={`${styles.button} ${styles.search}`}
          selectedClass={styles.selected}
          currPath={pathname}
          path={'/search'}
          svg={`
            <svg viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.334 9.27l.03.026 4.63 4.025.007.007c.31.27.35.754.075 1.07-.277.32-.755.35-1.07.077l-.007-.006-4.63-4.025-.106-.092c-2.094 1.63-5.064 1.64-7.085-.115C-.13 8.23-.326 4.678 1.74 2.302c2.065-2.376 5.61-2.676 7.916-.67 2.213 1.923 2.483 5.27.678 7.637zM8.98 8.594c1.514-1.742 1.37-4.346-.32-5.817-1.693-1.47-4.292-1.25-5.807.492-1.514 1.742-1.37 4.347.32 5.817 1.693 1.47 4.292 1.25 5.807-.492z" stroke-width=".5" fill-rule="evenodd" stroke-linecap="square"/>
            </svg>
          `}
        />
        <NavButton
          defaultClasses={`${styles.button} ${styles.history}`}
          selectedClass={styles.selected}
          currPath={pathname}
          path={'/history'}
          svg={`
            <svg viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
              <g fill="#727272" fill-rule="evenodd">
                <ellipse cx="6.5" cy="3.75" rx="3.9" ry="3.75"/>
                <path d="M13 15c0-3.452-2.91-6.25-6.5-6.25S0 11.548 0 15h13z"/>
              </g>
            </svg>
          `}
        />
      </div>
    );
  }
}

Footer.propTypes = {
  pathname: React.PropTypes.string.isRequired
};

export default Footer;
