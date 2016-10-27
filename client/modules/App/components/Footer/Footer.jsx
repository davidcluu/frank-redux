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
            <svg width="18" height="16" viewBox="0 3 18 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.923 11.182H18L9 3l-9 8.182h2.077V18h13.846v-6.818zm-9 2.045h4.154V18H6.923v-4.773z" fill-rule="evenodd"/>
            </svg>
          `}
        />
        <NavButton
          defaultClasses={`${styles.button} ${styles.submit}`}
          selectedClass={styles.selected}
          currPath={pathname}
          path={'/submit'}
          svg={`
            <svg width="15" height="15" viewBox="66 3 15 15" xmlns="http://www.w3.org/2000/svg">
              <path d="M73.17 10.505H68v-.334H73.17V5h.335V10.17h5.171v.335h-5.171v5.171h-.334v-5.171z" stroke-width="3" fill="none" fill-rule="evenodd" stroke-linecap="square"/>
            </svg>
          `}
        />
        <NavButton
          defaultClasses={`${styles.button} ${styles.search}`}
          selectedClass={styles.selected}
          currPath={pathname}
          path={'/search'}
          svg={`
            <svg width="24" height="23" viewBox="-1 -1 24 23" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.93 11.686l.008.008 4.528 3.936.566.492-.995 1.145-.566-.492-4.528-3.936-.084-.075c-2.098 1.618-5.093 1.604-7.147-.18C2.367 10.544 2.138 6.97 4.2 4.6c2.062-2.372 5.634-2.642 7.978-.604 2.25 1.955 2.552 5.325.753 7.69zm-1.373-.69c1.512-1.74 1.343-4.36-.376-5.855-1.718-1.494-4.338-1.295-5.85.444-1.51 1.74-1.343 4.36.376 5.855 1.72 1.493 4.34 1.295 5.85-.444z" stroke-linecap="square" fill-rule="evenodd"/>
            </svg>
          `}
        />
        <NavButton
          defaultClasses={`${styles.button} ${styles.history}`}
          selectedClass={styles.selected}
          currPath={pathname}
          path={'/history'}
          svg={`
            <svg width="22" height="22" viewBox="195 -1 22 22" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path class="${styles.a}" d="M199.622 12.974c1.643 3.522 5.83 5.046 9.352 3.404 3.522-1.643 5.046-5.83 3.404-9.352-1.643-3.522-5.83-5.046-9.352-3.404-1.057.493-1.934 1.215-2.6 2.08" stroke-width="2"/>
                <path class="${styles.b}" d="M199.03 8.278l-.898-3.834 4.578 2.435z"/>
                <path class="${styles.c}" d="M205.5 8.5v2M205.5 11h2" stroke-width="2" stroke-linecap="square"/>
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
