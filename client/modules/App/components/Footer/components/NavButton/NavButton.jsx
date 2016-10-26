import React, {Component} from 'react';
import {Link} from 'react-router';

export class NavButton extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render () {
    const {defaultClasses, selectedClass, currPath, path, svg} = this.props;
    const isCurrentPath = currPath === path;

    return (
      <div className={`${defaultClasses} ${isCurrentPath && selectedClass}`}>
        <Link to={path} dangerouslySetInnerHTML={{__html: svg}} />
      </div>
    );
  }
}

NavButton.propTypes = {
  defaultClasses: React.PropTypes.string.isRequired,
  selectedClass: React.PropTypes.string.isRequired,
  currPath: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  svg: React.PropTypes.string.isRequired
};

export default NavButton;

