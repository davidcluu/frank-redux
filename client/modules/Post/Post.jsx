import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//import styles from './Post.scss';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render () {
    const { _id, content, title } = this.props.post;

    return (
      <div>
        {_id} {content} {title}
      </div>
    );
  }
}

Post.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Post);
