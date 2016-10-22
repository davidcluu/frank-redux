import React, { Component, PropTypes } from 'react';

//import styles from './Index.scss';

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  handleClick() {
    $('.hello').velocity({ 
      'color': '#ff0000'
    });
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render () {
    return (
      <div>
        <div className="hello" onClick={this.handleClick}>I am the index</div>
      </div>
    );
  }
}

export default Index;
